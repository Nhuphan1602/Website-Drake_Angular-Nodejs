import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.module';
import { User } from 'src/app/Interfaces/interfaces';

@Component({
  selector: 'app-quanlykhachhang',
  templateUrl: './Quanlykhachhang.component.html',
  styleUrls: ['./Quanlykhachhang.component.scss']
})
export class QuanLyKhachHangComponent implements OnInit {
  public items = [
    { name: 'Nam', val : '0' },
    { name: 'Nữ', val : '1' },
  ];

  public districts: string[] = [];
  public cities = [
    {
      city: 'Chọn thành phố',
      district: ['Quận / Huyện']
    },
    {
      city: 'An Giang',
      district: ["Thành phố Long Xuyên", "Thành phố Châu Đốc", "Thị xã Tân Châu", "Huyện An Phú", "Huyện Châu Phú", "Huyện Châu Thành", "Huyện Chợ Mới", "Huyện Phú Tân", "Huyện Thoại Sơn", "Huyện Tịnh Biên", "Huyện Tri Tôn"]
    },
    {
      city: 'Bà Rịa - Vũng Tàu',
      district: ["Thành phố Vũng Tàu", "Thị xã Bà Rịa", "Thị xã Phú Mỹ", "Huyện Châu Đức", "Huyện Côn Đảo", "Huyện Đất Đỏ", "Huyện Long Điền", "Huyện Tân Thành", "Huyện Xuyên Mộc"]
    },
    {
      city: 'Bạc Liêu',
      district: ["Thành phố Bạc Liêu", "Huyện Đông Hải", "Huyện Giá Rai", "Huyện Hòa Bình", "Huyện Hồng Dân", "Huyện Phước Long", "Huyện Vĩnh Lợi"]
    },
    {
      city: 'Bắc Kạn',
      district: ["Thị xã Bắc Kạn", "Huyện Ba Bể", "Huyện Bạch Thông", "Huyện Chợ Đồn", "Huyện Chợ Mới", "Huyện Na Rì", "Huyện Ngân Sơn", "Huyện Pác Nặm"]
    },
    {
      city: 'Bắc Giang',
      district: ["Thành phố Bắc Giang", "Huyện Hiệp Hòa", "Huyện Lạng Giang", "Huyện Lục Nam", "Huyện Lục Ngạn", "Huyện Sơn Động", "Huyện Tân Yên", "Huyện Việt Yên", "Huyện Yên Dũng", "Huyện Yên Thế"]
    },
    {
      city: 'Bắc Ninh',
      district: ["Thành phố Bắc Ninh", "Thị xã Từ Sơn", "Huyện Gia Bình", "Huyện Lương Tài", "Huyện Quế Võ", "Huyện Thuận Thành", "Huyện Tiên Du", "Huyện Yên Phong"]
    },
    {
      city: 'Bến Tre',
      district: ["Thành phố Bến Tre", "Huyện Ba Tri", "Huyện Bình Đại", "Huyện Châu Thành", "Huyện Chợ Lách", "Huyện Giồng Trôm", "Huyện Mỏ Cày Bắc", "Huyện Mỏ Cày Nam", "Huyện Thạnh Phú"]
    },
    {
      city: 'Bình Dương',
      district: ["Thành phố Thủ Dầu Một", "Thị xã Bến Cát", "Thị xã Tân Uyên", "Huyện Bắc Tân Uyên", "Huyện Dầu Tiếng", "Huyện Dĩ An", "Huyện Phú Giáo", "Huyện Tân Uyên", "Huyện Thuận An"]
    },
    {
      city: 'Bình Định',
      district: ["Thành phố Quy Nhơn", "Huyện An Lão", "Huyện An Nhơn", "Huyện Hoài Ân", "Huyện Hoài Nhơn", "Huyện Phù Cát", "Huyện Phù Mỹ", "Huyện Tây Sơn", "Huyện Tuy Phước", "Huyện Vân Canh", "Huyện Vĩnh Thạnh"]
    },
    {
      city: 'Bình Phước',
      district: ["Thị xã Bình Long", "Thị xã Đồng Xoài", "Thị xã Phước Long", "Huyện Bù Đăng", "Huyện Bù Đốp", "Huyện Bù Gia Mập", "Huyện Chơn Thành", "Huyện Đồng Phú", "Huyện Hớn Quản", "Huyện Lộc Ninh", "Huyện Phú Riềng"]
    },
    {
      city: 'Bình Thuận',
      district: ["Thành phố Phan Thiết", "Thị xã La Gi", "Huyện Bắc Bình", "Huyện Đảo Phú Quý", "Huyện Đức Linh", "Huyện Hàm Tân", "Huyện Hàm Thuận Bắc", "Huyện Hàm Thuận Nam", "Huyện Tánh Linh", "Huyện Tuy Phong"]
    },
    {
      city: 'Cà Mau',
      district: ["Thành phố Cà Mau", "Huyện Cái Nước", "Huyện Đầm Dơi", "Huyện Năm Căn", "Huyện Ngọc Hiển", "Huyện Phú Tân", "Huyện Thới Bình", "Huyện Trần Văn Thời", "Huyện U Minh", "Huyện Tuy Phong"]
    },
    {
      city: 'Cao Bằng',
      district: ["Thị xã Cao Bằng", "Huyện Bảo Lạc", "Huyện Bảo Lâm", "Huyện Hạ Lang", "Huyện Hà Quảng", "Huyện Hòa An", "Huyện Nguyên Bình", "Huyện Phục Hòa", "Huyện Quảng Uyên", "Huyện Thạch An", "Huyện Thông Nông", "Huyện Trà Lĩnh", "Huyện Trùng Khánh"]
    },
    {
      city: 'Cần Thơ',
      district: ["Quận Bình Thủy", "Quận Cái Răng", "Quận Ninh Kiều", "Quận Ô Môn", "Quận Thốt Nốt", "Huyện Thới Lai", "Huyện Cờ Đỏ", "Huyện Phong Điền", "Huyện Vĩnh Thạnh"]
    },
    {
      city: 'Đà Nẵng',
      district: ["Quận Cẩm Lệ", "Quận Hải Châu", "Quận Liên Chiểu", "Quận Ngũ Hành Sơn", "Quận Sơn Trà", "Quận Thanh Khê", "Huyện Hòa Vang", "Huyện Hoàng Sa"]
    },
    {
      city: 'Đắk Lắk',
      district: ["Thành phố Buôn Ma Thuột", "Thị xã Buôn Hồ", "Huyện Buôn Đôn", "Huyện Cư Kuin", "Huyện Cư M'gar", "Huyện Ea H'Leo", "Huyện Ea Kar", "Huyện Ea Súp", "Huyện Krông Ana", "Huyện Krông Bông", "Huyện Krông Buk", "Huyện Krông Năng", "Huyện Krông Pắc", "Huyện Lăk", "Huyện M Đrăk"]
    },
    {
      city: 'Bắc Ninh',
      district: ["Thành phố Bắc Ninh", "Thị xã Từ Sơn", "Huyện Gia Bình", "Huyện Lương Tài", "Huyện Quế Võ", "Huyện Thuận Thành", "Huyện Tiên Du", "Huyện Yên Phong"]
    },
    {
      city: 'Đắk Nông',
      district: ["Thị xã Gia Nghĩa", "Huyện Cư Jút", "Huyện Dăk GLong", "Huyện Dăk Mil", "Huyện Dăk R'Lấp", "Huyện Dăk Song", "Huyện Krông Nô", "Huyện Tuy Đức"]
    },
    {
      city: 'Đồng Nai',
      district: ["Thành phố Biên Hòa", "Thị xã Long Khánh", "Quận Tân Phú", "Huyện Cẩm Mỹ", "Huyện Định Quán", "Huyện Long Thành", "Huyện Nhơn Trạch", "Huyện Thống Nhất", "Huyện Trảng Bom", "Huyện Vĩnh Cửu", "Huyện Xuân Lộc"]
    },
    {
      city: 'Đồng Tháp',
      district: ["Thành phố Cao Lãnh", "Thị xã Sa Đéc", "Thị xã Hồng Ngự", "Huyện Châu Thành", "Huyện Cao Lãnh", "Huyện Huyện Hồng Ngự", "Huyện Lai Vung", "Huyện Lấp Vò", "Huyện Tam Nông", "Huyện Tân Hồng", "Huyện Thanh Bình", "Huyện Tháp Mười"]
    },
    {
      city: 'Điện Biên',
      district: ["Thành phố Điện Biên Phủ", "Thị xã Mường Lay", "Huyện Điện Biên", "Huyện Điện Biên Đông", "Huyện Mường Ảng", "Huyện Mường Chà", "Huyện Mường Nhé", "Huyện Nậm Pồ", "Huyện Tủa Chùa", "Huyện Tuần Giáo"]
    },
    {
      city: 'Gia Lai',
      district: ["Thành Phố Pleiku", "Thị xã An Khê", "Thị xã AYun Pa", "Huyện Chư Păh", "Huyện Chư Pưh", "Huyện Chư Sê", "Huyện ChưPRông", "Huyện Đăk Đoa", "Huyện Đăk Pơ", "Huyện Đức Cơ", "Huyện Ia Grai", "Huyện Ia Pa", "Huyện KBang", "Huyện Kông Chro", "Huyện Krông Pa", "Huyện Mang Yang", "Huyện Phú Thiện"]
    },
    {
      city: 'Hà Giang',
      district: ["Thành phố Hà Giang", "Huyện Bắc Mê", "Huyện Bắc Quang", "Huyện Đồng Văn", "Huyện Hoàng Su Phì", "Huyện Mèo Vạc", "Huyện Quản Bạ", "Huyện Quang Bình", "Huyện Vị Xuyên", "Huyện Xín Mần", "Huyện Yên Minh"]
    },
    {
      city: 'Hà Nam',
      district: ["Thành phố Phủ Lý", "Huyện Bình Lục", "Huyện Duy Tiên", "Huyện Kim Bảng", "Huyện Lý Nhân", "Huyện Thanh Liêm"]
    },
    {
      city: 'Hà Nội',
      district: ["Quận Ba Đình", "Huyện Ba Vì", "Quận Bắc Từ Liêm", "Quận Cầu Giấy", "Huyện Chương Mỹ", "Huyện Đan Phượng", "Huyện Đông Anh", "Quận Đống Đa", "Huyện Gia Lâm", "Quận Hà Đông", "Quận Hai Bà Trưng", "Huyện Hoài Đức", "Quận Hoàn Kiếm", "Quận Hoàng Mai", "Quận Long Biên", "Huyện Mê Linh", "Huyện Mỹ Đức", "Quận Nam Từ Liêm", "Huyện Phú Xuyên", "Huyện Phúc Thọ", "Huyện Quốc Oai", "Huyện Sóc Sơn", "Thị xã Sơn Tây", "Quận Tây Hồ", "Huyện Thạch Thất", "Huyện Thanh Oai", "Huyện Thanh Trì", "Quận Thanh Xuân", "Huyện Thường Tín", "Huyện Ứng Hòa"]
    },
    {
      city: 'Hà Tĩnh',
      district: ["Thành phố Hà Tĩnh", "Thị xã Hồng Lĩnh", "Thị xã Kỳ Anh", "Huyện Cẩm Xuyên", "Huyện Can Lộc", "Huyện Đức Thọ", "Huyện Hương Khê", "Huyện Hương Sơn", "Huyện Lộc Hà", "Huyện Nghi Xuân", "Huyện Thạch Hà", "Huyện Vũ Quang"]
    },
    {
      city: 'Hải Dương',
      district: ["Thành phố Hải Dương", "Thị xã Chí Linh", "Huyện Bình Giang", "Huyện Cẩm Giàng", "Huyện Gia Lộc", "Huyện Kim Thành", "Huyện Kinh Môn", "Huyện Nam Sách", "Huyện Ninh Giang", "Huyện Thanh Hà", "Huyện Thanh Miện", "Huyện Tứ Kỳ"]
    },
    {
      city: 'Hải Phòng',
      district: ["Quận Đồ Sơn", "Quận Dương Kinh", "Quận Hải An", "Quận Hồng Bàng", "Quận Kiến An", "Quận Lê Chân", "Quận Ngô Quyền", "Huyện An Dương", "Huyện An Lão", "Huyện Bạch Long Vĩ", "Huyện Cát Hải", "Huyện Kiến Thụy", "Huyện Thủy Nguyên", "Huyện Tiên Lãng", "Huyện Vĩnh Bảo"]
    },
    {
      city: 'Hòa Bình',
      district: ["Thành phố Hòa Bình", "Huyện Cao Phong", "Huyện Đà Bắc", "Huyện Kim Bôi", "Huyện Kỳ Sơn", "Huyện Lạc Sơn", "Huyện Lạc Thủy", "Huyện Lương Sơn", "Huyện Mai Châu", "Huyện Tân Lạc", "Huyện Yên Thủy"]
    },
    {
      city: 'Hậu Giang',
      district: ["Thành phố Vị Thanh", "Thị xã Ngã Bảy", "Huyện Châu Thành", "Huyện Châu Thành A", "Huyện Long Mỹ", "Huyện Phụng Hiệp", "Huyện Vị Thủy"]
    },
    {
      city: 'Hưng Yên',
      district: ["Thành phố Hưng Yên", "Huyện Ân Thi", "Huyện Khoái Châu", "Huyện Kim Động", "Huyện Mỹ Hào", "Huyện Phù Cừ", "Huyện Tiên Lữ", "Huyện Văn Giang", "Huyện Văn Lâm", "Huyện Yên Mỹ"]
    },
    {
      city: 'Thành phố Hồ Chí Minh',
      district: ["Quận 1", "Quận 2", "Quận 3", "Quận 4", "Quận 5", "Quận 6", "Quận 7", "Quận 8", "Quận 9", "Quận 10", "Quận 11", "Quận 12", "Quận Bình Tân", "Quận Bình Thạnh", "Quận Gò Vấp", "Quận Phú Nhuận", "Quận Tân Bình", "Quận Tân Phú", "Quận Thủ Đức", "Huyện Bình Chánh", "Huyện Cần Giờ", "Huyện Củ Chi", "Huyện Hóc Môn", "Huyện Nhà Bè"]
    },
    {
      city: 'Khánh Hòa',
      district: ["Thành phố Nha Trang", "Thị xã Cam Ranh", "Thị xã Ninh Hòa", "Huyện Cam Lâm", "Huyện Diên Khánh", "Huyện Khánh Sơn", "Huyện Khánh Vĩnh", "Huyện Trường Sa", "Huyện Vạn Ninh"]
    },
    {
      city: 'Kiên Giang',
      district: ["Thành phố Rạch Giá", "Thị xã Hà Tiên", "Huyện An Biên", "Huyện An Minh", "Huyện Châu Thành", "Huyện Giang Thành", "Huyện Giồng Riềng", "Huyện Gò Quao", "Huyện Hòn Đất", "Huyện Kiên Hải", "Huyện Kiên Lương", "Huyện Phú Quốc", "Huyện Tân Hiệp", "Huyện U minh Thượng", "Huyện Vĩnh Thuận"]
    },
    {
      city: 'Kon Tum',
      district: ["Thành phố KonTum", "Huyện Đăk Glei", "Huyện Đăk Hà", "Huyện Đăk Tô", "Huyện Kon Plông", "Huyện Kon Rẫy", "Huyện Ngọc Hồi", "Huyện Sa Thầy", "Huyện Tu Mơ Rông", "Huyện Ia H' Drai"]
    },
    {
      city: 'Lai Châu',
      district: ["Thị xã Lai Châu", "Huyện Mường Tè", "Huyện Nậm Nhùn", "Huyện Phong Thổ", "Huyện Sìn Hồ", "Huyện Tam Đường", "Huyện Tân Uyên", "Huyện Than Uyên"]
    },
    {
      city: 'Lào Cai',
      district: ["Thành phố Lào Cai", "Huyện Bắc Hà", "Huyện Bảo Thắng", "Huyện Bảo Yên", "Huyện Bát Xát", "Huyện Mường Khương", "Huyện Sa Pa", "Huyện Văn Bàn", "Huyện Xi Ma Cai"]
    },
    {
      city: 'Lạng Sơn',
      district: ["Thành phố Lạng Sơn", "Huyện Bắc Sơn", "Huyện Bình Gia", "Huyện Cao Lộc", "Huyện Chi Lăng", "Huyện Đình Lập", "Huyện Hữu Lũng", "Huyện Lộc Bình", "Huyện Tràng Định", "Huyện Văn Lãng", "Huyện Văn Quan"]
    },
    {
      city: 'Lâm Đồng',
      district: ["Thành phố Bảo Lộc", "Thành phố Đà Lạt", "Huyện Bảo Lâm", "Huyện Cát Tiên", "Huyện Đạ Huoai", "Huyện Đạ Tẻh", "Huyện Đam Rông", "Huyện Di Linh", "Huyện Đơn Dương", "Huyện Đức Trọng", "Huyện Lạc Dương", "Huyện Lâm Hà"]
    },
    {
      city: 'Long An',
      district: ["Thành phố Tân An", "Thị xã Kiến Tường", "Huyện Bến Lức", "Huyện Cần Đước", "Huyện Cần Giuộc", "Huyện Châu Thành", "Huyện Đức Hòa", "Huyện Đức Huệ", "Huyện Mộc Hóa", "Huyện Tân Hưng", "Huyện Tân Thạnh", "Huyện Tân Trụ", "Huyện Thạnh Hóa", "Huyện Thủ Thừa", "Huyện Vĩnh Hưng"]
    },
    {
      city: 'Nam Định',
      district: ["Thành phố Nam Định", "Huyện Giao Thủy", "Huyện Hải Hậu", "Huyện Mỹ Lộc", "Huyện Nam Trực", "Huyện Nghĩa Hưng", "Huyện Trực Ninh", "Huyện Vụ Bản", "Huyện Xuân Trường", "Huyện Ý Yên"]
    },
    {
      city: 'Nghệ An',
      district: ["Thành phố Vinh", "Thị xã Cửa Lò", "Thị xã Hoàng Mai", "Thị xã Thái Hòa", "Huyện Anh Sơn", "Huyện Con Cuông", "Huyện Diễn Châu", "Huyện Đô Lương", "Huyện Hưng Nguyên", "Huyện Kỳ Sơn", "Huyện Nam Đàn", "Huyện Nghi Lộc", "Huyện Nghĩa Đàn", "Huyện Quế Phong", "Huyện Quỳ Châu", "Huyện Quỳ Hợp", "Huyện Quỳnh Lưu", "Huyện Tân Kỳ", "Huyện Thanh Chương", "Huyện Tương Dương", "Huyện Yên Thành"]
    },
    {
      city: 'Ninh Bình',
      district: ["Thành phố Ninh Bình", "Thị xã Tam Điệp", "Huyện Gia Viễn", "Huyện Hoa Lư", "Huyện Kim Sơn", "Huyện Nho Quan", "Huyện Yên Khánh", "Huyện Yên Mô"]
    },
    {
      city: 'Ninh Thuận',
      district: ["Thành phố Phan Rang - Tháp Chàm", "Huyện Bác Ái", "Huyện Ninh Hải", "Huyện Ninh Phước", "Huyện Ninh Sơn", "Huyện Thuận Bắc", "Huyện Thuận Nam"]
    },
    {
      city: 'Phú Thọ',
      district: ["Thành phố Việt Trì", "Thị xã Phú Thọ", "Huyện Cẩm Khê", "Huyện Đoan Hùng", "Huyện Hạ Hòa", "Huyện Lâm Thao", "Huyện Phù Ninh", "Huyện Tam Nông", "Huyện Tân Sơn", "Huyện Thanh Ba", "Huyện Thanh Sơn", "Huyện Thanh Thủy", "Huyện Yên Lập"]
    },
    {
      city: 'Phú Yên',
      district: ["Thành phố Tuy Hòa", "Thị xã Sông Cầu", "Huyện Đông Hòa", "Huyện Đồng Xuân", "Huyện Phú Hòa", "Huyện Sơn Hòa", "Huyện Sông Hinh", "Huyện Tây Hòa", "Huyện Tuy An"]
    },
    {
      city: 'Quảng Bình',
      district: ["Thành phố Đồng Hới", "Thị xã Ba Đồn", "Huyện Bố Trạch", "Huyện Lệ Thủy", "Huyện Minh Hóa", "Huyện Quảng Ninh", "Huyện Quảng Trạch", "Huyện Tuyên Hóa"]
    },
    {
      city: 'Quảng Nam',
      district: ["Thành phố Hội An", "Thành phố Tam Kỳ", "Huyện Bắc Trà My", "Huyện Đại Lộc", "Huyện Điện Bàn", "Huyện Đông Giang", "Huyện Duy Xuyên", "Huyện Hiệp Đức", "Huyện Nam Giang", "Huyện Nam Trà My", "Huyện Nông Sơn", "Huyện Núi Thành", "Huyện Phú Ninh", "Huyện Phước Sơn", "Huyện Quế Sơn", "Huyện Tây Giang", "Huyện Thăng Bình", "Huyện Tiên Phước"]
    },
    {
      city: 'Quảng Ngãi',
      district: ["Thành phố Quảng Ngãi", "Huyện Ba Tơ", "Huyện Bình Sơn", "Huyện Đức Phổ", "Huyện Lý Sơn", "Huyện Minh Long", "Huyện Mộ Đức", "Huyện Nghĩa Hành", "Huyện Sơn Hà", "Huyện Sơn Tây", "Huyện Sơn Tịnh", "Huyện Tây Trà", "Huyện Trà Bồng", "Huyện Tư Nghĩa"]
    },
    {
      city: 'Quảng Ninh',
      district: ["Thành phố Hạ Long", "Thành phố Móng Cái", "Thị xã Cẩm Phả", "Thị xã Uông Bí", "Huyện Ba Chẽ", "Huyện Bình Liêu", "Huyện Cô Tô", "Huyện Đầm Hà", "Huyện Đông Triều", "Huyện Hải Hà", "Huyện Hoành Bồ", "Huyện Quảng Yên", "Huyện Tiên Yên", "Huyện Vân Đồn"]
    },
    {
      city: 'Quảng Trị',
      district: ["Thành phố Đông Hà", "Thị xã Quảng Trị", "Huyện Cam Lộ", "Huyện Cồn Cỏ", "Huyện Đăk Rông", "Huyện Đảo Cồn Cỏ", "Huyện Gio Linh", "Huyện Hải Lăng", "Huyện Hướng Hóa", "Huyện Triệu Phong", "Huyện Vĩnh Linh"]
    },
    {
      city: 'Sóc Trăng',
      district: ["Thành phố Sóc Trăng", "Huyện Châu Thành", "Huyện Cù Lao Dung", "Huyện Kế Sách", "Huyện Long Phú", "Huyện Mỹ Tú", "Huyện Mỹ Xuyên", "Huyện Ngã Năm", "Huyện Thạnh Trị", "Huyện Trần Đề", "Huyện Vĩnh Châu"]
    },
    {
      city: 'Sơn La',
      district: ["Thành phố Sơn La", "Huyện Bắc Yên", "Huyện Mai Sơn", "Huyện Mộc Châu", "Huyện Mường La", "Huyện Phù Yên", "Huyện Quỳnh Nhai", "Huyện Sông Mã", "Huyện Sốp Cộp", "Huyện Thuận Châu", "Huyện Vân Hồ", "Huyện Yên Châu"]
    },
    {
      city: 'Tây Ninh',
      district: ["Thành phố Tây Ninh", "Huyện Bến Cầu", "Huyện Châu Thành", "Huyện Dương Minh Châu", "Huyện Gò Dầu", "Huyện Hòa Thành", "Huyện Tân Biên", "Huyện Tân Châu", "Huyện Trảng Bàng"]
    },
    {
      city: 'Thái Bình',
      district: ["Thành phố Thái Bình", "Huyện Đông Hưng", "Huyện Hưng Hà", "Huyện Kiến Xương", "Huyện Quỳnh Phụ", "Huyện Thái Thuỵ", "Huyện Tiền Hải", "Huyện Vũ Thư"]
    },
    {
      city: 'Thái Nguyên',
      district: ["Thành phố Thái Nguyên", "Thị xã Sông Công", "Huyện Đại Từ", "Huyện Định Hóa", "Huyện Đồng Hỷ", "Huyện Phổ Yên", "Huyện Phú Bình", "Huyện Phú Lương", "Huyện Võ Nhai"]
    },
    {
      city: 'Thanh Hóa',
      district: ["Thành phố Thanh Hóa", "Thị xã Bỉm Sơn", "Thị xã Sầm Sơn", "Huyện Bá Thước", "Huyện Cẩm Thủy", "Huyện Đông Sơn", "Huyện Hà Trung", "Huyện Hậu Lộc", "Huyện Hoằng Hóa", "Huyện Lang Chánh", "Huyện Mường Lát", "Huyện Nga Sơn", "Huyện Ngọc Lặc", "Huyện Như Thanh", "Huyện Như Xuân", "Huyện Nông Cống", "Huyện Quan Hóa", "Huyện Quan Sơn", "Huyện Quảng Xương", "Huyện Thạch Thành", "Huyện Thiệu Hóa", "Huyện Thọ Xuân", "Huyện Thường Xuân", "Huyện Tĩnh Gia", "Huyện Triệu Sơn", "Huyện Vĩnh Lộc", "Huyện Yên Định"]
    },
    {
      city: 'Thừa Thiên - Huế',
      district: ["Thành phố Huế", "Thị xã Hương Thủy", "Huyện A Lưới", "Huyện Nam Đông", "Huyện Phong Điền", "Huyện Phú Lộc", "Huyện Phú Vang", "Huyện Quảng Điền"]
    },
    {
      city: 'Tiền Giang',
      district: ["Thành phố Mỹ Tho", "Thị xã Gò Công", "Thị xã Cai Lậy", "Huyện Cái Bè", "Huyện Châu Thành", "Huyện Chợ Gạo", "Huyện Gò Công Đông", "Huyện Gò Công Tây", "Huyện Tân Phú Đông", "Huyện Tân Phước"]
    },
    {
      city: 'Trà Vinh',
      district: ["Thành phố Trà Vinh", "Huyện Càng Long", "Huyện Cầu Kè", "Huyện Cầu Ngang", "Huyện Châu Thành", "Huyện Duyên Hải", "Huyện Tiểu Cần", "Huyện Trà Cú"]
    },
    {
      city: 'Tuyên Quang',
      district: ["Thành phố Tuyên Quang", "Huyện Chiêm Hóa", "Huyện Hàm Yên", "Huyện Lâm Bình", "Huyện Na Hang", "Huyện Sơn Dương", "Huyện Yên Sơn"]
    },
    {
      city: 'Vĩnh Long',
      district: ["Thành phố Vĩnh Long", "Quận Bình Tân", "Huyện Bình Minh", "Huyện Long Hồ", "Huyện Mang Thít", "Huyện Tam Bình", "Huyện Trà Ôn", "Huyện Vũng Liêm"]
    },
    {
      city: 'Vĩnh Phúc',
      district: ["Thành phố Vĩnh Yên", "Thị xã Phúc Yên", "Huyện Bình Xuyên", "Huyện Lập Thạch", "Huyện Sông Lô", "Huyện Tam Đảo", "Huyện Tam Dương", "Huyện Vĩnh Tường", "Huyện Yên Lạc"]
    },
    {
      city: 'Yên Bái',
      district: ["Thành phố Yên Bái", "Thị xã Nghĩa Lộ", "Huyện Lục Yên", "Huyện Mù Cang Chải", "Huyện Trạm Tấu", "Huyện Trấn Yên", "Huyện Văn Chấn", "Huyện Văn Yên", "Huyện Yên Bình"]
    }
  ];

