Go
create trigger
forinsertHoaDon
on HoaDon
for insert 
as
	BEGIN
		declare @makh int
		declare @magiamgia int
		select @makh = MaKH from [inserted]
		select @magiamgia = MaGiamGia from [inserted] 
		UPDATE KhachHang_MaGiamGia set SoLanSuDung = KhachHang_MaGiamGia.SoLanSuDung - 1
		where MaKH = @makh and MaGiamGia = @magiamgia
	END
Go

