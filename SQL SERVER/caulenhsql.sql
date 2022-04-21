use Drake1
-- hiện giày SelectGiay
go
CREATE FUNCTION SelectGiay()
RETURNS TABLE AS
RETURN (
(select ROW_NUMBER() OVER(ORDER BY subquery1.TrangThai ASC,
	case
		WHEN subquery1.Ten like '%converse%' then '1'
		WHEN subquery1.Ten like '%vans%' then '2'
		WHEN subquery1.Ten like '%palladium%' then '3'
		WHEN subquery1.Ten like '%k-swiss%' then '4'
		WHEN subquery1.Ten like '%supra%' then '5'
	END	ASC) AS row#,* from
		(select nh.MaNH, nh.Ten as TenNH, dm.Ten as TenDM,dm.MaDM,g.MaSP,g.Ten, g.Gia,g.Km,
		g.TrangThai,g.c1_h1,g.c1_h2,g.c1_h3,g.c1_h4,g.c1_h5,g.c2_h1,g.c2_h2,g.c2_h3,g.c2_h4,g.c2_h5,
		g.GioiThieu,g.DongSanPham,g.BoSuuTap,g.NoiSanXuat,g.CheDoBaoHanh,g.CuaHangPhanPhoi,g.PhuKienTheoKem,
		g.CheDoVanChuyen,g.ChiTietVanChuyen,g.GioiTinh,g.ChatLieu,g.MauSac,g.PhanThan,g.LopLot,g.DeGiay,
		g.TinhNangSanPham from Giay g
		join DanhMuc dm on g.MaDM = dm.MaDM join NhanHieu nh on dm.MaNH = nh.MaNH) 
	as subquery1) 
)
go

--SelectPT
go
CREATE FUNCTION SelectPT()
RETURNS TABLE AS
RETURN (
	(select ROW_NUMBER() OVER(ORDER BY subquery1.TrangThai ASC,
	case
		WHEN subquery1.Ten like '%converse%' then '1'
		WHEN subquery1.Ten like '%vans%' then '2'
		WHEN subquery1.Ten like '%palladium%' then '3'
		WHEN subquery1.Ten like '%k-swiss%' then '4'
		WHEN subquery1.Ten like '%supra%' then '5'
	END	ASC) AS row#,* from
		(select pt.MaSP,pt.Ten, nh.MaNH,nh.Ten as TenNH,dm.Ten as TenDM,dm.MaDM,lpt.MaLPT,lpt.Ten as TenLPT, pt.Gia,pt.Km,pt.TrangThai,pt.c1_h1,
		pt.c1_h2,pt.c1_h3,pt.c1_h4,pt.c1_h5,pt.c2_h1,pt.c2_h2,pt.c2_h3,pt.c2_h4,pt.c2_h5,
		pt.GioiThieu,pt.DongSanPham,pt.BoSuuTap,pt.NoiSanXuat,pt.CheDoBaoHanh,pt.CuaHangPhanPhoi,pt.PhuKienTheoKem,
		pt.CheDoVanChuyen,pt.ChiTietVanChuyen,pt.GioiTinh,pt.MauSac,pt.KichThuocSanPham, pt.TinhNangSanPham from PhuTrang pt
		join  DanhMuc dm on pt.MaDM = dm.MaDM join NhanHieu nh on dm.MaNH = nh.MaNH join LoaiPT lpt on pt.MaLPT = lpt.MaLPT) 
	as subquery1) 
)
go

--showGiay
go
create proc showGiay as
BEGIN
	select * from dbo.SelectGiay()
END
go


-- hiện phụ trang
go
create proc showPT as
BEGIN
	select * from dbo.SelectPT()
END

go
-- hiện mã sản phẩm theo nhãn hiệu
go
create proc showMaSPByNH(@manh smallint) as
BEGIN
	declare @tennh varchar(20)
	set @tennh = (select SUBSTRING(Ten, 1, 1) from NhanHieu where MaNH = @manh )
	select top 1 strq.MaSP from (select g.MaSP from Giay g union select pt.MaSP from PhuTrang pt) as strq where MaSP like '%'+@tennh+'%' order by MASP desc
