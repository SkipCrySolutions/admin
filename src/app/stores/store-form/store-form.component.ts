import { Component } from "@angular/core";
import { Store } from "../store.model";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { StoreService } from "../store.service";

@Component({
  selector: 'app-store-form',
  standalone: true,
  templateUrl: 'store-form.component.html',
  imports: [FormsModule]
})
export class StoreFormComponent {
  public store: Store | undefined;
  // form fields
  public storeId: string = '';
  public name: string = '';
  public owner: string = '';
  public ownerPhone: number | undefined;
  public managerName: string = '';
  public managerPhone: number | undefined;
  public address: string = '';
  public pincode: number | undefined;
  public mapsLocation: string = '';
  public latitude: number | undefined;
  public longitude: number | undefined;
  public editMode = false;
  constructor(private route: ActivatedRoute, private storeService: StoreService, private router: Router) {
    this.route.params.subscribe(params => {
      this.storeId = params['Code'];
      console.log('sdf => ', this.storeId);
      if (this.storeId) {
        this.editMode = true;
        this.getStoreByCode();
      } else {
        this.editMode = false;
      }
    });
  }

  private getStoreByCode() {
    this.storeService.getStoreByCode(this.storeId).subscribe((store: Store) => {
      this.store = store;
      console.log('store => ', store);
      this.name = store.Name;
      this.owner = store.Owner;
      this.ownerPhone = store.OwnerContact;
      this.managerName = store.Manager;
      this.managerPhone = store.ManagerContact;
      this.address = store.Address;
      this.pincode = store.Pincode;
      this.mapsLocation = store.MapsLocation;
      this.latitude = store.Latitude;
      this.longitude = store.Longitude;
    });
  }

  public editStore() {
    this.store = {
      ...this.store,
      Name: this.name,
      Address: this.address,
      Owner: this.owner,
      Manager: this.managerName,
      OwnerContact: this.ownerPhone as number,
      ManagerContact: this.managerPhone as number,
      MapsLocation: this.mapsLocation,
      Latitude: this.latitude as number,
      Longitude: this.longitude as number,
      Pincode: this.pincode as number
    } as Store;
    console.log('store => ', this.store);
    this.storeService.editStore(this.store).subscribe(() => {
      console.log('success');
      this.router.navigate(['stores']);
    })
  }
}
