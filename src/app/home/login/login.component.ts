import { Component } from '@angular/core';
import { FranchiseService } from './franchise.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppHelper } from '../../utils/app.helper';
import { CommonModule } from '@angular/common';
import { Store } from './franchise.model';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: 'login.component.html',
  imports: [RouterModule, FormsModule, CommonModule],
})
export class LoginComponent {
  public mobile!: number;
  public password: string = '';
  public isValidPassword: boolean = false;
  public isValidPhoneNumber: boolean = false;

  public isLoading = false;

  public errorMessage = '';

  constructor(
    public franchiseService: FranchiseService,
    private router: Router,
    private appService: AppService
  ) {}

  public login() {
    this.isLoading = true;
    const user = {
      username: this.mobile,
      password: this.password,
    };
    if (!(this.isValidPassword && this.isValidPhoneNumber)) return;
    this.franchiseService.login(user).subscribe(
      (res: Store) => {
        this.setUser(res);
        // handle navigation
        this.handleNavigation();

        this.isLoading = false;
      },
      (error: any) => {
        this.isLoading = false;
        console.log('error => ', error);
        this.errorMessage = error.error?.error || 'Login Error';
      }
    );
  }

  public validatePassword() {
    this.isValidPassword = AppHelper.validatePassword(this.password);
  }

  public validatePhoneNumber() {
    this.isValidPhoneNumber = AppHelper.validatePhoneNumber(this.mobile);
  }

  private handleNavigation() {
    this.router.navigate(['']);
  }

  private setUser(res: any) {
    this.appService.user.update(() => res);
    AppHelper.saveToLocalStorage('scAdmin', res);
  }
}
