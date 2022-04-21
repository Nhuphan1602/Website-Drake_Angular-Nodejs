--usp_select_shopcart
go
create procedure usp_select_shopcart (@makh int) as
	BEGIN
		select g.MaSP,g.Ten,g.c1_h1 as Hinh,g.Gia,g.Km,g.DongSanPham,
		CAST(s.MaSize as varchar) as MaSize,s.GiaTri as GiaTriSize,sc.SoLuong,CAST(0 as bit) isChecked 
		from ShopCart sc
		join Giay g on g.MaSP = sc.MaSP
		join Size s on s.MaSize = sc.MaSize
		where sc.MaKH = @makh
		union 
		select pt.MaSP,pt.Ten,pt.c1_h1 as Hinh,pt.Gia,pt.Km,pt.DongSanPham,
		CAST(s.MaSize as varchar) as MaSize,s.GiaTri as GiaTriSize,sc.SoLuong,CAST(0 as bit) isChecked 
		from ShopCart sc
		join PhuTrang pt on pt.MaSP = sc.MaSP
		join Size s on s.MaSize = sc.MaSize
		where sc.MaKH = @makh
	END
go

--usp_insert_shopcart
go
create procedure usp_insert_shopcart(@makh int, @masp varchar(7),@masize int,@soluong smallint) as
	BEGIN
		insert into Shopcart values (@makh, @masp,@masize,@soluong)
	END
go

--usp_delete_shopcart
go
create procedure usp_delete_shopcart (@makh int,@masp varchar(7) ,@masize int) as
	BEGIN
		IF exists (select MaKH,MaSP,MaSize from Shopcart where MaKH = @makh and MaSP = @masp and MaSize = @masize)
			BEGIN
				delete from Shopcart where MaKH = @makh and MaSP = @masp and MaSize = @masize
			END
		ELSE
			BEGIN
				declare @msg nvarchar(max) = FORMATMESSAGE(N'Không có hàng nào trong bảng SHOPCART mà mã khách hàng = %i và mã sản phẩm = %s và mã size = %i',@makh,@masp,@masize);
				THROW 60000, @msg, 1; 
			END
	END
go

--usp_update_shopcart
go
create procedure usp_update_shopcart (@makh int,@masp varchar(7) ,@masize int,@soluong smallint) as
	BEGIN
		IF exists (select MaKH,MaSP,MaSize from Shopcart where MaKH = @makh and MaSP = @masp and MaSize = @masize)
			BEGIN
				update Shopcart set SoLuong = @soluong where MaKH = @makh and MaSP = @masp and MaSize = @masize
			END
		ELSE
			BEGIN
				declare @msg nvarchar(max) = FORMATMESSAGE(N'Không có hàng nào trong bảng SHOPCART mà mã khách hàng = %i và mã sản phẩm = %s và mã size = %i',@makh,@masp,@masize);
				THROW 60000, @msg, 1;
			END	
	END
go

