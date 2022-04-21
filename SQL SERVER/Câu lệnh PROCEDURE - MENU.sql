--usp_select_menu_categories
go
create procedure usp_select_menu_categories
as
BEGIN
	select nh.Ten as TenNH,dm.Ten as TenDM from DanhMuc dm join NhanHieu nh on dm.MaNH = nh.MaNH 
	Order by 
			CASE
				WHEN nh.Ten like '%converse%' then '1'
				WHEN nh.Ten like '%vans%' then '2'
				WHEN nh.Ten like '%palladium%' then '3'
				WHEN nh.Ten like '%k-swiss%' then '4'
				WHEN nh.Ten like '%supra%' then '5'
			END ASC, dm.MaDM asc
END
go

--usp_select_menu_accessories  
go
create procedure usp_select_menu_accessories 
as
BEGIN
	select nh.Ten as TenNH from DanhMuc dm join NhanHieu nh on dm.MaNH = nh.MaNH where dm.Ten = 'Accessories & Apparel'
	Order by 
		CASE
			WHEN nh.Ten like '%converse%' then '1'
			WHEN nh.Ten like '%vans%' then '2'
			WHEN nh.Ten like '%palladium%' then '3'
			WHEN nh.Ten like '%k-swiss%' then '4'
			WHEN nh.Ten like '%supra%' then '5'
		END ASC, dm.MaDM asc
END
go
