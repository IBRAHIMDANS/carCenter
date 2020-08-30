import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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
    purchaseDate: new FormControl('4', Validators.compose([Validators.required])),
    color: new FormControl('5', Validators.compose([Validators.required])),
    state: new FormControl('6', Validators.compose([Validators.required])),
  });

  constructor(private fb: FormBuilder) {

  }

  registerCar(): void {
    console.log(this.carForm.getRawValue());
  }

  ngOnInit(): void {
  }

}
