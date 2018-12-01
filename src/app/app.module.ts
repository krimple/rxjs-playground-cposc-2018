import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {SuiModule} from 'ng2-semantic-ui';

import { AppComponent } from './app.component';
import { BookBrowserComponent } from './bookbrowser/bookbrowser.component';
import { BookBrowserService } from './bookbrowser/bookbrowser.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    BookBrowserComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SuiModule
  ],
  providers: [ BookBrowserService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