END
go

-- hiện nhãn hiệu
go
create proc showNH as	
BEGIN
	select MaNH,Ten from NhanHieu
	order by MaNH asc
END
go

-- hiện mã danh mục theo nhãn hiệu
go
create proc showMaDMByNH(@manh varchar(1)) as
BEGIN
	select MaDM, Ten as TenDM from DanhMuc where MaNH = @manh order by MADM asc
END
go


-- thêm mới sản phẩm
go
create proc addGiay(@madm smallint,@masp varchar(7),@tensp nvarchar(100),@gia int,@km numeric(4, 2),@trangthai varchar(20),@c1_h1 varchar(200)) as
BEGIN
	insert into Giay (MaDM,MaSP,Ten,Gia,Km,TrangThai,c1_h1) values (@madm,@masp,@tensp,@gia,@km,@trangthai,@c1_h1)
END
go

-- addPT
go
create proc addPT(@madm smallint,@masp varchar(7),@malpt smallint, @tensp nvarchar(100),@gia int,@km numeric(4, 2),@trangthai varchar(20),@c1_h1 varchar(200)) as
BEGIN
	insert into PhuTrang (MaDM,MaSP,MaLPT,Ten,Gia,Km,TrangThai,c1_h1) values (@madm,@masp,@malpt,@tensp,@gia,@km,@trangthai,@c1_h1)
END
go

-- show Loại phụ trang
go
create proc showLPT as	
BEGIN
	select MaLPT,Ten from LoaiPT
	order by MaLPT asc
END
go

--AnhSP
go
create proc AnhSP(@table varchar(20), @col nvarchar(20), @link nvarchar(max), @masp nvarchar(7)) as	
BEGIN
	Declare @sqlCommand nvarchar(300)
	if(@table = 'Giay')
	BEGIN
		set @sqlCommand = N'update Giay set ' + @col +' = @link where MaSP = @masp';
	END
	else if(@table = 'PhuTrang')
	BEGIN
		set @sqlCommand = N'update PhuTrang set ' + @col +' = @link where MaSP = @masp';
	END
	execute sp_executesql @sqlCommand,  N'@masp nvarchar(7),@link nvarchar(max)', @masp = @masp,@link = @link;
	print @sqlCommand
END
go

--up_Giay
go
create proc up_Giay(@masp varchar(7),@masp2 varchar(7), @madm int, @tensp nvarchar(100), @gia int, @km numeric(4, 2), @trangthai varchar(20)) as	
BEGIN
	if exists(select MaSP from Giay where MaSP = @masp2)
	BEGIN
		update Giay set MaSP = @masp, MaDM = @madm, Ten = @tensp, Gia = @gia, Km = @km, TrangThai = @trangthai  where MaSP = @masp2
	END
END
go

--up_PT
go 
create proc up_PT(@masp varchar(7),@masp2 varchar(7), @madm int,@malpt int, @tensp nvarchar(100), @gia int, @km numeric(4, 2), @trangthai varchar(20)) as	
BEGIN
	if exists(select MaSP from PhuTrang where MaSP = @masp2)
	BEGIN
		update PhuTrang set MaSP = @masp,MaLPT = @malpt, MaDM = @madm, Ten = @tensp, Gia = @gia, Km = @km, TrangThai = @trangthai  where MaSP = @masp2
	END
END
go

