--uf_TongSoLuongCuaSanPham
go
create function uf_TongSoLuongCuaSanPham(@masp varchar(7)) 
returns smallint
as
	BEGIN
		declare @count smallint
		select @count = sum(SoLuong) from SanPham_Size where MaSP = @masp
		return IIF(@count is null, 0, @count)
	END
go

--uf_select_products_nh_dmG
go
create function uf_select_products_nh_dmG(@tennh nvarchar(100),@tendm nvarchar(100),@min int,@max int)
returns table as 
return  
	select * from 
		(select ROW_NUMBER() OVER(ORDER BY g.MaSP ASC) AS row#,
		g.MaSP,g.Ten,g.DongSanPham,case when dbo.uf_TongSoLuongCuaSanPham(g.MaSP) > 0 then N'Còn hàng' else N'Hết hàng' end as TinhTrang,
		g.Gia,g.Km,g.TrangThai,g.c1_h1 from Giay g
		where exists (select MaDM from DanhMuc dm where dm.Ten = @tendm and dm.MaDM = g.MaDM
		and exists(select MaNH from NhanHieu nh where nh.Ten = @tennh and  nh.MaNH = dm.MaNH))
		)	
	as subquery where subquery.row# between @min and @max
go

--uf_select_products_nh_dmPT
go
create function uf_select_products_nh_dmPT(@tennh nvarchar(100),@tendm nvarchar(100),@min int,@max int)
returns table as 
return  
	select * from 
		(select ROW_NUMBER() OVER(ORDER BY pt.MaSP ASC) AS row#,
		lpt.Ten as Lpt,pt.MaSP,pt.Ten,pt.DongSanPham,case when dbo.uf_TongSoLuongCuaSanPham(pt.MaSP) > 0 then N'Còn hàng' else N'Hết hàng' end as TinhTrang,
		pt.Gia,pt.Km,pt.TrangThai,pt.c1_h1 from PhuTrang pt
		join LoaiPT lpt on pt.MaLPT = lpt.MaLPT
		where exists (select MaDM from DanhMuc dm where dm.Ten = @tendm and dm.MaDM = pt.MaDM
		and exists(select MaNH from NhanHieu nh where nh.Ten = @tennh and  nh.MaNH = dm.MaNH))
		)	
	as subquery where subquery.row# between @min and @max
go

--uf_select_products_nh_all
go
create function uf_select_products_nh_all(@tennh nvarchar(100),@min int,@max int)
returns table as
return 
	select * from
		(select ROW_NUMBER() OVER(ORDER BY subquery1.MaSP ASC) AS row#,* from 
			(select g.MaSP,g.Ten,g.DongSanPham,case when dbo.uf_TongSoLuongCuaSanPham(g.MaSP) > 0 then N'Còn hàng' else N'Hết hàng' end as TinhTrang,
			g.Gia,g.Km,g.TrangThai,g.c1_h1 from Giay g
			where exists (select MaDM from DanhMuc dm where dm.MaDM = g.MaDM
					and exists (select MaNH from NhanHieu nh where nh.Ten = @tennh and nh.MaNH = dm.MaNH))
			union all
			select pt.MaSP,pt.Ten,pt.DongSanPham,case when dbo.uf_TongSoLuongCuaSanPham(pt.MaSP) > 0 then N'Còn hàng' else N'Hết hàng' end as TinhTrang,
			pt.Gia,pt.Km,pt.TrangThai,pt.c1_h1 from PhuTrang pt
			where exists (select MaDM from DanhMuc dm where dm.MaDM = pt.MaDM
					and exists (select MaNH from NhanHieu nh where nh.Ten = @tennh and nh.MaNH = dm.MaNH))
			)
		as subquery1) 
	as subquery2 where subquery2.row# between @min and @max
go

--uf_select_products_all_all
go
create function uf_select_products_all_all(@min int, @max int)
returns table as
return
	select * from
		(select ROW_NUMBER() OVER(ORDER BY subquery1.TrangThai ASC,
		case
			WHEN subquery1.Ten like '%converse%' then '1'
			WHEN subquery1.Ten like '%vans%' then '2'
			WHEN subquery1.Ten like '%palladium%' then '3'
			WHEN subquery1.Ten like '%k-swiss%' then '4'
			WHEN subquery1.Ten like '%supra%' then '5'
		END	ASC) AS row#,* from
			(select nh.Ten as TenNH,g.MaSP,g.Ten,g.DongSanPham,case when dbo.uf_TongSoLuongCuaSanPham(g.MaSP) > 0 then N'Còn hàng' else N'Hết hàng' end as TinhTrang,
			g.Gia,g.Km,g.TrangThai,g.c1_h1 from Giay g
			join DanhMuc dm on g.MaDM = dm.MaDM join NhanHieu nh on dm.MaNH = nh.MaNH
			union all
			select nh.Ten as TenNH,pt.MaSP,pt.Ten,pt.DongSanPham,case when dbo.uf_TongSoLuongCuaSanPham(pt.MaSP) > 0 then N'Còn hàng' else N'Hết hàng' end as TinhTrang,
			pt.Gia,pt.Km,pt.TrangThai,pt.c1_h1 from PhuTrang pt
			join DanhMuc dm on pt.MaDM = dm.MaDM join NhanHieu nh on dm.MaNH = nh.MaNH) 
		as subquery1) 
	as subquery2 where subquery2.row# between @min and @max
