import { Component, OnInit, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { CarService } from '../../services/car.service';
import { Car } from '../../models/Car';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ManageCarComponent } from '../manage-car/manage-car.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class CarListComponent implements OnInit {

  public dataSource = new MatTableDataSource<Car>([]);
  columnsToDisplay = ['ID', 'name', 'brand', 'state', 'color', 'registration', 'purchaseDate', 'manage'];
  expandedElement;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  sortedData: Car[];

  constructor(private carService: CarService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.refresh();
  }

  public refresh(): Subscription {
    return this.carService.getCarUser().subscribe(res => {
      this.dataSource.data = res;
    }, error => {
      console.log(error);
    }, () => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.paginator._intl.itemsPerPageLabel = 'Voiture par page';
      this.dataSource.sort = this.sort;
    });
  }

  sortData(sort: Sort): string {
    const data = this.dataSource?.data.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name':
          return this.compare(a.name, b.name, isAsc);
        case 'brand':
          return this.compare(a.brand, b.brand, isAsc);
        case 'color':
          return this.compare(a.color, b.color, isAsc);
        case 'purchaseDate':
          return this.compare(a.purchaseDate, b.purchaseDate, isAsc);
        case 'registration':
          return this.compare(a.registration, b.registration, isAsc);
        case 'state':
          return this.compare(a.state, b.state, isAsc);
        default:
          return 0;
      }
    });
  }

  compare(a: number | string, b: number | string, isAsc: boolean): number {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  add(): Subscription {
    return this.dialog.open(ManageCarComponent, {
      autoFocus: true,
      data: {
        title: 'Add',
      }
    }).afterClosed().subscribe(res => {
      if (res !== null) {
        this.refresh();
      }
    });
  }

  edit(element: Car): Subscription {
    return this.dialog.open(ManageCarComponent, {
      autoFocus: true,
      data: {
        title: 'Edit',
        data: element
      }
    }).afterClosed().subscribe(res => {
      if (res !== null) {
        this.refresh();
      }
    });
  }

  delete(element: any): Subscription {
    return this.dialog.open(ManageCarComponent, {
      autoFocus: true,
      data: {
        title: 'Delete',
        data: element
      }
    }).afterClosed().subscribe(res => {
      if (res !== null) {
        this.refresh();
      }
    });
  }

  showColor(color): any {
    return JSON.parse(color);
  }

}