--up_TimKiemGiay
go 
create proc up_TimKiemGiay(@timkiem nvarchar(200),@timkiemtheo nvarchar(50)) as	
BEGIN
	BEGIN
		if(ISNUMERIC(@timkiem) != 1)
		BEGIN
			set @timkiem = LOWER(@timkiem)
		END
		if(@timkiemtheo = 'MaNH')
		BEGIN
			select * from dbo.SelectGiay() where MaNH = @timkiem
		END
		else if(@timkiemtheo = 'MaSP')
		BEGIN
			select * from dbo.SelectGiay() where MaSP like '%' + @timkiem + '%'
		END
		else if(@timkiemtheo = 'MaDM')
		BEGIN
			select * from dbo.SelectGiay() where MaDM = @timkiem
		END
		else if(@timkiemtheo = 'Ten')
		BEGIN
			select * from dbo.SelectGiay() where Ten like '%' + @timkiem + '%'
		END
		else if(@timkiemtheo = 'GiaTrenTu')
		BEGIN
			select * from dbo.SelectGiay() where Gia >=  cast(@timkiem as int)
		END
		else if(@timkiemtheo = 'GiaDuoiTu')
		BEGIN
			select * from dbo.SelectGiay() where Gia <=  cast(@timkiem as int)
		END
		else if(@timkiemtheo = 'KmTrenTu')
		BEGIN
			select * from dbo.SelectGiay() where Km >= cast(@timkiem as numeric(4,2))
		END
		else if(@timkiemtheo = 'KmDuoiTu')
		BEGIN
			select * from dbo.SelectGiay() where Km <= cast(@timkiem as numeric(4,2))
		END
				else if(@timkiemtheo = 'TrangThai')
		BEGIN
			select * from dbo.SelectGiay() where 
			TrangThai = 
			Case 
				when @timkiem = 'new' or @timkiem like N'%mới%' then 'a-new'
				when @timkiem = 'restock' or @timkiem like N'%bổ sung%' then 'b-restock'
				when @timkiem = 'none' or @timkiem like N'%hết hàng%' then 'c-non'
			end;
		END	
	END
END
go

--up_TimKiemPT
go 
create proc up_TimKiemPT(@timkiem nvarchar(200),@timkiemtheo nvarchar(50)) as	
BEGIN
	BEGIN
		if(ISNUMERIC(@timkiem) != 1)
		BEGIN
			set @timkiem = LOWER(@timkiem)
		END
		if(@timkiemtheo = 'MaNH')
		BEGIN
			select * from dbo.SelectPT() where MaNH = @timkiem
		END
		else if(@timkiemtheo = 'MaSP')
		BEGIN
			select * from dbo.SelectPT() where MaSP like '%' + @timkiem + '%'
		END
		else if(@timkiemtheo = 'MaLPT')
		BEGIN
			select * from dbo.SelectPT() where MaLPT = @timkiem
		END
		else if(@timkiemtheo = 'MaDM')
		BEGIN
			select * from dbo.SelectPT() where MaDM = @timkiem
		END
		else if(@timkiemtheo = 'Ten')
		BEGIN
			select * from dbo.SelectPT() where Ten like '%' + @timkiem + '%'
		END
		else if(@timkiemtheo = 'GiaTrenTu')
		BEGIN
			select * from dbo.SelectPT() where Gia >= cast(@timkiem as int)
		END
		else if(@timkiemtheo = 'GiaDuoiTu')
		BEGIN
			select * from dbo.SelectPT() where Gia <= cast(@timkiem as int)
		END
		else if(@timkiemtheo = 'KmTrenTu')
		BEGIN
			select * from dbo.SelectPT() where Km >= cast(@timkiem as numeric(4,2))
		END
		else if(@timkiemtheo = 'KmDuoiTu')
		BEGIN
			select * from dbo.SelectPT() where Km <= cast(@timkiem as numeric(4,2))
		END
				else if(@timkiemtheo = 'TrangThai')
		BEGIN
			select * from dbo.SelectPT() where 
			TrangThai = 
			Case 
				when @timkiem = 'new' or @timkiem like N'%mới%' then 'a-new'
				when @timkiem = 'restock' or @timkiem like N'%bổ sung%' then 'b-restock'
				when @timkiem = 'none' or @timkiem like N'%hết hàng%' then 'c-non'
			end;
		END	
	END
END
go 

