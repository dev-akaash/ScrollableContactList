import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { IonItemGroup } from '@ionic/angular';
import data from '../../assets/MOCK_DATA.json';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  data = [];
  @ViewChildren(IonItemGroup, {read: ElementRef}) itemGroups: QueryList<any>;
  scroll: boolean = false;

  constructor() {
    const sorted = data.sort((a, b) => {
      if (a.first_name < b.first_name) return -1;
      if (a.first_name > b.first_name) return 1;
      return 0;
    });

    let last = null;

    for (let i = 0; i < sorted.length; i++) {
      const contact = sorted[i];
      if (!last || last !== contact.first_name[0]) {
        last = contact.first_name[0];
        this.data.push({key: last, users: []});
      }
      this.data[this.data.length -1].users.push(contact);
    }
    console.log(this.data);
  }

  scrollToLetter(letter) {
    for (let i = 0; i < this.data.length; i++) {
      const group = this.data[i];
      if (group.key == letter) {
        const group = this.itemGroups.filter((element, index) => index == i);
        if (group && group.length > 0) {
          const el = group[0];
          el.nativeElement.scrollIntoView();
        }
        return;
      }
    }
  }

  letterScrollActive(active) {
    this.scroll = active;
  }

}
