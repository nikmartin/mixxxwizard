import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { DndModule } from 'ng2-dnd';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GenresComponent } from './genres/genres.component';
import { GenresService } from './genres.service';
import { NavComponent } from './nav/nav.component';

@NgModule({
  declarations: [AppComponent, GenresComponent, NavComponent],
  imports: [BrowserModule, HttpModule, AppRoutingModule, DndModule.forRoot()],
  providers: [GenresService],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {}
}