--up_CTGiay
go
create proc up_CTGiay(@masp varchar(7), @gthieu nvarchar(MAX), @dsp nvarchar(100), @bst nvarchar(100), @nsx nvarchar(100), @cdbh nvarchar(100), @chpp nvarchar(100),
@pktk nvarchar(MAX), @cdvc nvarchar(100), @ctvc nvarchar(100), @gtinh nvarchar(100), @cl nvarchar(100), @ms nvarchar(100), @tnsp nvarchar(MAX), @pt nvarchar(100),
@ll nvarchar(100), @dg nvarchar(200)) as	
BEGIN
	if exists(select MaSP from Giay where MaSP = @masp)
	BEGIN
		update Giay set GioiThieu = @gthieu,DongSanPham = @dsp,BoSuuTap = @bst,NoiSanXuat = @nsx,CheDoBaoHanh = @cdbh,CuaHangPhanPhoi = @chpp,
		PhuKienTheoKem = @pktk,CheDoVanChuyen = @cdvc,ChiTietVanChuyen = @ctvc,GioiTinh = @gtinh,ChatLieu = @cl,MauSac = @ms,
		PhanThan = @pt,LopLot = @ll,DeGiay = @dg, TinhNangSanPham = @tnsp where MaSP = @masp
	END
END
go

--up_CTPT
go
create proc up_CTPT(@masp varchar(7), @gthieu nvarchar(MAX), @dsp nvarchar(100), @bst nvarchar(100), @nsx nvarchar(100), @cdbh nvarchar(100), @chpp nvarchar(100),
@pktk nvarchar(MAX), @cdvc nvarchar(100), @ctvc nvarchar(100), @gtinh nvarchar(100), @ms nvarchar(100), @tnsp nvarchar(MAX), @ktsp nvarchar(100)) as	
BEGIN
	if exists(select MaSP from PhuTrang where MaSP = @masp)
	BEGIN
		update PhuTrang set GioiThieu = @gthieu,DongSanPham = @dsp,BoSuuTap = @bst,NoiSanXuat = @nsx,CheDoBaoHanh = @cdbh,CuaHangPhanPhoi = @chpp,
		PhuKienTheoKem = @pktk,CheDoVanChuyen = @cdvc,ChiTietVanChuyen = @ctvc,GioiTinh = @gtinh,KichThuocSanPham = @ktsp, TinhNangSanPham = @tnsp where MaSP = @masp
	END
END
go

--usp_delete_sp
go
create proc usp_delete_sp (@masp varchar(7)) as
BEGIN
	IF exists(Select MaSP from Giay where MaSP = @masp) and not exists(Select MaSP from PhuTrang where MaSP = @masp)
		BEGIN
			Delete from WishList where MaSP = @masp
			Delete from ShopCart where MaSP = @masp
			Delete from ChiTietHoaDon where MaSP = @masp
			Delete  from SanPhamLienQuan where MaSP1 = @masp or MaSP2 = @masp
			Delete from SanPham_Size where MaSP = @masp
			Delete from Giay where MaSP = @masp
		END
	ELSE IF exists(Select MaSP from PhuTrang where MaSP = @masp) and not exists(Select MaSP from Giay where MaSP = @masp)
		BEGIN
			Delete from WishList where MaSP = @masp
			Delete from ShopCart where MaSP = @masp
			Delete from ChiTietHoaDon where MaSP = @masp
			Delete  from SanPhamLienQuan where MaSP1 = @masp or MaSP2 = @masp
			Delete from SanPham_Size where MaSP = @masp
			Delete from PhuTrang where MaSP = @masp
		END
	ELSE
		BEGIN
			declare @msg nvarchar(max) = FORMATMESSAGE(N'Mã sản phẩm %s không tồn tại',@masp);
			THROW 60000, @msg, 1; 
		END
END
go


