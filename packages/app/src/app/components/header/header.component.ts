import { Component, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { DrawerService } from '../../services/drawer.service';
import { MeteoService } from '../../services/meteo.service';
import { CarService } from '../../services/car.service';
import { Car } from '../../models/Car';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @ViewChild(MatMenuTrigger, { static: false }) trigger: MatMenuTrigger;
  public userId: string;

  public meteo;
  public numberCar: number;
  private drawerOpenedSubscription: Subscription;
  private opened: boolean;

  constructor(private route: ActivatedRoute, private router: Router,
              private drawerService: DrawerService,
              @Inject(PLATFORM_ID) private platformId: any,
              private meteoService: MeteoService,
              private carService: CarService
  ) {

  }

  ngOnInit(): void {
    this.drawerOpenedSubscription = this.drawerService.whenDrawerChanges()
      .subscribe(opened => this.opened = opened);
    this.meteoService.getPosition().then(pos =>
      this.meteoService.getMeteo({ lat: pos.lat, long: pos.long })
        .subscribe(res => {
          this.meteo = res;
        }, e => console.log(e))
    ).catch(e => console.log(e));
  }

  public onClickMenu(e: Event): void {
    e.preventDefault();

    if (this.opened) {
      this.drawerService.close();
    } else {
      this.drawerService.open();
    }
  }

  public goToHome(): Promise<boolean> {
    return this.router.navigate(['/', 'home']);
  }


}
