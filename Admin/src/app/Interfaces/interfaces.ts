export interface User{
    MaKH: string;
    Ho: string;
    Ten: string;
    GioiTinh: string;
    NgaySinh: string;
    DiaChiChinh: string;
    Sdt: string;
    TinhThanh: string;
    QuanHuyen: string;
    Email: string;
    Password: string;
}

export interface HoaDon{
    MaHD: string;
    MaKH: string;
    TenKH: string;
    MaGiamGia: string;
    TenMGG: string;
    MaPTTT: string;
    TenPTTT: string;
    TrangThai: string;
    Ngaymua: string;
    Ngaynhanhang: string;
    TongTien: number;
    GhiChu: string;
    MaPTVC: string;
    TenPTVC: string;
}

export interface HoaDon_KH{
    MaKH: string;
}

export interface HoaDon_MaGiamGia{
    MaGiamGia: string;
}

export interface HoaDon_MaPTTT{
    MaPTTT: string;
}

export interface HoaDon_MaPTVC{
    MaPTVC: string;
}

export interface CTHD{
    TenSP: string;
    MaHD: string;
    MaSP: string;
    MaSize: string;
    SoLuong: number;
    GiaBan: number;
    GiaTriSize: string;
}

export interface CTHD_MaSP{
    MaSP: number;
}

export interface CTHD_MaHD{
    MaHD: number;
}

export interface CTHD_MaSize{
    MaSize: number;
}

export interface MGG{
    MaGiamGia: string;
    Ten: string;
    GiaTri: string;
    HanSuDung: string;
    DieuKien: string;
}

export interface Size{
    MaSize: string;
    GiaTri: string;
}

export interface PTTT{
    MaPTTT: string;
    Ten: string;
    Phi: number;
}

export interface PTVC{
    MaPTVC: string;
    Ten: string;
    Phi: number;
}

export interface ThongKe{
    Nam: string;
    Thang: string;
    Soluongdonhang: number;
    Sotiengiamgia: number;
    Sotienvanchuyen: number;
    Doanhthu: number;
}

export interface TiLe{
    Tuoi: number;
    TongSoLuong: number;
    TiLe: number;
}

// quản lý sản phẩm
export interface SP{
    TenNH: string;
    MaNH: string;
    MaDM: string;
    TenDM: string;
    MaLPT: string;
    TenLPT: string;
    MaSP: string;
    Ten: string;
    Gia: string;
    Km: string;
    TrangThai: string;
    c1_h1: string;
    c1_h2: string;
    c1_h3: string;
    c1_h4: string;
    c1_h5: string;
    c2_h1: string;
    c2_h2: string;
    c2_h3: string;
    c2_h4: string;
    c2_h5: string;
    GioiThieu: string;
    DongSanPham: string;
    BoSuuTap: string;
    NoiSanXuat: string;
    CheDoBaoHanh: string;
    CuaHangPhanPhoi: string;
    PhuKienTheoKem: string;
    CheDoVanChuyen: string;
    ChiTietVanChuyen: string;
    GioiTinh: string;
    ChatLieu: string;
    MauSac: string;
    PhanThan: string;
    LopLot: string;
    DeGiay: string;
	TinhNangSanPham: string;
    KichThuocSanPham : string;
}

export interface NH{
    MaNH: string;
    Ten: string;
}

export interface DM{
    MaDM: string;
    TenDM: string;
}

export interface LPT{
    MaLPT: string;
    Ten: string;
}

// sp size

export interface SPSize{
    MaSP: string;
    MaSize: string;
    SoLuong : string;
    Giatri :string;
}