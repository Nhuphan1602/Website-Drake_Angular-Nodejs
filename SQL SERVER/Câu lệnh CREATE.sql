--create database Drake1
--on primary(
--name = Drake1_Data,
--filename = 'E:\DuongXuanHuy_207pm68593\Drake1_Data.mdf',
--size = 35MB,
--maxsize = 70MB,
--filegrowth = 1 MB)

--log on(
--name = Drake1_Log,
--filename = 'E:\DuongXuanHuy_207pm68593\Drake1_Log.ldf',
--size = 8MB,
--maxsize = 10MB,
--filegrowth = 1MB)
--Bảng nhãn hiệu
create table NhanHieu(
MaNH int identity(1,1) primary key,
Ten nvarchar(100) unique)
--Bảng danh mục
create table DanhMuc(
MaDM int identity(1,1) primary key,
MaNH int,
Ten nvarchar(100),
foreign key (MaNH) references NhanHieu(MaNH),
unique(MaNH,Ten))
--Bảng giày
create table Giay(
MaDM int,
MaSP varchar(7) primary key,
Ten nvarchar(100),
Gia int,
Km numeric (4,2),
TrangThai varchar(20),
c1_h1 varchar(200),	
c1_h2 varchar(200),
c1_h3 varchar(200),
c1_h4 varchar(200),
c1_h5 varchar(200),
c2_h1 varchar(200),
c2_h2 varchar(200),
c2_h3 varchar(200),
c2_h4 varchar(200),
c2_h5 varchar(200),
GioiThieu nvarchar(max),
DongSanPham nvarchar(100),
BoSuuTap nvarchar(100),
NoiSanXuat nvarchar(100),
CheDoBaoHanh nvarchar(100),
CuaHangPhanPhoi nvarchar(100),
PhuKienTheoKem nvarchar(max),
CheDoVanChuyen nvarchar(100),
ChiTietVanChuyen nvarchar(100),
GioiTinh nvarchar(100),
ChatLieu nvarchar(100),
MauSac nvarchar(100),
PhanThan nvarchar(100),
LopLot nvarchar(100),
DeGiay nvarchar(100),
TinhNangSanPham nvarchar(max),
foreign key (MaDM) references DanhMuc(MaDM))
--Bảng loại phụ trang
create table LoaiPT(
MaLPT int identity(1,1) primary key,
Ten nvarchar(50) not null unique)
--Bảng phụ trang
create table PhuTrang(
MaDM int,
MaSP varchar(7) primary key,
MaLPT int,
Ten nvarchar(100),
Gia int,
Km numeric (4,2),
TrangThai varchar(20),
c1_h1 varchar(200),
c1_h2 varchar(200),
c1_h3 varchar(200),
c1_h4 varchar(200),
c1_h5 varchar(200),
c2_h1 varchar(200),
c2_h2 varchar(200),
c2_h3 varchar(200),
c2_h4 varchar(200),
c2_h5 varchar(200),
GioiThieu nvarchar(max),
DongSanPham nvarchar(100),
BoSuuTap nvarchar(100),
NoiSanXuat nvarchar(100),
CheDoBaoHanh nvarchar(100),
CuaHangPhanPhoi nvarchar(100),
PhuKienTheoKem nvarchar(max),
CheDoVanChuyen nvarchar(100),
ChiTietVanChuyen nvarchar(100),
KichThuocSanPham nvarchar(100),
GioiTinh nvarchar(100),
MauSac nvarchar(100),
TinhNangSanPham nvarchar(max),
foreign key (MaDM) references DanhMuc(MaDM),
foreign key (MaLPT) references LoaiPT(MaLPT))
go

-- Bảng sản phẩm liên quan
Create table SanPhamLienQuan (
MaSP1 varchar(7) ,
MaSP2 varchar(7) ,
primary key(MaSP1, MaSP2)
)



--Bảng khách hàng
Create table KhachHang (
MaKH int IDENTITY (1,1) primary key,
Ho nvarchar(50),
Ten nvarchar(50),
GioiTinh bit,
NgaySinh smalldatetime,
Sdt varchar(11),
DiaChiChinh nvarchar(50),
TinhThanh nvarchar(50),
QuanHuyen nvarchar(50),
Email varchar(50) UNIQUE,
Password varchar(50) 
)

-- Bảng mã giảm giá
Create table MaGiamGia (
MaGiamGia int IDENTITY (1,1) primary key,
Ten nvarchar(9) ,
GiaTri numeric(4,2) ,
DieuKien int,
HanSuDung smalldatetime
)
-- Bảng Khách Hàng - Mã giảm giá
Create table KhachHang_MaGiamGia (
MaGiamGia int,
MaKH int,
SoLanSuDung smallint ,
primary key(MaGiamGia,MaKH),
foreign key (MaGiamGia) references MaGiamGia(MaGiamGia),
foreign key (MaKH) references KhachHang(MaKH)
)


-- Bảng WishList
Create table WishList 
(
MaKH int,
MaSP varchar(7),
primary key (MaKH,MaSP),
foreign key (MaKH) references KhachHang(MaKH)
)
-- Bảng size
create table Size(
MaSize int IDENTITY (1,1) primary key,
GiaTri varchar(50)
)

-- Bảng ShopCart
Create table ShopCart(
MaKH int not null,
MaSP varchar(7) not null,
MaSize int not null,
SoLuong smallint
primary key(MaKH, MaSP, MaSize),
foreign key (MaKH) references KhachHang(MaKH),
foreign key (MaSize) references Size(MaSize)
)


-- Bảng Sản phẩm - Size
create table SanPham_Size(
MaSP varchar(7) not null,
MaSize int not null,
SoLuong smallint,
Primary key (MaSP, MaSize),
foreign key (MaSize) references Size(MaSize)
)


-- Bảng phương thức vận chuyển
create table PhuongThucVanChuyen(
MaPTVC int IDENTITY (1,1) primary key,
Ten nvarchar(max),
Phi int
)
-- Bảng phương thức thanh toán
create table PhuongThucThanhToan(
MaPTTT int IDENTITY (1,1) primary key,
Ten nvarchar(max),
Phi int
)

-- Bảng hóa đơn
create table HoaDon(
MaHD int IDENTITY (1,1) primary key,
MaKH int,
MaGiamGia int, 
MaPTTT int,
MaPTVC int,
TrangThai nvarchar(50),
GhiChu nvarchar(max),
Ngaymua smalldatetime,
Ngaynhanhang smalldatetime,
TongTien int,
foreign key (MaKH) references KhachHang(MaKH),
foreign key (MaPTTT) references PhuongThucThanhToan(MaPTTT),
foreign key (MaPTVC) references PhuongThucVanChuyen(MaPTVC),
foreign key (MaGiamGia) references MaGiamGia(MaGiamGia)
)

-- Bảng chi tiết hóa đơn
create table ChiTietHoaDon(
MaHD int not null,
MaSP varchar(7) not null,
MaSize int not null,
SoLuong smallint,
GiaBan int,
primary key(MaHD, MaSP, MaSize),
foreign key (MaHD) references HoaDon(MaHD),
foreign key (MaSize) references Size(MaSize)
)




