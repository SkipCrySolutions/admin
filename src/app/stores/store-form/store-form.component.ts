import { Component } from "@angular/core";
import { Store } from "../store.model";
import { FormsModule, NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { StoreService } from "../store.service";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-store-form',
  standalone: true,
  templateUrl: 'store-form.component.html',
  imports: [FormsModule, CommonModule]
})
export class StoreFormComponent {
  public store: Store | undefined;
  
  // Form fields
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

  // Error handling
  public errorMessage: string = '';
  public isSubmitting = false;

  constructor(
    private route: ActivatedRoute, 
    private storeService: StoreService, 
    private router: Router
  ) {
    this.route.params.subscribe(params => {
      this.storeId = params['Code'];
      if (this.storeId) {
        this.editMode = true;
        this.getStoreByCode();
      } else {
        this.editMode = false;
      }
    });
  }

  private getStoreByCode() {
    this.isSubmitting = true;
    this.errorMessage = '';
    this.storeService.getStoreByCode(this.storeId).subscribe({
      next: (store: Store) => {
        this.store = store;
        this.populateFormFields(store);
        this.isSubmitting = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to fetch store details. Please try again.';
        this.isSubmitting = false;
        console.error('Error fetching store:', error);
      }
    });
  }

  private populateFormFields(store: Store) {
    this.name = store.Name;
    this.owner = store.Owner;
    this.ownerPhone = store.OwnerContact;
    this.managerName = store.Manager;
    this.managerPhone = store.ManagerContact;
    this.address = store.Address;
    this.pincode = store.Pincode;
    this.mapsLocation = store.MapsLocation || '';
    this.latitude = store.Latitude;
    this.longitude = store.Longitude;
  }

  public onSubmit(form: NgForm) {
    // Mark form as submitted to trigger validations
    if (form.invalid) {
      Object.keys(form.controls).forEach(field => {
        const control = form.controls[field];
        control.markAsTouched({ onlySelf: true });
      });
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    if (this.editMode) {
      this.editStore();
    } else {
      this.addStore();
    }
  }

  public editStore() {
    if (!this.store) return;

    const updatedStore: Store = {
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
    };

    this.storeService.editStore(updatedStore).subscribe({
      next: () => {
        console.log("store updated successfully");
        this.navigateToStoreList('Store updated successfully');
      },
      error: (error) => {
        this.handleSubmissionError('Failed to update store', error);
      }
    });
  }

  public addStore() {
    const newStore: Store = {
      StoreId: this.storeId,
      Name: this.name,
      Owner: this.owner,
      OwnerContact: this.ownerPhone as number,
      Manager: this.managerName,
      ManagerContact: this.managerPhone as number,
      Address: this.address,
      Pincode: this.pincode as number,
      MapsLocation: this.mapsLocation,
      Latitude: this.latitude as number,
      Longitude: this.longitude as number,
      ParentStoreId: this.storeId,
    };

    this.storeService.addStore(newStore).subscribe({
      next: () => {
        this.navigateToStoreList('Store added successfully');
      },
      error: (error) => {
        this.handleSubmissionError('Failed to add store', error);
      }
    });
  }

  private navigateToStoreList(successMessage?: string) {
    // You can add toast/snackbar logic here if needed
    this.router.navigate(['stores']);
    this.isSubmitting = false;
  }

  private handleSubmissionError(message: string, error: any) {
    this.errorMessage = message;
    this.isSubmitting = false;
    console.error(message, error);
  }

  // Optional method to reset form
  public resetForm() {
    this.storeId = '';
    this.name = '';
    this.owner = '';
    this.ownerPhone = undefined;
    this.managerName = '';
    this.managerPhone = undefined;
    this.address = '';
    this.pincode = undefined;
    this.mapsLocation = '';
    this.latitude = undefined;
    this.longitude = undefined;
  }
}
