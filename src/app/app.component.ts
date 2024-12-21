import { Component, OnInit } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { AppHelper } from './utils/app.helper';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'admin';

  constructor(public appService: AppService) {}

  public ngOnInit(): void {
    // set user
    this.setUser();
  }

  private setUser() {
    const user = AppHelper.getFromLocalStorage('scAdmin');
    if (user) {
      this.appService.user.update(() => user);
    }
  }
}
