export interface iUser {
  MaKH: string;
  Ho: string;
  Ten: string;
  GioiTinh: string;
  NgaySinh: string;
  Email: string;
  Sdt: string;
  DiaChiChinh: string;
  TinhThanh: string;
  QuanHuyen: string;
}
export interface iShopCartItem {
  MaSP: string;
  Ten: string;
  Hinh: string;
  Gia: number;
  Km: number;
  DongSanPham: string;
  MaSize: string;
  GiaTriSize: string;
  SoLuong: number;
  isChecked: boolean;
}

export interface iWishListItem {
  MaSP: string;
  Hinh: string;
  Ten: string;
  DongSanPham: string;
  TinhTrang: string;
  Gia: number;
  Km: number;
}

export interface iMaGiamGia {
  Id: string;
  Ten: string;
  GiaTri: number;
  DieuKien: number;
  HanSuDung: string;
  SoLanSuDung: number;
}
export interface iHoaDon {
  MaHD: string;
  MaGiamGia: string | null;
  PhuongThucVanChuyen: string;
  PhuongThucThanhToan: string;
  TrangThai: string;
  GhiChu: string;
  Ngaymua: string;
  Ngaynhanhang: string | null;
  TongTien: number;
}

export interface iPTTT {
  MaPTTT: string;
  Ten: string;
  Phi: number;
}
export interface iPTVC {
  MaPTVC: string;
  Ten: string;
  Phi: number;
}

export interface iThongTinThanhToan {
  MaKH: string;
  HoaDon: {
    MaGiamGia: string;
    MaPTTT: string;
    MaPTVC: string;
    TrangThai: string;
    GhiChu: string;
    NgayMua: string;
    NgayNhanHang: string;
    TongTien: number;
  };
  ChiTietHoaDon: string;
}
