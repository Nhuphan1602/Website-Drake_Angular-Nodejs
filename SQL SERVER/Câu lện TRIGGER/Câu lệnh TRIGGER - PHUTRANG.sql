Go
create trigger
forinsertPhuTrang
on PhuTrang
for insert 
as
	declare @malpt int
	declare @masp varchar(7)
	SELECT @masp = MaSP FROM [inserted]
	SELECT @malpt = MaLPT FROM [inserted]
	IF exists(Select COUNT(MaSP) from uv_select_all_masp where MaSP = @masp having COUNT(MaSP) > 1)
		BEGIN
			rollback transaction 
			print 'MaSP is duplicated in PhuTrang'
	
		END
	ELSE
	  BEGIN
			IF @malpt = 1
				BEGIN
					insert into SanPham_Size (MaSP,MaSize,SoLuong)
					select @masp as MaSP,MaSize,0 as SoLuong from Size where MaSize between 86 and 88
				END
			ELSE 
				BEGIN
					insert into SanPham_Size (MaSP,MaSize,SoLuong)
					select @masp as MaSP,MaSize,0 as SoLuong from Size where MaSize = 89
				END
			print 'Added!MaSP MaSP is no duplicated in PhuTrang'		
	  END  
Go
