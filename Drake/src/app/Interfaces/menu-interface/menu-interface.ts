export interface iCategoryRaw {
  TenNH: string;
  TenDM: string;
}
export interface iCategoryProcessed {
  TenNH: string;
  DM: { TenDM: string }[];
}
export interface iAccessory {
  TenNH: string;
}