--usp_delete_hoadon
go
create procedure usp_delete_hoadon(@mahd int) as
	BEGIN
		IF exists (select MaHD from HoaDon where MaHD = @mahd)
			BEGIN 
				if exists (select MaHD from ChiTietHoaDon where MaHD = @mahd)
					begin
						delete from ChiTietHoaDon where MaHD = @mahd
						delete from HoaDon where MaHD = @mahd
					end
				else
					begin
						delete from HoaDon where MaHD = @mahd
					end
			END
		ELSE
			BEGIN
				print N'Mã hóa đơn không tồn tại.'
			END
	END
go


-- Proc show CTHD
go
create proc showCTHD as
begin
	select cast(cthd.MaHD as varchar)as MaHD , cthd.MaSP, g.Ten as TenSP, cast(cthd.MaSize as varchar)as MaSize, s.GiaTri as GiaTriSize, cthd.SoLuong, cthd.GiaBan  from ChiTietHoaDon cthd 
		join Giay g on cthd.MaSP = g.MaSP 
		join Size s on cthd.MaSize = s.MaSize 
	union
	select cast(cthd.MaHD as varchar)as MaHD, cthd.MaSP, pt.Ten as TenSP, cast(cthd.MaSize as varchar)as MaSize, s.GiaTri as GiaTriSize, cthd.SoLuong, cthd.GiaBan from ChiTietHoaDon cthd 
		join PhuTrang pt on cthd.MaSP = pt.MaSP 
		join Size s on cthd.MaSize = s.MaSize 
end
go


-- Proc deleteCTHD
go
create proc deleteCTHD(@mahd int, @masp varchar(7), @masize int) as
begin 
if exists (select MaHD from HoaDon where @mahd = MaHD)
	begin
		if exists (select MaHD from HoaDon where @mahd = MaHD)
			begin
				delete from ChiTietHoaDon where MaHD = @mahd and MaSP = @masp and MaSize = @masize
			end
		else
			begin
				print N'Mã không tồn tại'
			end
	end
else
	begin
		print N'Mã không tồn tại'
	end
end
go

-- Proc saveCTHD
go
create proc saveCTHD(@mahd int, @masp varchar(7), @masize int, @soluong int, @giaban int ,@mahd_up int, @masp_up varchar(7), @masize_up int) as
begin
	if exists (select MaHD from HoaDon where MaHD = @mahd) 
	and exists (select stringquery.Masp from (select masp from Giay union select masp from PhuTrang) as stringquery where stringquery.Masp = @masp)
	and exists (select MaSize from Size where MaSize = @masize)
		begin
			update ChiTietHoaDon set MaHD = @mahd, MaSP = @masp, MaSize = @masize, SoLuong = @soluong, GiaBan = @giaban
			where MaHD = @mahd_up and MaSP = @masp_up and MaSize = @masize_up
		end
	else
		begin
			print N'Mã hóa đơn hoặc mã sản phẩm hoặc mã size không hợp lệ'
		end
end
go


-- Proc option CTHD_MaSP
go
create proc showMaSP as
begin
	select MaSP from PhuTrang
	union
	select MaSP from Giay
end
go

-- Proc option CTHD_MaHD
go
create proc showMaHD as
begin
	select MaHD from HoaDon
end
go


-- Proc option CTHD_MaSize
go
create proc showMaSize as
begin
	select MaSize from Size
end
go


-- Proc showHD
go
create proc showHD as
begin
	select MaHD, HoaDon.MaKH, FORMATMESSAGE('%s %s', KhachHang.Ho, KhachHang.Ten) as 'TenKH',HoaDon.MaGiamGia, MaGiamGia.Ten as 'TenMGG',
	HoaDon.MaPTTT,PhuongThucThanhToan.Ten as 'TenPTTT',TrangThai, Ngaymua, Ngaynhanhang,TongTien,GhiChu, 
	HoaDon.MaPTVC, PhuongThucVanChuyen.Ten as TenPTVC from HoaDon 
		left join KhachHang on HoaDon.MaKH = KhachHang.MaKH
		left join MaGiamGia on HoaDon.MaGiamGia = MaGiamGia.MaGiamGia
		left join PhuongThucThanhToan on HoaDon.MaPTTT = PhuongThucThanhToan.MaPTTT
		left join PhuongThucVanChuyen on HoaDon.MaPTVC = PhuongThucVanChuyen.MaPTVC