  public ot_timkiem = [
    { name: 'Họ và tên', val: 'HoTen' },
    { name: 'Mã khách hàng', val: 'MaKH' },
    { name: 'Địa chỉ', val: 'DiaChi' }
  ];

  public DanhSach_KH: User[] = [];

  constructor(private services: DatabaseService) { }
  makh = '';
  ho = '';
  ten = '';
  gioitinh = '';
  ngaysinh = new Date();
  diachichinh = '';
  sdt = '';
  tinhthanh = '';
  quanhuyen = '';
  email = '';
  password = '';
  timkiem = '';
  timkiemtheo = '';

  ngOnInit(): void {
    this.services.POST_showUser().subscribe((result) => {
      this.DanhSach_KH = result;
    })
  }

  changeCity(event: any): void {
    const city = event.target.value;
    if (!city) {
      return;
    }
    this.districts = this.cities.find((data) => data.city === city)?.district || [];
  }

  addUser() {
    if(this.ho == "" || this.ten == "" || this.gioitinh == "" || this.diachichinh == "" || this.sdt == "" || this.tinhthanh == "" || this.quanhuyen == "" || this.email == "" || this.password == "")
    {
      alert("Xin mời nhập đầy đủ dữ liệu")
    }else
    {
      this.services.POST_addUser(this.ho, this.ten, this.gioitinh, this.ngaysinh.toLocaleDateString('fr-CA'), this.diachichinh, this.sdt, this.tinhthanh, this.quanhuyen, this.email, this.password)
      .subscribe((ketquathem) => {
        alert(ketquathem)
        this.ngOnInit()
      })
    }

  }
  loadValue() {
    this.makh = '';
    this.ho = '';
    this.ten = '';
    this.gioitinh = '';
    this.ngaysinh = new Date();
    this.diachichinh = '';
    this.sdt = '';
    this.tinhthanh = '';
    this.quanhuyen = '';
    this.email = '';
    this.password = '';
  }
  getUser(kh: User) {
    this.makh = kh.MaKH;
    this.ho = kh.Ho;
    this.ten = kh.Ten;
    this.gioitinh = kh.GioiTinh;
    this.ngaysinh = new Date(kh.NgaySinh.replace('Z', ''));
    this.diachichinh = kh.DiaChiChinh;
    this.sdt = kh.Sdt;
    this.tinhthanh = kh.TinhThanh;
    this.quanhuyen = kh.QuanHuyen;
    this.email = kh.Email;
    this.password = kh.Password;
  }

