import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  public userId;

  constructor() {
    if (!localStorage.getItem('userId')) {
      this.userId = String(Math.round(Math.random() * 1000).toPrecision(3));
      localStorage.setItem('userId', String(this.userId));
    } else {
      this.userId = localStorage.getItem('userId');
    }
  }

  ngOnInit(): void {
  }

}
