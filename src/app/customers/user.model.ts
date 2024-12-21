export interface User {
  CustomerId: string;
  Mobile: number;
  Maps_Link: string;
  Name: string;
  City: string;
  Location: string;
  Address: string;
  Password: string;
  cartCount: number;
  KmDistance: number;
  Status: string; // New, Active, Paused, Closed
  SessionId: string;
  KidDob: string;
  Pincode: number;
  customerSinceDate: string;
  StoreId: string;
  referralCode: string;
  CreatedOn: string;
  referredByCode: string;
  DepositAmount: number;
  totalAmount: number;
  amountFromRewards: number;
  remarks: string;
}
