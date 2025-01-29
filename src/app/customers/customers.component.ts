import { Component } from '@angular/core';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customers',
  standalone: true,
  templateUrl: 'customers.component.html',
  imports: [FormsModule, CommonModule],
})
export class CustomersComponent {
  public users: any = [];
  private copyUsers: any = [];
  public searchQuery: string = '';
  public selectedFilterTag = 'active';
  constructor(private userService: UserService, private router: Router) {
    this.loadByFilterTags('active');
  }

  private getCustomers(value: string): void {
    this.userService.getUsers(value).subscribe((resp: any) => {
      this.users = resp;
      console.log('users => ', this.users);
      this.copyUsers = this.users;
    });
  }

  public loadByFilterTags(value: string) {
    this.resetCustomerDefaults();
    this.selectedFilterTag = value;
    this.getCustomers(value);
  }

  private resetCustomerDefaults() {
    this.users = [];
  }

  public editCustomer(user: any) {
    console.log('user => ', user);
    this.router.navigate(['customer', 'form', user._id, user.CustomerId]);
  }

  public performSearch(): void {
    console.log(this.searchQuery);
    if (this.searchQuery.length >= 3) {
      // Perform search logic here, e.g., filtering users based on searchQuery
      this.users = this.users.filter((user: any) => {
        console.log('user => ', user, this.searchQuery);
        const mobile = String(user.Mobile);
        const searchIncluded =
          (user.CustomerId && user.CustomerId.includes(this.searchQuery)) ||
          (mobile && mobile.includes(this.searchQuery)) ||
          (user.Name && user.Name.includes(this.searchQuery));
        console.log('searchIncluded => ', searchIncluded);
        if (searchIncluded) return user;
      });
      console.log('users => ', this.users);
    } else {
      this.users = this.copyUsers;
    }
  }

  public clearSearch() {
    console.log('before users => ', this.users);
    this.searchQuery = '';
    this.users = this.copyUsers;
    console.log('products after clear filter => ', this.users);
  }

  public addUser() {
    this.router.navigate(['customer', 'form', 'new', 'new']);
  }
}
