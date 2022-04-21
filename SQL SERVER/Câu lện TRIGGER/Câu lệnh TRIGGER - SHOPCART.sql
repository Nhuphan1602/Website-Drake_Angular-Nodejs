Go
create trigger
forinsertShopCart
on ShopCart
for insert 
as
	declare @rowcount smallint
	declare @kq1 smallint
	declare @kq2 smallint
	SELECT  @rowcount = COUNT(*) FROM [inserted] 
	select @kq1 = count(*) FROM Giay, inserted where Giay.MaSP = inserted.MaSP
	select @kq2 = count(*) FROM PhuTrang, inserted where PhuTrang.MaSP = inserted.MaSP
	if (@kq1 + @kq2 != @rowcount)
	/* Cancel the insert and
	print a message.*/
	  begin
		rollback transaction 
		print 'No, MaSP does not exist in Giay or PhuTrang.'
	  end  
	/*
	Otherwise, allow it. */
	else
		declare @masp varchar(7)
		declare @masize int
		declare @soluong smallint
		select @masp = MaSP from [inserted]
		select @masize = MaSize from [inserted] 
		select @soluong = SoLuong from [inserted] 
		UPDATE SanPham_Size set SoLuong = SanPham_Size.SoLuong - @soluong
		where MaSP = @masp and MaSize = @masize
		print 'Added! All MaSP exist in Giay or PhuTrang.'
Go


Go
create trigger
fordeleteShopCart
on ShopCart
for delete 
as
	BEGIN
		declare @masp varchar(7)
		declare @masize int
		declare @soluong smallint
		select @masp = MaSP from [deleted]
		select @masize = MaSize from [deleted] 
		select @soluong = SoLuong from [deleted] 
		UPDATE SanPham_Size set SoLuong = SanPham_Size.SoLuong + @soluong
		where MaSP = @masp and MaSize = @masize
	END
Go