--usp_login_khachhang
go
create procedure usp_login_khachhang(@email varchar(50), @password varchar(50)) as
BEGIN
	IF exists(select kh.MaKH from KhachHang kh where kh.Email = @email and kh.Password = @password)
		BEGIN
			select CAST(kh.MaKH as varchar) as MaKH,kh.Ho,kh.Ten,cast(Kh.GioiTinh as varchar) as GioiTinh,kh.NgaySinh,kh.Email,kh.Sdt,kh.DiaChiChinh,kh.TinhThanh,kh.QuanHuyen
			from KhachHang kh 
			where kh.Email = @email and kh.Password = @password
		END
	ELSE
		BEGIN;
			THROW 60000, N'Sai tài khoản và mật khẩu', 1; 
		END;
END
go

--usp_update_khachhang
go
create procedure usp_update_khachhang
(@makh int,
@ho nvarchar(50),
@ten nvarchar(50), 
@gioitinh bit,
@ngaysinh varchar(10),
@sdt varchar(11),
@diachichinh nvarchar(50), 
@tinhthanh nvarchar(50), 
@quanhuyen nvarchar(50),
@email varchar(50)) as
BEGIN
	IF exists(select MaKH from KhachHang where MaKH = @makh)
		BEGIN
			update KhachHang set Ho=@ho,
			Ten=@ten,
			GioiTinh=@gioitinh,
			NgaySinh=@ngaysinh,
			Sdt=@sdt,
			DiaChiChinh=@diachichinh,
			TinhThanh=@tinhthanh,
			QuanHuyen=@quanhuyen,
			Email=@email
			where MaKH = @makh
		END
	ELSE
		BEGIN
			declare @msg nvarchar(max) = FORMATMESSAGE(N'Mã khách hàng %i không tồn tại',@makh);
			THROW 60000, @msg, 1; 
		END
END
go




--usp_update_password_khachhang
go
create procedure usp_update_password_khachhang
(@makh int,
@newpassword varchar(50),
@oldpassword varchar(50)) as
BEGIN
	IF exists(select kh.MaKH from KhachHang kh where kh.MaKH = @makh and kh.Password = @oldpassword)
		BEGIN
			update KhachHang set Password = @newpassword
			where MaKH = @makh and Password = @oldpassword
		END
	ELSE
		BEGIN
			declare @msg nvarchar(max) = FORMATMESSAGE(N'Mã khách hàng %i, Mật khẩu %s không tồn tại',@makh,@oldpassword);
			THROW 60000, @msg, 1; 
		END
END
go







--usp_insert_khachhang
go
create procedure usp_insert_khachhang
(@ho nvarchar(50),
@ten nvarchar(50), 
@gioitinh bit,
@ngaysinh varchar(10),
@sdt varchar(11),
@diachichinh nvarchar(50), 
@tinhthanh nvarchar(50), 
@quanhuyen nvarchar(50),
@email varchar(50), 
@password varchar(50)) as
BEGIN
	insert into KhachHang values (@ho, @ten, @gioitinh, @ngaysinh, @sdt, @diachichinh, @tinhthanh, @quanhuyen , @email, @password)
END
go



--usp_thanhtoan_hdct
go
create procedure usp_thanhtoan_hdct
(@mahd int,@makh int,@masp varchar(7),@masize int, @soluong smallint, @giaban int)
as
BEGIN
	BEGIN TRY	
		insert into ChiTietHoaDon (MaHD,MaSP,MaSize,SoLuong,GiaBan) values (@mahd,@masp,@masize,@soluong,@giaban)

		DELETE sc FROM ShopCart sc
		where sc.MaKH = @makh
		and sc.MaSP = @masp
		and sc.MaSize = @masize
	END TRY
	BEGIN CATCH
		DELETE from ChiTietHoaDon where MaHD = @mahd;
		DELETE from HoaDon where MaHD = @mahd;
		print(FORMATMESSAGE(N'Thêm chi tiết hóa đơn lỗi. MaSP: %s, MaSize: %i, SoLuong: %i, GiaBan: %i',@masp,@masize,@soluong,@giaban));
		THROW;
	END CATCH
END
go

--usp_thanhtoan_hoadon
go
create procedure usp_thanhtoan_hoadon
(@makh int,
--mahd tự tăng
@magiamgia int, 
@mapttt int, 
@maptvc int, 
@trangthai nvarchar(50), 
@ghichu nvarchar(MAX), 
@ngaymua varchar(20),
@ngaynhanhang varchar(20), 
@tongtien int)
as
BEGIN
	BEGIN
		BEGIN TRY
			insert HoaDon values (@makh,IIF(@magiamgia < 1,NULL,@magiamgia),@mapttt,@maptvc,@trangthai,@ghichu,@ngaymua,IIF(@ngaynhanhang = '',NULL,@ngaynhanhang),@tongtien)

			declare @mahd int
			SELECT @mahd = SCOPE_IDENTITY()
			return @mahd
		END TRY
		BEGIN CATCH
			print(N'Thêm hóa đơn lỗi!');
			THROW;  
		END CATCH
	END
END
go
