import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../user.model';

@Component({
  standalone: true,
  selector: 'app-customer-form',
  templateUrl: 'customer-form.component.html',
  imports: [FormsModule, CommonModule],
})
export class CustomerFormComponent implements OnInit {
  public userId: any;
  public userCode: any;
  public editMode = false;
  public user!: User;

  // form fields
  public name: string = '';
  public phone: number = 0;
  public address: string = '';
  public location: string = '';
  public kmDistance: number = 0;
  public mapsLocation: string = '';
  public zone = '';
  public zones = ['North', 'South', 'East', 'West', 'Centre'];
  public status = '';
  public statusList = ['New', 'Active', 'Paused', 'Stopped', 'Indirect'];
  public depositAmount = 0;
  public rewardsToAdd = 0;
  public totalAmountToAdd = 0;
  public remarks = '';
  public password = '';
  public errorMsg = '';
  constructor(private route: ActivatedRoute, private userService: UserService) {
    this.route.params.subscribe((params) => {
      this.userId = params['Code'];
      this.userCode = params['CustomerId'];
      console.log('sdf => ', this.userId);
      if (this.userId && this.userId !== 'new') {
        this.editMode = true;
        this.getCustomerByCode();
      } else {
        this.editMode = false;
      }
    });
  }

  public ngOnInit(): void {
    if (!this.editMode) {
      this.user = {
        ...this.user,
        CustomerId: '',
        DepositAmount: 0,
        totalAmount: 0,
        amountFromRewards: 0,
        Status: 'Indirect',
        City: '',
        Name: '',
        Mobile: 0,
        address: '',
        Location: '',
        Maps_Link: '',
        KmDistance: 0,
        remarks: '',
        StoreId: 'CHNPER1',
      };
      console.log('user new => ', this.user);
    }
  }

  public addOrEditUser() {
    console.log('fghjk => ', this.user, this.rewardsToAdd, this.totalAmountToAdd);
    if (
      this.user.Mobile &&
      this.user.Pincode &&
      this.user.Name &&
      this.user.Status &&
      this.user.StoreId
    ) {
      let user = {
        ...this.user,
        amountFromRewards: this.user.amountFromRewards + this.rewardsToAdd,
        totalAmount: this.user.totalAmount + this.rewardsToAdd + this.totalAmountToAdd,
        Status: this.status || this.user.Status,
        DepositAmount: isNaN(this.depositAmount)
          ? this.user.DepositAmount
          : this.depositAmount,
      };
      if (this.password) {
        user = { ...user, Password: this.password };
      }
      if (this.kmDistance) {
        user = { ...user, KmDistance: this.kmDistance };
      }
      console.log('userrrr => ', user);
      this.userService.addUser(user, this.editMode).subscribe(
        () => {
          window.location.reload();
        },
        (error) => {
          this.errorMsg = error.error;
        }
      );
    } else {
      alert('Please fill all required fields');
    }
  }

  public updatePincode() {
    this.userService
      .getLatLongFromPincode(this.user.Pincode)
      .subscribe((res) => {
        const storeCoords = {
          latitude: 12.981226084319667,
          longitude: 80.22623465767104,
        };
        this.kmDistance = this.getDistanceFromLatLonInKm(res, storeCoords);
        console.log('distance => ', this.kmDistance);
      });
  }

  private getCustomerByCode() {
    this.userService
      .getUserById(this.userId, this.userCode)
      .subscribe((user: User) => {
        this.user = user;
        console.log('user => ', user);
        this.name = user.Name;
        this.phone = user.Mobile;
        this.address = user.address;
        this.location = user.Location;
        this.kmDistance = user.KmDistance;
        this.mapsLocation = user.Maps_Link;
        this.depositAmount = +user.DepositAmount;
        this.status = user.Status;
      });
  }

  private getDistanceFromLatLonInKm(coords1: any, coords2: any): number {
    console.log(coords2);
    const lat1 = coords1.latitude;
    const lat2 = parseFloat(coords2.latitude);
    const lon1 = coords1.longitude;
    const lon2 = parseFloat(coords2.longitude);
    console.log(lat1, lon1, lat2, lon2);
    const earthRadiusKm = 6371; // Radius of the earth in kilometers
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) *
        Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadiusKm * c; // Distance in km
    return +distance.toFixed(2);
  }

  private deg2rad(deg: number) {
    return deg * (Math.PI / 180);
  }
}