end
go


--Proc saveHD
go 
create proc saveHD(@makh int, @magiamgia int, @mapttt int, @maptvc int, @trangthai nvarchar(20), @ngaymua smalldatetime, @ngaynhanhang smalldatetime, @tongtien int,@ghichu nvarchar(50),@mahd int) as
begin
	update HoaDon set MaKH = @makh, MaGiamGia = @magiamgia, MaPTVC = @maptvc, MaPTTT = @mapttt, TrangThai = @trangthai, Ngaymua = @ngaymua, Ngaynhanhang = @ngaynhanhang, TongTien = @tongtien, GhiChu = @ghichu where MaHD = @mahd
end
go


--Proc deleteHD
go
create proc deleteHD(@mahd int) as
begin
	if exists (select MaHD from HoaDon where MaHD = @mahd)
		begin
			if exists (select MaHD from ChiTietHoaDon where MaHD = @mahd)
				begin
					delete from ChiTietHoaDon where MaHD = @mahd
					delete from HoaDon where MaHD = @mahd
				end
			else
				begin
					delete from HoaDon where MaHD = @mahd
				end
		end
	else
		begin
			print N'Mã hóa đơn không tồn tại'
		end
end
go


--Proc option HoaDon_MaKH
go
create proc showMaKH as
begin
	select MaKH from KhachHang
end
go


--Proc option HoaDon_MaGiamGia
go
create proc showMaGiamGia as
begin
	select MaGiamGia from MaGiamGia
end
go


--Proc option Hoadon_MaPTTT
go
create proc showMaPTTT as
begin
	select MaPTTT from PhuongThucThanhToan
end
go


--Proc option Hoadon_MaPTVC
go
create proc showMaPTVC as
begin
	select MaPTVC from PhuongThucVanChuyen
end
go


--Proc showMGG
go 
create proc showMGG as
begin
	Select * from MaGiamGia
end
go


--Proc addMGG
go
create proc addMGG(@tenmgg nvarchar(9), @giatri numeric(4,2),@dieukien int, @hsd smalldatetime) as
begin
	insert into MaGiamGia(Ten,GiaTri,DieuKien,HanSuDung) values (@tenmgg,@giatri,@dieukien,@hsd)
end
go


--Proc saveMGG
go
create proc saveMGG(@tenmgg nvarchar(9), @giatri numeric(4,2),@dieukien int ,@hsd smalldatetime, @magiamgia int) as
begin
	update MaGiamGia set Ten = @tenmgg, GiaTri = @giatri, DieuKien = @dieukien ,HanSuDung = @hsd  where MaGiamGia = @magiamgia
end
go

--Proc deleteMGG
go 
create proc deleteMGG(@magiamgia int) as
begin
	delete from MaGiamGia where MaGiamGia = @magiamgia
end
go


--Proc showUser
go
create proc showUser as
begin
	select MaKH, Ho, Ten, case  GioiTinh 
	when 0 then N'Nam'
	when 1 then N'Nữ'
	end
	as GioiTinh, NgaySinh, Sdt, DiaChiChinh, TinhThanh, QuanHuyen, Email, Password from KhachHang
end
go


--Proc addUser
go
create proc addUser(@ho nvarchar(50), @ten nvarchar(50),@gioitinh nvarchar(3), @ngaysinh smalldatetime, @sdt varchar(11), @diachichinh nvarchar(50), @tinhthanh nvarchar(50), @quanhuyen nvarchar(50), @email varchar(50), @password varchar(50)) as
begin
	insert into KhachHang(Ho, Ten, GioiTinh, NgaySinh, Sdt, DiaChiChinh, TinhThanh,QuanHuyen,Email, Password) values (@ho,@ten,@gioitinh,@ngaysinh,@sdt,@diachichinh,@tinhthanh,@quanhuyen,@email,@password)
