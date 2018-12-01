import { Component, OnInit } from '@angular/core';
import { BookContent, BookList } from './books';
import { Observable } from 'rxjs';
import { BookBrowserService } from './bookbrowser.service';

@Component({
  template: `
      <h3>Book List</h3>
        <sui-accordion class="styled fluid">
          <sui-accordion-panel [isOpen]="book.bookText" *ngFor="let book of bookList">
            <div title>
              <i class="dropdown icon"></i>
              {{ book.author }} - {{ book.title }}
            </div>
            <div content>
              <pre>
                {{ book.bookText }}
              </pre>
            </div>
          </sui-accordion-panel>
        </sui-accordion>
  `,
  selector: 'app-book-browser'
})
export class BookBrowserComponent implements OnInit {
  constructor(private bookBrowserService: BookBrowserService) { }

  bookList;

  ngOnInit() {
    this.bookBrowserService.fetchBooksMapToFullContent()
      .subscribe(response => {
        this.bookList = response;
      });
  }
}
