Go
create trigger
forinsertSanPhamLienQuan 
on SanPhamLienQuan 
for insert 
as
	declare @rowcount smallint
	declare @kq1 smallint
	declare @kq2 smallint
	declare @kq3 smallint
	declare @kq4 smallint
	SELECT  @rowcount = COUNT(*) FROM [inserted] 
	select @kq1 = count(*) FROM Giay, inserted where Giay.MaSP = inserted.MaSP1
	select @kq2 = count(*) FROM PhuTrang, inserted where PhuTrang.MaSP = inserted.MaSP1
	select @kq3 = count(*) FROM Giay, inserted where Giay.MaSP = inserted.MaSP2
	select @kq4 = count(*) FROM PhuTrang, inserted where PhuTrang.MaSP = inserted.MaSP2
	if (@kq1 + @kq2 + @kq3 + @kq4 != @rowcount * 2)
	/* Cancel the insert and
	print a message.*/
	  begin
		rollback transaction 
		print 'No, MaSP does not exist in Giay or PhuTrang.'
	  end  
	/*
	Otherwise, allow it. */
	else
	  print 'Added! All MaSP exist in Giay or PhuTrang.'
Go