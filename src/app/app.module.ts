import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { QuestionsComponent } from './questions/questions.component';
import { HomeComponent } from './home/home.component';
import { DisqualifiedComponent } from './disqualified/disqualified.component';
import { SetLogicComponent } from './set-logic/set-logic.component';
import { ViewLogicComponent } from './view-logic/view-logic.component';
import { MessageService } from './message.service';

const routes: Routes = [
     {path: '', redirectTo: 'home', pathMatch: 'full'},
     {path: 'home', component: HomeComponent},
     {path: 'survey', component: QuestionsComponent},
     {path: 'disqualified', component: DisqualifiedComponent},
     {path: 'set', component: SetLogicComponent},
     {path: 'view', component: ViewLogicComponent}
];
@NgModule({
  declarations: [
    AppComponent,
    QuestionsComponent,
    HomeComponent,
    DisqualifiedComponent,
    SetLogicComponent,
    ViewLogicComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    NgbModule.forRoot()
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
