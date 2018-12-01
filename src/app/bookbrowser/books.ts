export interface BookCatalogEntry {
  title: string;
  author: string;
  url: string;
}
export interface BookContent {
  bookText: string;
  author: string;
  title: string;
}

export interface BookList {
  books: BookContent[];
}
