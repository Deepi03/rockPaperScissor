import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppComponent } from './app.component';
import { StartboardComponent } from './startboard/startboard.component';
import { GameboardComponent } from './gameboard/gameboard.component';
import {
 MatProgressSpinnerModule
} from '@angular/material/progress-spinner';

import { ModalModule } from 'ngx-bootstrap/modal';
import {ModalContentComponent} from './gameboard/gameboard.component'

@NgModule({
  declarations: [
    AppComponent,
    StartboardComponent,
    GameboardComponent,
    ModalContentComponent
  ],
  imports: [
    FontAwesomeModule,
    BrowserModule,
    ModalModule.forRoot(),
    MatProgressSpinnerModule
  ],
  entryComponents: [ModalContentComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
