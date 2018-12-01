import { Injectable } from '@angular/core';
import { Observable, of, forkJoin } from 'rxjs';
import { delay, tap, mergeMap, map, timeout, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { BookContent, BookList, BookCatalogEntry } from './books';
@Injectable()
export class BookBrowserService {
  constructor(private httpClient: HttpClient) { }

  fetchBooks(): Observable<BookCatalogEntry[]> {
    return of(
      [{
          title: 'This is Spinal Tap',
          author: 'David St. Hubbins',
          url: 'http://spinaltap.com'
        }
      ] as BookCatalogEntry[]).pipe(delay(3000));
  }

  fetchBooksNetwork(): Observable<BookCatalogEntry[]> {
    return this.httpClient
              .get<BookCatalogEntry[]>('/assets/books/book-list.json')
              .pipe(delay(3000));
  }

  fetchBooksMapToFullContent(): Observable<any> {
    return this.httpClient
          .get<[BookCatalogEntry[]]>('/assets/books/book-list.json')
          .pipe(
            mergeMap(books => {
              return forkJoin(books.map((book) => {
                return this.getBookTextByUrl(book['url'])
                .pipe(
                  delay(Math.random() * 4000),
                  map(data => {
                    return {
                      title: book['title'],
                      author: book['author'],
                      bookText: data.slice(0, 500)
                    };
                  })
                );
              }));
            })
          );
  }

  getBookTextByUrl(url): Observable<any> {
    return this.httpClient.get(`/assets/books/${url}`, {
      responseType: 'text' as 'json'
    });
  }
}
