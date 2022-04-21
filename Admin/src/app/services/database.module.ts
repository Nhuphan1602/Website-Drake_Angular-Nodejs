import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  User,
  HoaDon,
  HoaDon_KH,
  HoaDon_MaGiamGia,
  HoaDon_MaPTTT,
  CTHD,
  CTHD_MaSP,
  CTHD_MaHD,
  MGG,
  Size,
  CTHD_MaSize,
  PTTT,
  PTVC,
  HoaDon_MaPTVC,
  ThongKe,
  TiLe,
  SP,
  NH,
  DM,
  LPT,
  SPSize
} from '../Interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  constructor(private http: HttpClient) {}
  // LOGIN
  POST_login(taikhoan: string, matkhau: string) {
    return this.http.post<{ matk: string }>(
      'http://localhost:8081/admin/api/post/login',
      {
        taikhoan: taikhoan,
        matkhau: matkhau,
      }
    );
  }

  // QUẢN LÝ KHÁCH HÀNG
  POST_addUser(
    ho: string,
    ten: string,
    gioitinh: string,
    ngaysinh: string,
    diachichinh: string,
    sdt: string,
    tinhthanh: string,
    quanhuyen: string,
    email: string,
    password: string
  ) {
    return this.http.post<string>(
      'http://localhost:8081/admin/api/post/quanlykhachhang/themkhachhang',
      {
        ho: ho,
        ten: ten,
        gioitinh: gioitinh,
        ngaysinh: ngaysinh,
        sdt: sdt,
        diachichinh: diachichinh,
        tinhthanh: tinhthanh,
        quanhuyen: quanhuyen,
        email: email,
        password: password,
      }
    );
  }

  POST_showUser() {
    return this.http.post<User[]>(
      'http://localhost:8081/admin/api/post/quanlykhachhang/showkh',
      {},
      {}
    );
  }

  POST_saveUser(
    makh: string,
    ho: string,
    ten: string,
    gioitinh: string,
    ngaysinh: string,
    diachichinh: string,
    sdt: string,
    tinhthanh: string,
    quanhuyen: string,
    email: string,
    password: string
  ) {
    return this.http.post<string>(
      'http://localhost:8081/admin/api/post/quanlykhachhang/savekh',
      {
        makh: makh,
        ho: ho,
        ten: ten,
        gioitinh: gioitinh,
        ngaysinh: ngaysinh,
        sdt: sdt,
        diachichinh: diachichinh,
        tinhthanh: tinhthanh,
        quanhuyen: quanhuyen,
        email: email,
        password: password,
      }
    );
  }

  POST_deleteUser(makh: string) {
    return this.http.post<User>(
      'http://localhost:8081/admin/api/post/quanlykhachhang/deletekh',
      {
        makh: makh,
      }
    );
  }

  POST_findUser(timkiem: string, timkiemtheo: string) {
    return this.http.post<User[]>(
      'http://localhost:8081/admin/api/post/quanlykhachhang/timkiemkh',
      {
        timkiem: timkiem,
        timkiemtheo: timkiemtheo,
      }
    );
  }

  // QUẢN LÝ HÓA ĐƠN
  POST_showHD() {
    return this.http.post<HoaDon[]>(
      'http://localhost:8081/admin/api/post/quanlyhoadon/showhd',
      {},
      {}
    );
  }

  POST_saveHD(
    makh: string,
    magiamgia: string,
    mapttt: string,
    maptvc: string,
    trangthai: string,
    ngaymua: string,
    ngaynhanhang: string,
    tongtien: number,
    ghichu: string,
    mahd: string
  ) {
    return this.http.post<string>(
      'http://localhost:8081/admin/api/post/quanlyhoadon/savehd',
      {
        makh: makh,
        magiamgia: magiamgia,
        mapttt: mapttt,
        maptvc: maptvc,
        trangthai: trangthai,
        ngaymua: ngaymua,
        ngaynhanhang: ngaynhanhang,
        tongtien: tongtien,
        ghichu: ghichu,
        mahd: mahd,
      }
    );
  }

  POST_showHD_MaKH() {
    return this.http.post<HoaDon_KH[]>(
      'http://localhost:8081/admin/api/post/quanlyhoadon/showmakh',
      {},
      {}
    );
  }

  POST_showHD_MaPTTT() {
    return this.http.post<HoaDon_MaPTTT[]>(
      'http://localhost:8081/admin/api/post/quanlyhoadon/showmapttt',
      {},
      {}
    );
  }

  POST_showHD_MaPTVC() {
    return this.http.post<HoaDon_MaPTVC[]>(
      'http://localhost:8081/admin/api/post/quanlyhoadon/showmaptvc',
      {},
      {}
    );
  }

  POST_showHD_MaGiamGia() {
    return this.http.post<HoaDon_MaGiamGia[]>(
      'http://localhost:8081/admin/api/post/quanlyhoadon/showmagiamgia',
      {},
      {}
    );
  }

  POST_deleteHD(mahd: string) {
    return this.http.post<HoaDon>(
      'http://localhost:8081/admin/api/post/quanlyhoadon/deletehd',
      {
        mahd: mahd,
      }
    );
  }

  POST_findHD(timkiem: string, timkiemtheo: string) {
    return this.http.post<HoaDon[]>(
      'http://localhost:8081/admin/api/post/quanlyhoadon/timkiemhd',
      {
        timkiem: timkiem,
        timkiemtheo: timkiemtheo,
      }
    );
  }

  // QUẢN LÝ CTHD
  POST_showCTHD() {
    return this.http.post<CTHD[]>(
      'http://localhost:8081/admin/api/post/quanlychitiethoadon/showcthd',
      {},
      {}
    );
  }

  POST_showCTHD_MaSP() {
    return this.http.post<CTHD_MaSP[]>(
      'http://localhost:8081/admin/api/post/quanlychitiethoadon/showmasp',
      {},
      {}
    );
  }

  POST_showCTHD_MaHD() {
    return this.http.post<CTHD_MaHD[]>(
      'http://localhost:8081/admin/api/post/quanlychitiethoadon/showmahd',
      {},
      {}
    );
  }

  POST_showCTHD_MaSize() {
    return this.http.post<CTHD_MaSize[]>(
      'http://localhost:8081/admin/api/post/quanlychitiethoadon/showmasize',
      {},
      {}
    );
  }

  POST_saveCTHD(
    mahd: string,
    masp: string,
    masize: string,
    soluong: string,
    giaban: number,
    mahd_up: string,
    masp_up: string,
    masize_up: string
  ) {
    return this.http.post<string>(
      'http://localhost:8081/admin/api/post/quanlychitiethoadon/savecthd',
      {
        mahd: mahd,
        masp: masp,
        masize: masize,
        soluong: soluong,
        giaban: giaban,
        mahd_up: mahd_up,
        masp_up: masp_up,
        masize_up: masize_up,
      }
    );
  }

  POST_deleteCTHD(mahd: string, masp: string, masize: string) {
    return this.http.post<string>(
      'http://localhost:8081/admin/api/post/quanlychitiethoadon/deletecthd',
      {
        mahd: mahd,
        masp: masp,
        masize: masize,
      }
    );
  }

  POST_findCTHD(timkiem: string, timkiemtheo: string) {
    return this.http.post<CTHD[]>(
      'http://localhost:8081/admin/api/post/quanlychitiethoadon/timkiemcthd',
      {
        timkiem: timkiem,
        timkiemtheo: timkiemtheo,
      }
    );
  }

  // QUẢN LÝ MÃ GIẢM GIÁ
  POST_addMGG(tenmgg: string, giatri: string, dieukien: string, hsd: string) {
    return this.http.post<string>(
      'http://localhost:8081/admin/api/post/quanlymagiamgia/themmgg',
      {
        tenmgg: tenmgg,
        dieukien : dieukien,
        giatri: giatri,
        hsd: hsd,
      }
    );
  }

  POST_showMGG() {
    return this.http.post<MGG[]>(
      'http://localhost:8081/admin/api/post/quanlymagiamgia/showmgg',
      {},
      {}
    );
  }

  POST_saveMGG(
    magg: string,
    tenmgg: string,
    giatri: string,
    dieukien: string,
    hsd: string
  ) {
    return this.http.post<string>(
      'http://localhost:8081/admin/api/post/quanlymagiamgia/savemgg',
      {
        magg: magg,
        tenmgg: tenmgg,
        giatri: giatri,
        dieukien: dieukien,
        hsd: hsd,
      }
    );
  }

  POST_deleteMGG(magg: string) {
    return this.http.post<string>(
      'http://localhost:8081/admin/api/post/quanlymagiamgia/deletemgg',
      {
        magg: magg,
      }
    );
  }

  POST_findMGG(timkiem: string, timkiemtheo: string) {
    return this.http.post<MGG[]>(
      'http://localhost:8081/admin/api/post/quanlymagiamgia/timkiemmgg',
      {
        timkiem: timkiem,
        timkiemtheo: timkiemtheo,
      }
    );
  }

  // QUẢN LÝ SIZE
  POST_addSize(giatri: string) {
    return this.http.post<string>(
      'http://localhost:8081/admin/api/post/quanlysize/themsize',
      {
        giatri: giatri,
      }
    );
  }

  POST_showSize() {
    return this.http.post<Size[]>(
      'http://localhost:8081/admin/api/post/quanlysize/showsize',
      {},
      {}
    );
  }

  POST_saveSize(masize: string, giatri: string) {
    return this.http.post<string>(
      'http://localhost:8081/admin/api/post/quanlysize/savesize',
      {
        masize: masize,
        giatri: giatri,
      }
    );
  }

  POST_deleteSize(masize: string) {
    return this.http.post<string>(
      'http://localhost:8081/admin/api/post/quanlysize/deletesize',
      {
        masize: masize,
      }
    );
  }

  POST_findSize(timkiem: string, timkiemtheo: string) {
    return this.http.post<Size[]>(
      'http://localhost:8081/admin/api/post/quanlysize/timkiemsize',
      {
        timkiem: timkiem,
        timkiemtheo: timkiemtheo,
      }
    );
  }

  // QUẢN LÝ PTTT
  POST_showPTTT() {
    return this.http.post<PTTT[]>(
      'http://localhost:8081/admin/api/post/quanlyPTTT/showPTTT',
      {},
      {}
    );
  }

  POST_addPTTT(ten: string, phi: number) {
    return this.http.post<string>(
      'http://localhost:8081/admin/api/post/quanlyPTTT/addPTTT',
      {
        ten: ten,
        phi: phi,
      }
    );
  }

  POST_savePTTT(ten: string, phi: number, mapttt: string) {
    return this.http.post<string>(
      'http://localhost:8081/admin/api/post/quanlyPTTT/savePTTT',
      {
        mapttt: mapttt,
        ten: ten,
        phi: phi,
      }
    );
  }

  POST_deletePTTT(mapttt: string) {
    return this.http.post<string>(
      'http://localhost:8081/admin/api/post/quanlyPTTT/deletePTTT',
      {
        mapttt: mapttt,
      }
    );
  }

  POST_findPTTT(timkiem: string, timkiemtheo: string) {
    return this.http.post<PTTT[]>(
      'http://localhost:8081/admin/api/post/quanlyPTTT/timkiemPTTT',
      {
        timkiem: timkiem,
        timkiemtheo: timkiemtheo,
      }
    );
  }

  // QUẢN LÝ PTVC
  POST_showPTVC() {
    return this.http.post<PTVC[]>(
      'http://localhost:8081/admin/api/post/quanlyPTVC/showPTVC',
      {},
      {}
    );
  }

  POST_addPTVC(ten: string, phi: number) {
    return this.http.post<string>(
      'http://localhost:8081/admin/api/post/quanlyPTVC/addPTVC',
      {
        ten: ten,
        phi: phi,
      }
    );
  }

  POST_savePTVC(ten: string, phi: number, maptvc: string) {
    return this.http.post<string>(
      'http://localhost:8081/admin/api/post/quanlyPTVC/savePTVC',
      {
        maptvc: maptvc,
        ten: ten,
        phi: phi,
      }
    );
  }

  POST_deletePTVC(maptvc: string) {
    return this.http.post<string>(
      'http://localhost:8081/admin/api/post/quanlyPTVC/deletePTVC',
      {
        maptvc: maptvc,
      }
    );
  }

  POST_findPTVC(timkiem: string, timkiemtheo: string) {
    return this.http.post<PTVC[]>(
      'http://localhost:8081/admin/api/post/quanlyPTVC/timkiemPTVC',
      {
        timkiem: timkiem,
        timkiemtheo: timkiemtheo,
      }
    );
  }

  // THỐNG KÊ
  POST_showTKhientai() {
    return this.http.post<ThongKe[]>(
      'http://localhost:8081/admin/api/post/thongke/showthongkehientai',
      {},
      {}
    );
  }

  POST_showTKtheonam(nam: string) {
    return this.http.post<ThongKe[]>(
      'http://localhost:8081/admin/api/post/thongke/showthongketheonam',
      {
        nam: nam,
      }
    );
  }

  POST_showTKtongtheonam(nam: string) {
    return this.http.post<ThongKe[]>(
      'http://localhost:8081/admin/api/post/thongke/showtongtheonam',
      {
        nam: nam,
      }
    );
  }

  POST_showNam() {
    return this.http.post<ThongKe[]>(
      'http://localhost:8081/admin/api/post/thongke/showNam',
      {},
      {}
    );
  }

  POST_showTiLe() {
    return this.http.post<TiLe[]>(
      'http://localhost:8081/admin/api/post/thongke/showtile',
      {},
      {}
    );
  }

  // QUẢN LÝ SẢN PHẨM

  POST_showSP(showtheo: string) {
    return this.http.post<SP[]>(
      'http://localhost:8081/admin/api/post/quanlysanpham/showsp',
      {
        showtheo: showtheo,
      }
    );
  }

  POST_showNH() {
    return this.http.post<NH[]>(
      'http://localhost:8081/admin/api/post/quanlysanpham/shownh',
      {},
      {}
    );
  }

  POST_showLPT() {
    return this.http.post<LPT[]>(
      'http://localhost:8081/admin/api/post/quanlysanpham/showlpt',
      {},
      {}
    );
  }

  POST_getMaSP(manh: number) {
    return this.http.post<string>(
      'http://localhost:8081/admin/api/post/quanlysanpham/getmasp',
      { manh: manh },
      {}
    );
  }

  POST_showDM(manh: number) {
    return this.http.post<DM[]>(
      'http://localhost:8081/admin/api/post/quanlysanpham/showmadm',
      { manh: manh },
      {}
    );
  }
  POST_addGiay(
    madm: string,
    masp: string,
    tensp: string,
    giasp: string,
    km: string,
    trangthai: string,
    c1_h1: string
  ) {
    return this.http.post<string>(
      'http://localhost:8081/admin/api/post/quanlysanpham/themgiay',
      {
        madm: madm,
        masp: masp,
        tensp: tensp,
        giasp: giasp,
        km: km,
        trangthai: trangthai,
        c1_h1: c1_h1,
      }
    );
  }

  POST_addPT(
    madm: string,
    masp: string,
    malpt: string,
    tensp: string,
    giasp: string,
    km: string,
    trangthai: string,
    c1_h1: string
  ) {
    return this.http.post<string>(
      'http://localhost:8081/admin/api/post/quanlysanpham/thempt',
      {
        madm: madm,
        masp: masp,
        malpt: malpt,
        tensp: tensp,
        giasp: giasp,
        km: km,
        trangthai: trangthai,
        c1_h1: c1_h1,
      }
    );
  }

  POST_addImage(image: any) {
    return this.http.post<{ Success: boolean }>(
      'http://localhost:8081/admin/api/post/quanlysanpham/themanh',
      image
    );
  }

  POST_suaAnh(table: string, filename: string, link: string, masp: string) {
    return this.http.post<string>(
      'http://localhost:8081/admin/api/post/quanlysanpham/suaanh',
      {
        table: table,
        filename: filename,
        link: link,
        masp: masp,
      }
    );
  }
  POST_suaCTGiay(
    masp: string,
    gthieu: string,
    dsp: string,
    bst: string,
    nsx: string,
    cdbh: string,
    chpp: string,
    pktk: string,
    cdvc: string,
    ctvc: string,
    gtinh: string,
    clieu: string,
    ms: string,
    tnsp: string,
    pt: string,
    ll: string,
    dg: string
  ) {
    return this.http.post<string>(
      'http://localhost:8081/admin/api/post/quanlysanpham/suactgiay',
      {
        masp: masp,
        gthieu: gthieu,
        dsp: dsp,
        bst: bst,
        nsx: nsx,
        cdbh: cdbh,
        cdvc: cdvc,
        chpp: chpp,
        pktk: pktk,
        ctvc: ctvc,
        gtinh: gtinh,
        clieu: clieu,
        ms: ms,
        tnsp: tnsp,
        pt: pt,
        ll: ll,
        dg: dg,
      }
    );
  }

  POST_suaGiay(
    masp: string,
    masptam: string,
    madm: string,
    tensp: string,
    gia: string,
    km: string,
    trangthai: string
  ) {
    return this.http.post<string>(
      'http://localhost:8081/admin/api/post/quanlysanpham/suagiay',
      {
        masp: masp,
        masptam: masptam,
        madm: madm,
        tensp: tensp,
        gia: gia,
        km: km,
        trangthai: trangthai,
      }
    );
  }

  POST_suaCTPT(
    masp: string,
    gthieu: string,
    dsp: string,
    bst: string,
    nsx: string,
    cdbh: string,
    chpp: string,
    pktk: string,
    cdvc: string,
    ctvc: string,
    gtinh: string,
    clieu: string,
    ms: string,
    tnsp: string,
    ktsp: string
  ) {
    return this.http.post<string>(
      'http://localhost:8081/admin/api/post/quanlysanpham/suactpt',
      {
        masp: masp,
        gthieu: gthieu,
        dsp: dsp,
        bst: bst,
        nsx: nsx,
        cdbh: cdbh,
        cdvc: cdvc,
        chpp: chpp,
        pktk: pktk,
        ctvc: ctvc,
        gtinh: gtinh,
        clieu: clieu,
        ms: ms,
        tnsp: tnsp,
        ktsp: ktsp,
      }
    );
  }
  POST_suaPT(
    masp: string,
    masptam: string,
    malpt: string,
    madm: string,
    tensp: string,
    gia: string,
    km: string,
    trangthai: string
  ) {
    return this.http.post<string>(
      'http://localhost:8081/admin/api/post/quanlysanpham/suapt',
      {
        masp: masp,
        masptam: masptam,
        malpt: malpt,
        madm: madm,
        tensp: tensp,
        gia: gia,
        km: km,
        trangthai: trangthai,
      }
    );
  }
  POST_deleteSP(masp: string) {
    return this.http.post<string>(
      'http://localhost:8081/admin/api/post/quanlysanpham/deletesp',
      {
        masp: masp,
      }
    );
  }

  POST_findGiay(timkiem: string, timkiemtheo: string) {
    return this.http.post<SP[]>(
      'http://localhost:8081/admin/api/post/quanlysanpham/timkiemgiay',
      {
        timkiem: timkiem,
        timkiemtheo: timkiemtheo,
      }
    );
  }

  POST_findPT(timkiem: string, timkiemtheo: string) {
    return this.http.post<SP[]>(
      'http://localhost:8081/admin/api/post/quanlysanpham/timkiempt',
      {
        timkiem: timkiem,
        timkiemtheo: timkiemtheo,
      }
    );
  }
  // sp size
  POST_showSPSize(timkiem : string) {
    return this.http.post<SPSize[]>(
      'http://localhost:8081/admin/api/post/quanlyspsize/showspsize',
      {timkiem : timkiem}
    );
  }

  POST_suaSPSize(
    masp: string,
    masize : string, 
    soluong : number
  ) {
    return this.http.post<string>(
      'http://localhost:8081/admin/api/post/quanlyspsize/suaspsize',
      {
        masp: masp,
        masize: masize,
        soluong: soluong,
      }
    );
  }

}
