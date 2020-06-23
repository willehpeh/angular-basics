import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PostItemComponent } from './post-item/post-item.component';
import { MatCardModule } from '@angular/material/card';
import { PostListComponent } from './post-list/post-list.component';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    PostItemComponent,
    PostListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
