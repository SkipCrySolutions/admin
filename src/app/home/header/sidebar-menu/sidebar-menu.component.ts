import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AppService } from '../../../app.service';

@Component({
  selector: 'app-sidebar-menu',
  standalone: true,
  templateUrl: 'sidebar-menu.component.html',
  imports: [RouterModule],
})
export class SidebarMenuComponent {
  showDrawer: boolean = false;
  public user: any;

  public showProducts = false;

  public showOrders = false;

  constructor(private router: Router, public appService: AppService) {}

  toggleDrawer() {
    this.showDrawer = !this.showDrawer;
    console.log('fghjk ', this.showDrawer);
    if (!this.showDrawer) {
      this.showOrders = false;
      this.showProducts = false;
    }
  }

  public loadStores(): void {
    this.router.navigate(['stores']);
    this.toggleDrawer();
  }

  public loadCustomers(): void {
    this.router.navigate(['customers']);
    this.toggleDrawer();
  }

  public login() {
    this.router.navigate(['login']);
    this.toggleDrawer();
  }
}
