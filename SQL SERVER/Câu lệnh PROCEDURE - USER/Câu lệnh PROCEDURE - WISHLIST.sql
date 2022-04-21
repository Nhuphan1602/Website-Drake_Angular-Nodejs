--usp_select_wishlist
go
create procedure usp_select_wishlist (@makh int) as
BEGIN
	select g.MaSP,g.c1_h1 as Hinh,g.Ten,g.DongSanPham,
	case when dbo.uf_TongSoLuongCuaSanPham(g.MaSP) > 0 then N'Còn hàng' else N'Hết hàng' end as TinhTrang,
	g.Gia, g.Km
	from WishList wl join Giay g on wl.MaSP = g.MaSP
	where wl.MaKH = @makh
	union
	select pt.MaSP,pt.c1_h1 as Hinh,pt.Ten,pt.DongSanPham,
	case when dbo.uf_TongSoLuongCuaSanPham(pt.MaSP) > 0 then N'Còn hàng' else N'Hết hàng' end as TinhTrang,
	pt.Gia, pt.Km
	from WishList wl join PhuTrang pt on wl.MaSP = pt.MaSP 
	where wl.MaKH = @makh
END
go

--usp_insert_wishlist
go
create procedure usp_insert_wishlist(@makh int, @masp varchar(7)) as
	BEGIN
		insert into WishList values (@makh, @masp)
	END
go

--usp_delete_wishlist
go
create procedure usp_delete_wishlist(@makh int, @masp varchar(7)) as
	BEGIN
		IF exists(select MaKH,MaSP from WishList where MaKH = @makh and MaSP = @masp)
			BEGIN
				delete from WishList where MaKH = @makh and MaSP = @masp
			END
		ELSE
			BEGIN;
				declare @msg nvarchar(max) = FORMATMESSAGE(N'Không có hàng nào trong bảng WISHLIST mà mã khách hàng = %i và mã sản phẩm = %s',@makh,@masp);
				THROW 60000, @msg, 1; 
			END;
	END
go


