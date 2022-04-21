--usp_select_hoadon_tongtien_gioitinh
go
create procedure usp_select_hoadon_tongtien_gioitinh as
	BEGIN
		select  kh.GioiTinh,sum(hd.TongTien) as 'TongTien', 
		dbo.uf_TiLeSoVoiTongTienHoaDon(sum(hd.TongTien)) as 'TiLe' 
		from HoaDon hd join KhachHang kh on hd.MaKH = kh.MaKH 
		group by kh.GioiTinh
	END
go

--usp_select_hoadon_tongtien_tuoi
go
create procedure usp_select_hoadon_tongtien_tuoi as
	BEGIN
		select  dbo.uf_Tuoi(kh.NgaySinh) as 'Tuoi',sum(hd.TongTien) as 'TongTien', 
		dbo.uf_TiLeSoVoiTongTienHoaDon(sum(hd.TongTien)) as 'TiLe' 
		from HoaDon hd join KhachHang kh on hd.MaKH = kh.MaKH 
		group by dbo.uf_Tuoi(kh.NgaySinh)
	END
go

--usp_select_hoadon_tongsoluong_gioitinh
go
create procedure usp_select_hoadon_tongsoluong_gioitinh as
	BEGIN
		select  kh.GioiTinh,count(hd.MaHD) as 'TongSoLuong',
		dbo.uf_TiLeSoVoiTongSoLuongHoaDon(count(hd.MaHD)) as 'TiLe' 
		from HoaDon hd join KhachHang kh on hd.MaKH = kh.MaKH 
		group by kh.GioiTinh
	END
go

--usp_select_hoadon_tongsoluong_tuoi
go
create procedure usp_select_hoadon_tongsoluong_tuoi as
	BEGIN
		select  dbo.uf_Tuoi(kh.NgaySinh) as 'Tuoi',count(hd.MaHD) as 'TongSoLuong',
		dbo.uf_TiLeSoVoiTongSoLuongHoaDon(count(hd.MaHD)) as 'TiLe' 
		from HoaDon hd join KhachHang kh on hd.MaKH = kh.MaKH 
		group by dbo.uf_Tuoi(kh.NgaySinh)
	END
go











