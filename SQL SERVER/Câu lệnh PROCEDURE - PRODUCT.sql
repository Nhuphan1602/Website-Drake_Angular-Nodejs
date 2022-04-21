--usp_select_products
go
-- * Accessories&Apparel 1 100
-- * * 1 100
-- * km 1 100
--Converse * 1 100
--Converse Classic 1 100
--Converse accessorie&apparel 1 100
create procedure usp_select_products(@tennh nvarchar(100),@tendm nvarchar(100),@min int = 1,@max int = 2) as
BEGIN
	IF @tennh = '*' and @tendm = '*'
		BEGIN
			select * from dbo.uf_select_products_all_all(@min,@max)
		END
	ELSE IF @tennh = '*' and @tendm = 'km'
		BEGIN
			select * from dbo.uf_post_productBy_all_km(@min,@max)
		END
	ELSE IF @tennh = '*' and @tendm = 'Accessories & Apparel'
		BEGIN
			select * from dbo.uf_post_productBy_all_pt(@min,@max)
		END
	ELSE
		BEGIN
			IF not exists(select nh.MaNH from NhanHieu nh 
				where nh.Ten = @tennh)
				OR @min <= 0
				OR @max <= 0
				print(N'Truyền đối số không hợp lệ')
			ELSE IF  @tendm = '*'
				BEGIN
					select * from dbo.uf_select_products_nh_all(@tennh,@min,@max)
				END
			ELSE IF	exists(select MaDM from DanhMuc dm where 
					Ten = @tendm
					and exists (select MaNH from NhanHieu nh where Ten = @tennh and nh.MaNH = dm.MaNH))
				BEGIN
					IF @tendm = 'Accessories & Apparel'
						BEGIN
							select * from dbo.uf_select_products_nh_dmPT(@tennh,@tendm,@min,@max)
						END
					ELSE
						BEGIN
							select * from dbo.uf_select_products_nh_dmG(@tennh,@tendm,@min,@max)
						END
				END
			ELSE
				print(N'Truyền đối số không hợp lệ')
		END
END
go


--usp_select_chitietsanpham
go
create procedure usp_select_chitietsanpham
@masp varchar(7)
as
BEGIN
	IF exists(select MaSP from Giay where MaSP = @masp)
		BEGIN
			select	nh.Ten as TenNH,g.MaSP,g.Ten,case when dbo.uf_TongSoLuongCuaSanPham(g.MaSP) > 0 then N'Còn hàng' else N'Hết hàng' end as TinhTrang,
					Gia,Km,
					c1_h1,c1_h2,c1_h3,c1_h4,c1_h5,
					c2_h1,c2_h2,c2_h3,c2_h4,c2_h5,
					GioiThieu,DongSanPham,BoSuuTap,NoiSanXuat,CheDoBaoHanh,CuaHangPhanPhoi,PhuKienTheoKem,CheDoVanChuyen,
					ChiTietVanChuyen,GioiTinh,MauSac,PhanThan,LopLot,DeGiay,TinhNangSanPham 
					from Giay g
					join DanhMuc dm on g.MaDM = dm.MaDM join NhanHieu nh on dm.MaNH = nh.MaNH
					where MaSP = @masp
		END
	ELSE IF exists(select MaSP from PhuTrang where MaSP = @masp)
		BEGIN
			select	nh.Ten as TenNH,pt.MaSP,pt.Ten,case when dbo.uf_TongSoLuongCuaSanPham(pt.MaSP) > 0 then N'Còn hàng' else N'Hết hàng' end as TinhTrang,
					Gia,Km,
					c1_h1,c1_h2,c1_h3,c1_h4,c1_h5,
					c2_h1,c2_h2,c2_h3,c2_h4,c2_h5,
					GioiThieu,DongSanPham,BoSuuTap,NoiSanXuat,CheDoBaoHanh,CuaHangPhanPhoi,PhuKienTheoKem,CheDoVanChuyen,
					ChiTietVanChuyen,KichThuocSanPham,GioiTinh,MauSac,TinhNangSanPham 
					from PhuTrang pt 
					join DanhMuc dm on pt.MaDM = dm.MaDM join NhanHieu nh on dm.MaNH = nh.MaNH
					where MaSP = @masp
		END
	ELSE
		BEGIN
			Print N'Mã sản phẩm '+@masp+N' không tồn tại.'
		END
END
go


--usp_search_products
create procedure usp_search_products(@timkiem nvarchar(100), @min int = 1,@max int = 2) as
BEGIN
	set @timkiem = TRIM(Lower(@timkiem))
	IF @timkiem = '' or @timkiem = 'all' or @timkiem = N'tất cả'
		BEGIN
			select * from dbo.uf_select_products_all_all(@min,@max)
		END
	ELSE IF	exists(select MaSP from Giay where Ten like '%'+@timkiem+'%') or exists(select MaSP from PhuTrang where Ten like '%'+@timkiem+'%')
		BEGIN
			select * from dbo.uf_select_products_all_all(@min,@max) where Ten like '%'+@timkiem+'%'
		END
	ELSE 		
		BEGIN
	
			declare @tennh nvarchar(100) 
			declare @tendm nvarchar(100)
			set @tennh = substring(@timkiem, 0,charindex(' ',@timkiem))
			set @tendm = substring(@timkiem, charindex(' ',@timkiem)+1,len(@timkiem))
			IF @tendm = 'accessories & apparel'
				BEGIN
					select * from dbo.uf_select_products_nh_dmPT(@tennh,@tendm,@min,@max)
				END
			ELSE
				BEGIN
					select * from dbo.uf_select_products_nh_dmG(@tennh,@tendm,@min,@max)
				END
		END
END
go


--usp_select_product_size
go
create proc usp_select_product_size (@masp varchar(7)) as
	BEGIN
		select CAST(spz.MaSize as varchar) as MaSize ,s.GiaTri as GiaTriSize,spz.SoLuong from SanPham_Size spz join Size s on spz.MaSize = s.MaSize where spz.MaSP = @masp and spz.SoLuong > 0
	END
go


--usp_select_related_products
go
create proc usp_select_related_products (@masp varchar(7),@min int, @max int) as
	BEGIN
		select * from
			(select ROW_NUMBER() OVER(ORDER BY subquery1.TrangThai ASC,
			case
				WHEN subquery1.Ten like '%converse%' then '1'
				WHEN subquery1.Ten like '%vans%' then '2'
				WHEN subquery1.Ten like '%palladium%' then '3'
				WHEN subquery1.Ten like '%k-swiss%' then '4'
				WHEN subquery1.Ten like '%supra%' then '5'
			END	ASC) AS row#,* from
				(select g.MaSP,g.Ten,g.DongSanPham,case when dbo.uf_TongSoLuongCuaSanPham(g.MaSP) > 0 then N'Còn hàng' else N'Hết hàng' end as TinhTrang,
				g.Gia,g.Km,g.TrangThai,g.c1_h1 from Giay g
				where g.MaSP in (select * from dbo.uf_select_related_products_masp(@masp))
				union all
				select pt.MaSP,pt.Ten,pt.DongSanPham,case when dbo.uf_TongSoLuongCuaSanPham(pt.MaSP) > 0 then N'Còn hàng' else N'Hết hàng' end as TinhTrang,
				pt.Gia,pt.Km,pt.TrangThai,pt.c1_h1 from PhuTrang pt
				where pt.MaSP in (select * from dbo.uf_select_related_products_masp(@masp))
				) 
			as subquery1)
		as subquery2 where subquery2.row# between @min and @max
	END
go

