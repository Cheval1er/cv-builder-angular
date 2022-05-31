import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResumeBuilderComponent } from './resume-builder/resume-builder.component';

@NgModule({
  declarations: [AppComponent, ResumeBuilderComponent],
  imports: [BrowserModule, ReactiveFormsModule, FormsModule, BrowserModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