end
go

--Proc saveUser
go 
create proc saveUser(@ho nvarchar(50), @ten nvarchar(50), @gioitinh nvarchar(3), @ngaysinh smalldatetime, @sdt varchar(11), @diachichinh nvarchar(50), @tinhthanh nvarchar(50), @quanhuyen nvarchar(50), @email varchar(50), @password varchar(50), @makh int) as
begin
	update KhachHang set Ho = @ho, Ten = @ten, GioiTinh = @gioitinh, NgaySinh = @ngaysinh, Sdt = @sdt, DiaChiChinh = @diachichinh, TinhThanh = @tinhthanh, QuanHuyen = @quanhuyen, Email = @email, Password = @password where MaKH = @makh
end
go


--Proc deleteUser
go
create proc deleteUser(@makh int) as
begin
	if exists (select MaKH from KhachHang where MaKH = @makh) 
		begin
			delete from ShopCart where MaKH = @makh
			update HoaDon set MaKH = null where MaKH = @makh
			delete from WishList where MaKH = @makh
			delete from KhachHang where MaKH = @makh
		end
	else
		BEGIN;
			declare @msg nvarchar(max) = FORMATMESSAGE(N'Không có mã khách hàng = %i',@makh);
			THROW 60000, @msg, 1; 
		END;
end
go


--Proc showSize
go
create proc showSize as
begin
	Select * from Size
end
go


--Proc updateSize
go
create proc updateSize(@giatri varchar(50), @masize int) as
begin
	update Size set GiaTri = @giatri where MaSize = @masize
end
go

---addSize
go
create proc addSize(@giatri varchar(50)) as
begin
	insert into Size(GiaTri) values (@giatri)
end
go

--usp_delete_masize
go
create proc usp_delete_masize(@masize int)
as
begin
	delete from ChiTietHoaDon where Masize = @masize
	delete from SanPham_Size  where Masize = @masize
	delete from size where Masize = @masize
end
go

--Proc showPTTT
go
create proc showPTTT as
begin
	select * from PhuongThucThanhToan
end
go


--Proc addPTTT
go 
create proc addPTTT(@ten nvarchar(50), @phi int) as
begin
	insert into PhuongThucThanhToan(Ten,Phi) values (@ten,@phi)
end
go


--Proc savePTTT
go
create proc savePTTT(@ten nvarchar(50), @phi int, @mapttt int) as
begin
	update PhuongThucThanhToan set Ten = @ten, Phi = @phi where MaPTTT = @mapttt
end
go

--Proc deletePTTT
go
create proc deletePTTT(@mapttt int) as
begin
	SET @mapttt = CAST(@mapttt AS NVARCHAR)
	if exists (select MaPTTT from PhuongThucThanhToan where MaPTTT = @mapttt)
		begin
			if exists (select MaPTTT from HoaDon where MaPTTT = @mapttt)
				begin
					update HoaDon set MaPTTT = null where MaPTTT = @mapttt
					delete from PhuongThucThanhToan where MaPTTT = @mapttt
				end
			else
				delete from PhuongThucThanhToan where MaPTTT = @mapttt
		end
	else
		begin
			print N'Mã PTTT không tồn tại'
		end
end
go


--Proc showPTVC
go
create proc showPTVC as
begin
	select * from PhuongThucVanChuyen
end
go


--Proc addPTVC
go 
create proc addPTVC(@ten nvarchar(50), @phi int) as
begin
	insert into PhuongThucVanChuyen(Ten,Phi) values (@ten,@phi)
end
go


--Proc savePTVC
go
create proc savePTVC(@ten nvarchar(50), @phi int, @maptvc int) as
begin
	update PhuongThucVanChuyen set Ten = @ten, Phi = @phi where MaPTVC = @maptvc
end
go


