import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CarService } from '../../services/car.service';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.scss']
})


export class AddCarComponent implements OnInit {


  carForm: FormGroup = this.fb.group({
    name: new FormControl('test', Validators.compose([Validators.required])),
    brand: new FormControl('2', Validators.compose([Validators.required])),
    registration: new FormControl('3', Validators.compose([Validators.required])),
    purchaseDate: new FormControl(new Date(), Validators.compose([Validators.required])),
    color: new FormControl('5', Validators.compose([Validators.required])),
    state: new FormControl('6', Validators.compose([Validators.required])),
  });

  constructor(private fb: FormBuilder, private carService: CarService) {

  }

  registerCar(e: Event): void {
    e.preventDefault();
    console.log(this.carForm.value)
    this.carService.save({
      brand: this.carForm.controls.brand.value,
      color: this.carForm.controls.color.value,
      purchaseDate: this.carForm.controls.purchaseDate.value,
      registration: this.carForm.controls.registration.value,
      state: this.carForm.controls.state.value,
      name: this.carForm.controls.name.value
    }).subscribe(
      res => console.log(res),
      error => console.log(error))
      .unsubscribe();
  }

  ngOnInit(): void {
  }

}
