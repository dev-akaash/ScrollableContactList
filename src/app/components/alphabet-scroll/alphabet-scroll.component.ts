import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { GestureController } from '@ionic/angular';

@Component({
  selector: 'app-alphabet-scroll',
  templateUrl: './alphabet-scroll.component.html',
  styleUrls: ['./alphabet-scroll.component.scss'],
})
export class AlphabetScrollComponent implements AfterViewInit {

  letters = [];
  lastOpen = null;
  @Output() letterSelected = new EventEmitter<string>();
  @Output() scrollingLetter = new EventEmitter<boolean>();
  @ViewChild('bar') sidebar: ElementRef;

  constructor(
    private gestureCtrl: GestureController
  ) { 
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    for (let i = 0; i < str.length; i++) {
      let nextChar = str.charAt(i);
      this.letters.push(nextChar);
    }
  }

  ngAfterViewInit() {
    const moveGesture = this.gestureCtrl.create({
      el: this.sidebar.nativeElement,
      direction: 'y',
      threshold: 0,
      gestureName: 'move',
      onStart: ev => {
        this.scrollingLetter.emit(true);
      },
      onMove: ev => {
        const closestEl: any = document.elementFromPoint(ev.currentX, ev.currentY);
        if (closestEl && ['LI', 'A'].indexOf(closestEl.tagName) > -1) {
          const letter = closestEl.innerText;
          if (letter) {
            if (letter !== this.lastOpen) {
              Haptics.impact({style: ImpactStyle.Light});
            }
            this.goToLetter(letter);
          }
        }
      },
      onEnd: ev => {
        this.scrollingLetter.emit(false);
      }
    });
    moveGesture.enable();
  }

  goToLetter(letter) {
    if (this.lastOpen == letter) return;

    this.lastOpen == letter;
    this.letterSelected.emit(letter);
  }

}
