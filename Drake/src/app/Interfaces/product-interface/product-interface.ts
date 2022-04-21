export interface iProductCard {
  TenNH?: string;
  'row#': string;
  Lpt?: string;
  MaSP: string;
  Ten: string;
  DongSanPham: string;
  TinhTrang: string;
  Gia: number;
  Km: number;
  TrangThai: string;
  c1_h1: string;
}
export interface i2ProductCard {
  pc1: iProductCard;
  pc2: iProductCard;
}
export interface iProductDetail {
  TenNH: string;
  TenDM: string;
  MaSP: string;
  Ten: string | null;
  TinhTrang: string | null;
  Gia: number | null;
  Km: number | null;
  c1_h1: string | null;
  c1_h2: string | null;
  c1_h3: string | null;
  c1_h4: string | null;
  c1_h5: string | null;
  c2_h1: string | null;
  c2_h2: string | null;
  c2_h3: string | null;
  c2_h4: string | null;
  c2_h5: string | null;
  GioiThieu: string | null;
  DongSanPham: string | null;
  BoSuuTap: string | null;
  NoiSanXuat: string | null;
  CheDoBaoHanh: string | null;
  CuaHangPhanPhoi: string | null;
  PhuKienTheoKem: string | null;
  CheDoVanChuyen: string | null;
  ChiTietVanChuyen: string | null;
  KichThuocSanPham?: string | null;
  GioiTinh: string | null;
  ChatLieu?: string | null;
  MauSac: string | null;
  PhanThan?: string | null;
  LopLot?: string | null;
  DeGiay?: string | null;
  TinhNangSanPham: string | null;
}
export interface iProductSize {
  MaSize: string;
  GiaTriSize: string;
  SoLuong: number;
}
export interface iSortSelect1 {
  TenDM: string;
  GiaTri: string[];
}
export interface iSortOptionValue1 {
  TenDM: string;
  GiaTri: string;
}
