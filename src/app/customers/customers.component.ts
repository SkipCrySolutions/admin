import { Component } from "@angular/core";
import { UserService } from "./user.service";
import { Router } from "@angular/router";
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-customers',
  standalone: true,
  templateUrl: 'customers.component.html',
  imports: [FormsModule]
})
export class CustomersComponent {
  public users: any = [];
  private copyUsers: any = [];
  searchQuery: string = '';
  constructor(private userService: UserService, private router: Router) {
    this.getCustomers();
  }

  private getCustomers(): void {
    this.userService.getUsers().subscribe((resp: any) => {
      this.users = resp;
      console.log('users => ', this.users);
    });
  }

  public editCustomer(user: any) {
    this.router.navigate(['customer', 'form', user._id]);
  }

  public performSearch(): void {
    console.log(this.searchQuery);
    if (this.searchQuery.length >= 3) {
      // Perform search logic here, e.g., filtering users based on searchQuery
      this.users = this.users.filter((user: any) => {
        console.log('user => ', user);
        const searchIncluded = user.Code.toLowerCase().includes(this.searchQuery);
        if (searchIncluded)
          return user;
      }
      );
      console.log('users => ', this.users);
    }
  }

  public clearSearch() {
    console.log('before users => ', this.users);
    this.searchQuery = '';
    this.users = this.copyUsers;
    console.log('products after clear filter => ', this.users);
  }

  public addUser() {
    this.router.navigate(['customer', 'form', 'new']);
  }
}
