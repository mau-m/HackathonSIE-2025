import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';  // Importante para usar *ngIf, *ngFor, etc.
import { PollResultsComponent } from './poll-results.component';

@NgModule({
  declarations: [
    PollResultsComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PollResultsComponent
  ]
})
export class PollResultsModule { }
