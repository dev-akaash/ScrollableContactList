import { AlphabetScrollComponent } from './alphabet-scroll/alphabet-scroll.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [AlphabetScrollComponent],
  imports: [
    CommonModule
  ],
  exports: [AlphabetScrollComponent],
})
export class SharedComponentsModule { }
