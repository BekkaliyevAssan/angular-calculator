import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ButtonsComponent } from './components/buttons/buttons.component';
import { HistoryScreenComponent } from './components/history-screen/history-screen.component';

@NgModule({
  declarations: [
    AppComponent,
    ButtonsComponent,
    HistoryScreenComponent
  ],
  imports: [
    BrowserModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
