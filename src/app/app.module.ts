import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'

import { AppComponent } from './app.component';
import { WordsComponent } from './words/words.component';
import { WordSlideComponent } from './words/word-slide/word-slide.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { WordsService } from './words/words.service';

const routes: Routes = [
  {
    path: 'words',
    component: WordsComponent
  },
  {
    path: '',
    redirectTo: 'words',
    pathMatch: 'full'
  },  
  { 
    path: '**', 
    component: PageNotFoundComponent 
  }
];

@NgModule({
  declarations: [
    AppComponent,
    WordsComponent,
    WordSlideComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [WordsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
