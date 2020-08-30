import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CarService } from '../../services/car.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Car } from '../../models/Car';
import { Color } from '../../models/Color';
import { Brands } from '../../models/Brand';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-car',
  templateUrl: './manage-car.component.html',
  styleUrls: ['./manage-car.component.scss']
})


export class ManageCarComponent implements OnInit {


  carForm: FormGroup = this.fb.group({
    name: new FormControl('', Validators.compose([Validators.required])),
    brand: new FormControl('', Validators.compose([Validators.required])),
    registration: new FormControl('', Validators.compose([Validators.required])),
    purchaseDate: new FormControl(new Date(), Validators.compose([Validators.required])),
    color: new FormControl('', Validators.compose([Validators.required])),
    state: new FormControl('', Validators.compose([Validators.required])),
  });
  arrayColor: any = Object.keys(Color).map(i => ({ name: i, value: Color[i] }));
  options: string[] = Brands.map(item => (item.name));
  filteredOptions: Observable<string[]>;

  constructor(private fb: FormBuilder, private carService: CarService, public dialogRef: MatDialogRef<ManageCarComponent>,
              @Inject(MAT_DIALOG_DATA) public data) {
    console.log(this.options);
  }

  manageCar(e: Event): void {
    e.preventDefault();
    if (this.data.title === 'Add') {
      this.carService.save({
        brand: this.carForm.controls.brand.value,
        color: this.carForm.controls.color.value,
        purchaseDate: this.carForm.controls.purchaseDate.value,
        registration: this.carForm.controls.registration.value,
        state: this.carForm.controls.state.value,
        name: this.carForm.controls.name.value
      }).subscribe(
        res => {
          this.dialogRef.close(res);
          return res;
        },
        error => error);
    } else if (this.data.title === 'Edit') {
      this.carService.update({
        id: this.data.data.id,
        brand: this.carForm.controls.brand.value,
        color: this.carForm.controls.color.value,
        purchaseDate: this.carForm.controls.purchaseDate.value,
        registration: this.carForm.controls.registration.value,
        state: this.carForm.controls.state.value,
        name: this.carForm.controls.name.value
      }).subscribe(
        res => {
          this.dialogRef.close(res);
          return res;
        },
        error => console.log(error));
    } else if (this.data.title === 'Delete') {
      this.carService.delete({
        id: this.data.data.id,
        brand: this.carForm.controls.brand.value,
        color: this.carForm.controls.color.value,
        purchaseDate: this.carForm.controls.purchaseDate.value,
        registration: this.carForm.controls.registration.value,
        state: this.carForm.controls.state.value,
        name: this.carForm.controls.name.value
      }).subscribe(
        res => {
          this.dialogRef.close(res);
          return res;
        },
        error => console.log(error));
    }
  }

  ngOnInit(): void {
    if (this.data.title === 'Edit') {
      this.carForm = this.fb.group({
        name: new FormControl((this.data.data as Car).name, Validators.compose([Validators.required])),
        brand: new FormControl((this.data.data as Car).brand, Validators.compose([Validators.required])),
        registration: new FormControl((this.data.data as Car).registration, Validators.compose([Validators.required])),
        purchaseDate: new FormControl((this.data.data as Car).purchaseDate, Validators.compose([Validators.required])),
        color: new FormControl((this.data.data as Car).color, Validators.compose([Validators.required])),
        state: new FormControl((this.data.data as Car).state, Validators.compose([Validators.required])),
      });
    }
    this.filteredOptions = this.carForm.controls.brands?.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  cancel(): void {
    return this.dialogRef.close(null);
  }

  private _filter(value): any {
    console.log(this.carForm.controls.brand.value);
    const filterValue = value.toLowerCase();

    return this.options.filter(option => {
      console.log(option);
      return option.toLowerCase().includes(filterValue);
    });
  }
}
