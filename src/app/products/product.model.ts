import { ProductQuantity } from "./quantity/product-quantity.model";

export interface Product {
  _id: string;
  Class: string;
  MRP: number;
  Link: string;
  Code: string;
  Age: string;
  Name: string;
  "Membership Type": string;
  "Continue?": string;
  Brand: string;
  Category: string;
  rent30: number;
  rent15: number;
  bigSize: boolean;
  Untraceable: boolean;
  SearchKey: string;
  StoreId: string;
  AgeType: string;
  NationWide: boolean;
  Franchise: boolean;
  VideoOnInsta: boolean;
  Description: string;
  Quantity: number;
  ShopQty: number;
  quantities: ProductQuantity[];
  DriveImageLink: string;
  Mrp: number;
}