  saveUser() {
    if(this.ho == "" || this.ten == "" || this.gioitinh == "" || this.diachichinh == "" || this.sdt == "" || this.tinhthanh == "" || this.quanhuyen == "" || this.email == "" || this.password == "")
    {
      alert("Xin mời nhập đầy đủ dữ liệu")
    }else
    {
      this.services.POST_saveUser(this.makh, this.ho, this.ten, this.gioitinh, this.ngaysinh.toLocaleDateString('fr-CA'), this.diachichinh, this.sdt, this.tinhthanh, this.quanhuyen, this.email, this.password)
      .subscribe((ketquasave) => {
        alert(ketquasave)
        this.ngOnInit()
      })
    }
  }

  deleteUser() {
    this.services.POST_deleteUser(this.makh)
    .subscribe((ketquadelete) => {
      alert(ketquadelete)
      this.ngOnInit()
    })
  }

  onChangeSelect(event : any) {
    this.timkiemtheo = event.target.value;
  }
  
  onEnter(value : string){
    if(this.timkiemtheo != '')
    {
      this.timkiem = value;
      this.services.POST_findUser(this.timkiem, this.timkiemtheo)
      .subscribe((ketquatim) => {
        this.DanhSach_KH = ketquatim
      })
    }else
    {
      alert('Hãy chọn cách tìm kiếm')
    }
  }
  
  refresh() {
    this.ngOnInit()
    this.timkiem = ""
  }

}
