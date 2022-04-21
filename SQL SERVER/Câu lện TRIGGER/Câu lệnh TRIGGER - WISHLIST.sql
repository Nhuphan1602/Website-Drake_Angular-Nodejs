Go
create trigger
forinsertWishList
on WishList 
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
	  print 'Added! All MaSP exist in Giay or PhuTrang.'
Go