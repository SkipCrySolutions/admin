import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { ButtonModule } from "primeng/button";
import { DataViewModule } from 'primeng/dataview';
import { ProductComponent } from "./product/product.component";
import { ProductService } from "./product.service";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: 'app-products',
  standalone: true,
  templateUrl: 'products.component.html',
  imports: [CommonModule, ButtonModule, DataViewModule, ProductComponent, FormsModule]
})
export class ProductsComponent {
  @Input()
  public products: any = [];

  public copyProducts = [];

  public layout: 'grid' | 'list' = 'list';

  searchQuery: string = '';

  public selectedTab = 'all';

  constructor(private productService: ProductService, private router: Router) {
    this.getProducts();
    // this.selectTab('franchise');
  }

  public performSearch(): void {
    console.log(this.searchQuery);
    if (this.searchQuery.length >= 3) {
      // Perform search logic here, e.g., filtering products based on searchQuery
      this.products = this.products.filter((product: any) => {
        console.log('product => ', product);
        const searchIncluded = product.Name.toLowerCase().includes(this.searchQuery);
        if (searchIncluded)
          return product;
      }
      );
      console.log('products +> ', this.products);
    }
  }

  public clearSearch() {
    console.log('before products => ', this.products);
    this.searchQuery = '';
    this.products = this.copyProducts;
    console.log('products after clear filter => ', this.products);
  }

  public addProduct() {
    this.router.navigate(['product', 'form', 'new', 'CHNPER1']);
  }

  public selectTab(tab: string) {
    this.selectedTab = tab;
    if (tab === 'franchise') {
      this.products = this.copyProducts.filter((product: any) => product.Franchise);
      console.log('franchise products => ', this.products);
    } else {
      this.products = this.copyProducts;
    }
  }

  private getProducts(): void {
    this.productService.getAllProducts().subscribe((resp: any) => {
      this.products = resp;
      this.copyProducts = this.products;
      console.log('products => ', this.products);
    });
  }
}

