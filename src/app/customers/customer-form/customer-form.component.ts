import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { UserService } from "../user.service";
import { FormsModule } from "@angular/forms";

@Component({
  standalone: true,
  selector: 'app-customer-form',
  templateUrl: 'customer-form.component.html',
  imports: [FormsModule]
})
export class CustomerFormComponent {
  public userId: any;
  public userCode: any;
  public editMode = false;
  public user: any;

  // form fields
  public name: string = '';
  public phone: string = '';
  public address: string = '';
  public location: string = '';
  public kmDistance: string = '';
  public mapsLocation: string = '';
  constructor(private route: ActivatedRoute, private userService: UserService) {
    this.route.params.subscribe(params => {
      this.userId = params['Code'];
      this.userCode = params['CustomerId'];
      console.log('sdf => ', this.userId);
      if (this.userId) {
        this.editMode = true;
        this.getCustomerByCode();
      } else {
        this.editMode = false;
      }
    });
  }

  private getCustomerByCode() {
    this.userService.getUserById(this.userId, this.userCode).subscribe((user: any) => {
      this.user = user;
      console.log('user => ', user);
      this.name = user.Name;
      this.phone = user.Mobile;
      this.address = user.Address;
      this.location = user.Location;
      this.kmDistance = user.KmDistance;
      this.mapsLocation = user.Maps_Link;
    });
  }
}
