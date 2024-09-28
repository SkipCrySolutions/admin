import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { ListboxModule } from 'primeng/listbox';
import { ButtonModule } from 'primeng/button';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product.model';
import { ProductQuantityComponent } from '../quantity/product-quantity.component';

interface Category {
  name: string;
  code: string;
}

@Component({
  selector: 'app-product-form',
  standalone: true,
  templateUrl: 'product-form.component.html',
  imports: [
    InputTextModule,
    FormsModule,
    InputTextareaModule,
    InputNumberModule,
    DropdownModule,
    CheckboxModule,
    ListboxModule,
    ReactiveFormsModule,
    ButtonModule,
    ProductQuantityComponent
  ],
})
export class ProductFormComponent {
  public name = '';
  public description = '';
  public code = '';
  public age = '';
  public originalPrice = 0;
  public brand = '';
  public link = '';
  public category: any;
  public quantity = 0;
  public bigSize = false;
  public visible = false;
  public franchise = false;
  public searchKey = '';

  public categories: Category[] = [];

  public product: Product | undefined;

  public productAdded = false;

  private productId!: string;

  private productCode!: string;

  private storeId!: string;

  public editMode = false;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.categories = this.getCategories();
    this.route.params.subscribe((params) => {
      this.productCode = params['Code'];
      this.storeId = params['StoreCode'];
      this.productId = params['id'];
      console.log(this.productId);
      if (this.productId !== 'new') {
        this.editMode = true;
        this.getProductByCode();
      } else {
        this.editMode = false;
      }
    });
  }

  public selectCategory(category: any) {
    console.log('fghj => ', category);
    this.category = category;
  }

  public addOrEditProduct() {
    console.log('franchise => ', this.franchise);
    const classType: any = this.getClass(this.originalPrice);
    const rent30: any = this.getRent30(classType);
    const rent15 = rent30 * 0.7;
    this.product = {
      ...this.product,
      Code: this.code,
      Name: this.name,
      Description: this.description,
      MRP: this.originalPrice,
      Age: `${this.age}+`,
      Brand: this.brand,
      Category: this.category || '',
      Class: classType,
      rent30: rent30,
      rent15: rent15,
      bigSize: this.bigSize,
      Link: this.link,
      Franchise: this.franchise,
      SearchKey: this.searchKey,
    } as Product;
    console.log('product => ', this.product);
    this.productService
      .addOrEditProduct(this.product, this.editMode)
      .subscribe(() => {
        this.productAdded = true;
        if (!this.editMode) this.resetForm();
        this.router.navigate(['products']);
      });
  }

  public generateSearchKey() {
    this.searchKey = `${this.name}, ${this.code}, ${this.brand}, ${this.category}, ${this.age}+`;
  }

  private getProductByCode() {
    this.productService
      .getProductByCode(this.productId, this.storeId, this.productCode)
      .subscribe((product: Product) => {
        this.product = product;
        console.log(
          'product => ',product
        );
        this.name = product.Name;
        this.description = product.Description;
        this.code = product.Code;
        this.age = product.Age.slice(0, -1);
        this.originalPrice = product.MRP;
        this.brand = product.Brand;
        this.category = this.getCategory(product.Category).code;
        this.bigSize = product.bigSize;
        this.link = product.Link;
        this.franchise = product.Franchise;
        this.searchKey = product.SearchKey;
        this.quantity = product.Quantity;
      });
  }

  private resetForm() {
    this.code = '';
    this.age = '';
    this.name = '';
    this.description = '';
    this.originalPrice = 0;
    this.brand = '';
    this.link = '';
    this.category = null;
    this.quantity = 0;
    this.bigSize = false;
    this.visible = false;
    this.franchise = false;
    this.searchKey = '';
  }

  private getCategories() {
    return [
      { name: 'Activity Sheets & Binders', code: 'activitySheets' },
      { name: 'Activity Toys', code: 'activityToys' },
      { name: 'Board Books', code: 'boardBooks' },
      { name: 'Cards & Boards', code: 'cardsBoards' },
      { name: 'Cars, Tracks & Trains', code: 'carsTracks' },
      { name: 'Jigsaw Puzzles', code: 'jigsawPuzzles' },
      { name: 'Junior Puzzles', code: 'juniorPuzzles' },
      { name: 'Legos & Blocks', code: 'legosBlocks' },
      { name: 'Magnetic Toys', code: 'magneticToys' },
      { name: 'Montessori Books', code: 'montessoriBooks' },
      { name: 'Montessori Toys', code: 'montessoriToys' },
      { name: 'Musical Books', code: 'musicalBooks' },
      { name: 'Musical Toys', code: 'musicalToys' },
      { name: 'Outdoor Toys', code: 'outdoorToys' },
      { name: 'Peg Boards', code: 'pegBoards' },
      { name: 'Pretend & Play toys', code: 'pretendToys' },
      { name: 'Pull Along Toys', code: 'pullToys' },
      { name: 'Push, Pull & Slide books', code: 'pushBooks' },
      { name: 'Sorting toys', code: 'sortingToys' },
      { name: 'Stacking toys', code: 'stackingToys' },
      { name: 'STEM Books', code: 'stemBooks' },
      { name: 'STEM toys', code: 'stemToys' },
      { name: 'Story Books', code: 'storyBooks' },
      { name: 'Think Books', code: 'thinkBooks' },
      { name: 'Touch & Feel Books', code: 'touchBooks' },
    ];
  }

  private getCategory(category: string) {
    return this.getCategories().filter((t) => {
      return t.code === category;
    })[0];
  }

  private getClass(price: number) {
    if (price > 0 && price <= 500) {
      return 'A';
    } else if (price > 500 && price <= 1500) {
      return 'B';
    } else if (price > 1500) {
      if (price > 1500 && this.bigSize) {
        return 'D';
      }
      return 'C';
    }
    return null;
  }

  private getRent30(classType: string) {
    if (classType === 'A') {
      return 100;
    } else if (classType === 'B') {
      return 150;
    } else if (classType === 'C') {
      return 225;
    }
    return 0;
  }
}
