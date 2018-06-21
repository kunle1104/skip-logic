import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { QuestionsComponent } from './questions/questions.component';
import { HomeComponent } from './home/home.component';
import { DisqualifiedComponent } from './disqualified/disqualified.component';

const routes: Routes = [
     {path: '', redirectTo: 'home', pathMatch: 'full'},
     {path: 'home', component: HomeComponent},
     {path: 'survey', component: QuestionsComponent},
     {path: 'disqualified', component: DisqualifiedComponent}
];
@NgModule({
  declarations: [
    AppComponent,
    QuestionsComponent,
    HomeComponent,
    DisqualifiedComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    NgbModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