go

--uf_post_productBy_all_km
go
create function uf_post_productBy_all_km(@min int, @max int)
returns table as
return
	select * from
		(select ROW_NUMBER() OVER(ORDER BY 
		CASE
			WHEN subquery1.Ten like '%converse%' THEN '1'
			WHEN subquery1.Ten like '%vans%' THEN '2'
			WHEN subquery1.Ten like '%palladium%' THEN '3'
			WHEN subquery1.Ten like '%k-swiss%' THEN '4'
			WHEN subquery1.Ten like '%supra%' THEN '5'
		END ASC) AS row#,* from
			(select nh.Ten as TenNH,g.MaSP,g.Ten,g.DongSanPham,case when dbo.uf_TongSoLuongCuaSanPham(g.MaSP) > 0 then N'Còn hàng' else N'Hết hàng' end as TinhTrang,
			g.Gia,g.Km,g.TrangThai,g.c1_h1 from Giay g
			join DanhMuc dm on g.MaDM = dm.MaDM join NhanHieu nh on dm.MaNH = nh.MaNH
			where g.Km > 0
			union all
			select nh.Ten as TenNH,pt.MaSP,pt.Ten,pt.DongSanPham,case when dbo.uf_TongSoLuongCuaSanPham(pt.MaSP) > 0 then N'Còn hàng' else N'Hết hàng' end as TinhTrang,
			pt.Gia,pt.Km,pt.TrangThai,pt.c1_h1 from PhuTrang pt
			join DanhMuc dm on pt.MaDM = dm.MaDM join NhanHieu nh on dm.MaNH = nh.MaNH
			where pt.Km > 0) 
		as subquery1) 
	as subquery2 where subquery2.row# between @min and @max
go

---uf_post_productBy_all_pt
go
create function uf_post_productBy_all_pt(@min int,@max int)
returns table as
return
	select * from
		(select ROW_NUMBER() OVER(Order by 
		CASE
			WHEN pt.Ten like '%converse%' THEN '1'
			WHEN pt.Ten like '%vans%' THEN '2'
			WHEN pt.Ten like '%palladium%' THEN '3'
			WHEN pt.Ten like '%k-swiss%' THEN '4'
			WHEN pt.Ten like '%supra%' THEN '5'
		END ASC) AS row# ,lpt.Ten as Lpt,pt.MaSP,pt.Ten,pt.DongSanPham,case when dbo.uf_TongSoLuongCuaSanPham(pt.MaSP) > 0 then N'Còn hàng' else N'Hết hàng' end as TinhTrang,
		pt.Gia,pt.Km,pt.TrangThai,pt.c1_h1 from PhuTrang pt 
		join LoaiPT lpt on pt.MaLPT = lpt.MaLPT) 
	as subquery1 where subquery1.row# between @min and @max
go

---uf_select_related_products_masp
go
create function uf_select_related_products_masp(@masp varchar(7))
returns table as
return
	select MaSP1 from SanPhamLienQuan where MaSP2 = @masp
	union all
	select MaSP2 from SanPhamLienQuan where MaSP1 = @masp
go






--uf_TiLeSoVoiTongTienHoaDon
go
create function uf_TiLeSoVoiTongTienHoaDon (@tongtien int) 
returns numeric(4,2)
as
	BEGIN
		declare @tile numeric(4,2)
		select @tile = (@tongtien*1.0/sum(TongTien)) from HoaDon
		return IIF(@tile is null, 0 , @tile)
	END
go

--uf_TiLeSoVoiTongSoLuongHoaDon
go
create function uf_TiLeSoVoiTongSoLuongHoaDon(@soluong smallint)
returns numeric(4,2)
as
	BEGIN
		declare @tile numeric(4,2)
		set @tile = @soluong*1.0 / (Select Count(MaHD) From HoaDon)
		return IIF(@tile is null, 0 , @tile)
	END
go

--uf_Tuoi
go
create function uf_Tuoi(@ngaysinh smalldatetime) 
returns smallint
as
	BEGIN
		declare @tuoi smallint
		set @tuoi = DATEDIFF(year,@ngaysinh,GETDATE())
		return @tuoi
	END
go