--Proc deletePTVC
go
create proc deletePTVC(@maptvc int) as
begin
	if exists (select MaPTVC from PhuongThucVanChuyen where MaPTVC = @maptvc)
		begin
			if exists (select MaPTVC from HoaDon where MaPTTT = @maptvc)
				begin
					update HoaDon set MaPTVC = null where MaPTVC = @maptvc
					delete from PhuongThucVanChuyen where MaPTVC = @maptvc
				end
			else
				delete from PhuongThucVanChuyen where MaPTVC = @maptvc
		end
	else
		begin
			print N'Mã PTVC không tồn tại'
		end
end
go


-- Proc thống kê tháng năm
go
create proc Thongketheonam (@nam int) as
begin
	select MONTH(Ngaymua) as 'Thang', count(MaHD) as 'Soluongdonhang' ,sum(GiaTri * TongTien) as 'Sotiengiamgia', sum(Phi) as 'Sotienvanchuyen',sum(TongTien) as 'Doanhthu' 
	from HoaDon left join MaGiamGia on HoaDon.MaGiamGia = MaGiamGia.MaGiamGia 
				left join PhuongThucVanChuyen on HoaDon.MaPTVC = PhuongThucVanChuyen.MaPTVC 
				where YEAR(Ngaymua) = @nam group by MONTH(Ngaymua)
	order by MONTH(Ngaymua), count(MaHD),sum(GiaTri * TongTien),sum(Phi),sum(TongTien) asc
end
go


-- Tổng cộng theo năm
go
create proc TongDoanhThuMoiNam (@nam int) as
begin
	select count(MaHD) as 'Soluongdonhang', sum(GiaTri * TongTien) as 'Sotiengiamgia', sum(Phi) as 'Sotienvanchuyen', sum(TongTien) as 'Doanhthu'
	from HoaDon left join MaGiamGia on HoaDon.MaGiamGia = MaGiamGia.MaGiamGia 
				left join PhuongThucVanChuyen on HoaDon.MaPTVC = PhuongThucVanChuyen.MaPTVC 
				where YEAR(Ngaymua) = @nam
	order by count(MaHD),sum(GiaTri * TongTien),sum(Phi),sum(TongTien)
end
go


-- Tính đến hiện tại
go
create proc Thongkehientai as
begin
	select count(MaHD) as 'Soluongdonhang', sum(GiaTri * TongTien) as 'Sotiengiamgia', sum(Phi) as 'Sotienvanchuyen', sum(TongTien) as 'Doanhthu'
	from HoaDon left join MaGiamGia on HoaDon.MaGiamGia = MaGiamGia.MaGiamGia 
				left join PhuongThucVanChuyen on HoaDon.MaPTVC = PhuongThucVanChuyen.MaPTVC 
	order by count(MaHD),sum(GiaTri * TongTien),sum(Phi),sum(TongTien)
end
go


-- select Năm để thống kê
go
create proc selectNam as
begin
	select distinct Year(Ngaymua) as 'Nam' from HoaDon where Ngaymua is not null
end
go
	
-- showSPSize
go 
create proc showSPSize(@masp varchar(7)) as
begin
	Select sps.MaSP, sps.MaSize,s.Giatri, sps.SoLuong from SanPham_Size sps join Size s on sps.MaSize = s.MaSize where MaSP like '%' + @masp + '%'
end

go

-- usp_update_sp_size
create proc usp_update_sp_size (@masp varchar(7), @masize int, @soluong smallint) as
BEGIN
	IF exists(select MaSP from SanPham_Size where MaSP = @masp and MaSize = @masize)
		BEGIN
			update SanPham_Size set SoLuong = @soluong where MaSP = @masp and MaSize = @masize 
		END
	ELSE
		BEGIN
			declare @msg nvarchar(max) = FORMATMESSAGE(N'Không có hàng nào trong bảng SANPHAMSIZE mà mã sản phẩm = %s và mã size = %i',@masp,@masize);
			THROW 60000, @msg, 1; 
		END
END

go


