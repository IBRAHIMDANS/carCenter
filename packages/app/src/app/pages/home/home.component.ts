import { Component, OnInit } from '@angular/core';
import { AddCarComponent } from '../../components/add-car/add-car.component';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  AddCar(): Subscription {
    return this.dialog.open(AddCarComponent, {
      autoFocus: true,
      data: {
        title: 'Add',
      }
    }).afterClosed().subscribe(res => {
      console.log(res);
    });

  }
}
