import { Component, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { DrawerService } from '../../services/drawer.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @ViewChild(MatMenuTrigger, { static: false }) trigger: MatMenuTrigger;
  private drawerOpenedSubscription: Subscription;
  private opened: boolean;

  public userId: string;

  constructor(private route: ActivatedRoute, private router: Router,
              private drawerService: DrawerService, @Inject(PLATFORM_ID) private platformId: any) {

  }

  ngOnInit(): void {
    this.drawerOpenedSubscription = this.drawerService.whenDrawerChanges()
      .subscribe(opened => this.opened = opened);
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
