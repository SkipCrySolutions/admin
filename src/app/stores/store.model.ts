export interface Store {
  _id: string;             // MongoDB ObjectId as a string
  StoreId: string;         // Store Identifier
  Name: string;            // Store Name
  Address: string;         // Store Address
  Owner: string;           // Store Owner's Name
  Manager: string;         // Store Manager's Name
  OwnerContact: number;    // Store Owner's Contact Number
  ManagerContact: number;  // Store Manager's Contact Number
  MapsLocation: string;    // Google Maps location URL
  Latitude: number;        // Store Latitude
  Longitude: number;       // Store Longitude
  Pincode: number;         // Store's Postal Code
}
