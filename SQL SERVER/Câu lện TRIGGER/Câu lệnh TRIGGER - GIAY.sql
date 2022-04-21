Go
create trigger
forinsertGiay
on Giay
for insert 
as
	declare @manh int
	declare @masp varchar(7)
	SELECT @masp = MaSP FROM [inserted]
	SELECT @manh = DanhMuc.MaNH FROM [inserted] join DanhMuc on inserted.MaDM = DanhMuc.MaDM
	IF exists(Select COUNT(MaSP) from uv_select_all_masp where MaSP = @masp having COUNT(MaSP) > 1)
		BEGIN
			rollback transaction 
			print 'MaSP is duplicated in Giay'
	
		END
	ELSE
	  BEGIN
			IF @manh = 1
				BEGIN
					insert into SanPham_Size (MaSP,MaSize,SoLuong)
					select @masp as MaSP,MaSize,0 as SoLuong from Size where MaSize between 52 and 70
				END
			ELSE IF @manh = 2
				BEGIN
					insert into SanPham_Size (MaSP,MaSize,SoLuong)
					select @masp as MaSP,MaSize,0 as SoLuong from Size where MaSize between 71 and 85
				END
			ELSE IF @manh = 3
				BEGIN
					insert into SanPham_Size (MaSP,MaSize,SoLuong)
					select @masp as MaSP,MaSize,0 as SoLuong from Size where MaSize between 1 and 18
				END
			ELSE IF @manh = 4
				BEGIN
					insert into SanPham_Size (MaSP,MaSize,SoLuong)
					select @masp as MaSP,MaSize,0 as SoLuong from Size where MaSize between 36 and 51
				END
			ELSE IF @manh = 5
				BEGIN
					insert into SanPham_Size (MaSP,MaSize,SoLuong)
					select @masp as MaSP,MaSize,0 as SoLuong from Size where MaSize between 19 and 35
				END
			print 'Added!MaSP MaSP is no duplicated in Giay'		
	  END  
Go

