--usp_select_hoadon
go
create procedure usp_select_hoadon (@makh int) as
	BEGIN
		select hd.MaHD,mgg.Ten as MaGiamGia,
		pttt.Ten as PhuongThucThanhToan,ptvc.Ten as PhuongThucVanChuyen,
		hd.TrangThai,hd.Ngaymua,hd.Ngaynhanhang,hd.TongTien
		from HoaDon hd 
		left join MaGiamGia mgg on hd.MaGiamGia = mgg.MaGiamGia 
		left join PhuongThucVanChuyen ptvc on hd.MaPTVC = ptvc.MaPTVC 
		left join PhuongThucThanhToan pttt on hd.MaPTTT = pttt.MaPTTT 
		where hd.MaKH = @makh
	END
go
