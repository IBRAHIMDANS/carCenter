import { Component, OnInit } from '@angular/core';
import { ManageCarComponent } from '../../components/manage-car/manage-car.component';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { CarService } from '../../services/car.service';
import { Car } from '../../models/Car';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public dialog: MatDialog, public carService: CarService) {
  }

  ngOnInit(): void {
  }
}
