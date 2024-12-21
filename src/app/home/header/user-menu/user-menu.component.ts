import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AppService } from '../../../app.service';

@Component({
  selector: 'app-user-menu',
  standalone: true,
  templateUrl: 'user-menu.component.html',
  imports: [RouterModule],
})
export class UserMenuComponent {
  showDrawer: boolean = false;

  constructor(public appService: AppService, private router: Router) {
    const user = this.appService.user();
    console.log('user => ', user);
  }

  toggleDrawer() {
    this.showDrawer = !this.showDrawer;
    console.log('fghjk ', this.showDrawer);
    if (!this.showDrawer) {
    }
  }

  public openLogin() {
    this.router.navigate(['login']).then(() => {
      this.toggleDrawer();
    });
  }

  public openSignup() {
    this.router.navigate(['signup']).then(() => {
      this.toggleDrawer();
    });
  }

  public openLandingPage() {
    localStorage.clear();
    window.location.reload();
  }

  public logout() {
    this.showDrawer = false;
    this.router.navigate(['']);
    localStorage.removeItem('scFranchise');
    this.appService.user.update(() => null);
    this.toggleDrawer();
    window.location.reload();
  }

  public openWhatsapp() {
    const message = `Hey, I am interested in getting franchise. Please share more details`;
    const phoneNumber = 8248284630;

    // Generate the WhatsApp sharing link
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappLink);
  }
}
