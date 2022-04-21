--usp_select_khmgg
go
create procedure usp_select_khmgg (@makh int) as
BEGIN
	select CAST(mgg.MaGiamGia as varchar) as Id,mgg.Ten,mgg.GiaTri,mgg.DieuKien,mgg.HanSuDung,kh_mgg.SoLanSuDung 
	from KhachHang_MaGiamGia kh_mgg 
	join MaGiamGia mgg on kh_mgg.MaGiamGia = mgg.MaGiamGia 
	where kh_mgg.MaKH = @makh
END
go


