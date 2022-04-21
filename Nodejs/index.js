const config = require("./config")
const express = require("express")
const app = express()
const sql = require("mssql")
const fs = require("fs")
const multer = require("multer")

const bodyParser = require("body-parser")
const { resolveNaptr } = require("dns")
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

function executeSQL(queryString) {
  const database_configuration = {
    user: "sa",
    password: "123456",
    server: "MSI\\TAMNHU",
    database: "Drake1",
    trustServerCertificate: true,
    option: {
      encrypt: false,
      trustedConnection: true,
    },
  }
  return new Promise((resolve, reject) => {
    sql.connect(database_configuration, (err, db) => {
      if (err) {
        reject(err)
      }
      var request = new sql.Request()
      request.query(queryString, (err, data) => {
        if (err) {
          reject(err)
        }
        resolve(data)
      })
    })
  })
}

function DocFile(filepath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filepath, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data.toString())
      }
    })
  })
}
app.use((req, res, next) => {
  var allowedDomains = ["http://localhost:8082", "http://localhost:8083"]
  var origin = req.headers.origin
  if (allowedDomains.indexOf(origin) > -1) {
    res.setHeader("Access-Control-Allow-Origin", origin)
  }

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  )
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type, Accept"
  )
  res.setHeader("Access-Control-Allow-Credentials", true)
  return next()
})

app.get("/", (req, res, next) => {
  res.send("Hello World")
  return next()
})

app.listen(8081, () => {
  console.log("Server đang chạy...")
})

// login
app.post("/admin/api/post/login", (req, res, next) => {
  if (
    req.body.taikhoan == config.taikhoan.tk &&
    req.body.matkhau == config.taikhoan.mk
  ) {
    res.send({ matk: config.taikhoan.matk })
  } else {
    res.send({ matk: "" })
  }
  return next()
})

// addUser
app.post("/admin/api/post/quanlykhachhang/themkhachhang", (req, res, next) => {
  var queryString = `exec addUser N'${req.body.ho}',N'${req.body.ten}',N'${req.body.gioitinh}','${req.body.ngaysinh}','${req.body.sdt}', N'${req.body.diachichinh}', N'${req.body.tinhthanh}',N'${req.body.quanhuyen}','${req.body.email}','${req.body.password}'`
  executeSQL(queryString)
    .then(() => {
      res.send(["Thêm thành công!"])
      return next()
    })
    .catch((err) => {
      console.log(err)
      res.send(["Email đã tồn tại!"])
      return next()
    })
})

// showUser
app.post("/admin/api/post/quanlykhachhang/showkh", (req, res, next) => {
  var queryString = `exec showUser`
  executeSQL(queryString)
    .then((data) => {
      res.send(data.recordset)
      return next()
    })
    .catch((err) => {
      console.log(err)
    })
})

// saveUser
app.post("/admin/api/post/quanlykhachhang/savekh", (req, res, next) => {
  var queryString = `exec saveUser N'${req.body.ho}',N'${req.body.ten}',N'${req.body.gioitinh}','${req.body.ngaysinh}','${req.body.sdt}',N'${req.body.diachichinh}',N'${req.body.tinhthanh}',N'${req.body.quanhuyen}','${req.body.email}','${req.body.password}','${req.body.makh}'`
  executeSQL(queryString)
    .then(() => {
      res.send(["Update thành công"])
      return next()
    })
    .catch((err) => {
      console.log(err)
      res.send(["Email đã tồn tại"])
    })
})

// deleteUser
app.post("/admin/api/post/quanlykhachhang/deletekh", (req, res) => {
  var queryString = `exec deleteUser ${req.body.makh}`
  executeSQL(queryString)
    .then(() => {
      res.send(["Xóa thành công"])
    })
    .catch((err) => {
      console.log(err)
      res.send(["Xóa thất bại"])
    })
})

//searchUser
app.post("/admin/api/post/quanlykhachhang/timkiemkh", (req, res, next) => {
  if (req.body.timkiemtheo == "HoTen") {
    var queryString = `select MaKH, Ho,Ten,GioiTinh,convert(varchar(20),NgaySinh,103) as NgaySinh, Sdt,DiaChiChinh,TinhThanh,QuanHuyen,Email,Password from KhachHang 
    where formatmessage('%s %s', Ho,Ten) like N'%${req.body.timkiem}%'`
  } else if (req.body.timkiemtheo == "DiaChi") {
    var queryString = `select MaKH, Ho,Ten,GioiTinh,convert(varchar(20),NgaySinh,103) as NgaySinh, Sdt,DiaChiChinh,TinhThanh,QuanHuyen,Email,Password from KhachHang 
    where formatmessage('%s %s %s', DiaChiChinh,TinhThanh,QuanHuyen) like N'%${req.body.timkiem}%'`
  } else {
    var queryString = `select MaKH, Ho,Ten,GioiTinh,convert(varchar(20),NgaySinh,103) as NgaySinh, Sdt,DiaChiChinh,TinhThanh,QuanHuyen,Email,Password from KhachHang 
    where MaKH like N'%${req.body.timkiem}%'`
  }
  executeSQL(queryString)
    .then((data) => {
      res.send(data.recordset)
      return next()
    })
    .catch((err) => {
      console.log(err)
    })
})

// showHD
app.post("/admin/api/post/quanlyhoadon/showhd", (req, res, next) => {
  var queryString = `exec showHD`
  executeSQL(queryString)
    .then((data) => {
      res.send(data.recordset)
      return next()
    })
    .catch((err) => {
      console.log(err)
    })
})

//deleteHD
app.post("/admin/api/post/quanlyhoadon/deletehd", (req, res) => {
  var queryString = `exec deleteHD '${req.body.mahd}'`
  executeSQL(queryString)
    .then(() => {
      res.send(["Xóa thành công"])
    })
    .catch((err) => {
      console.log(err)
      res.send(["Xóa thất bại"])
    })
})

//saveHD
app.post("/admin/api/post/quanlyhoadon/savehd", (req, res, next) => {
  var queryString = `exec saveHD ${req.body.makh},${req.body.magiamgia},${req.body.mapttt},${req.body.maptvc},N'${req.body.trangthai}','${req.body.ngaymua}','${req.body.ngaynhanhang}',${req.body.tongtien},N'${req.body.ghichu}',${req.body.mahd}`
  executeSQL(queryString)
    .then(() => {
      res.send(["Update thành công"])
      return next()
    })
    .catch((err) => {
      console.log(err)
      res.send(["Update thất bại"])
    })
})

//option HoaDon_MaKH
app.post("/admin/api/post/quanlyhoadon/showmakh", (req, res, next) => {
  var queryString = `exec showMaKH`
  executeSQL(queryString)
    .then((data) => {
      res.send(data.recordset)
      return next()
    })
    .catch((err) => {
      console.log(err)
    })
})

//option HoaDon_MaGiamGia
app.post("/admin/api/post/quanlyhoadon/showmagiamgia", (req, res, next) => {
  var queryString = `exec showMaGiamGia`
  executeSQL(queryString)
    .then((data) => {
      res.send(data.recordset)
      return next()
    })
    .catch((err) => {
      console.log(err)
    })
})

//option HoaDon_MaPTTT
app.post("/admin/api/post/quanlyhoadon/showmapttt", (req, res, next) => {
  var queryString = `exec showMaPTTT`
  executeSQL(queryString)
    .then((data) => {
      res.send(data.recordset)
      return next()
    })
    .catch((err) => {
      console.log(err)
    })
})

//option HoaDon_MaPTVC
app.post("/admin/api/post/quanlyhoadon/showmaptvc", (req, res, next) => {
  var queryString = `exec showMaPTVC`
  executeSQL(queryString)
    .then((data) => {
      res.send(data.recordset)
      return next()
    })
    .catch((err) => {
      console.log(err)
    })
})

//searchHD
app.post("/admin/api/post/quanlyhoadon/timkiemhd", (req, res, next) => {
  if (req.body.timkiemtheo == "TongTienTren") {
    var queryString = `Select MaHD, MaKH,MaGiamGia,MaPTTT,TrangThai,convert(varchar(20),Ngaymua,103) as Ngaymua, convert(varchar(20),Ngaynhanhang,103) as Ngaynhanhang, TongTien from HoaDon
    where TongTien >= ${req.body.timkiem}`
  } else if (req.body.timkiemtheo == "TongTienDuoi") {
    var queryString = `Select MaHD, MaKH,MaGiamGia,MaPTTT,TrangThai,convert(varchar(20),Ngaymua,103) as Ngaymua, convert(varchar(20),Ngaynhanhang,103) as Ngaynhanhang, TongTien from HoaDon
    where TongTien <= ${req.body.timkiem}`
  } else {
    var queryString = `Select MaHD, MaKH,MaGiamGia,MaPTTT,TrangThai,convert(varchar(20),Ngaymua,103) as Ngaymua, convert(varchar(20),Ngaynhanhang,103) as Ngaynhanhang, TongTien from HoaDon
    where ${req.body.timkiemtheo} like N'%${req.body.timkiem}%'`
  }
  executeSQL(queryString)
    .then((data) => {
      res.send(data.recordset)
      return next()
    })
    .catch((err) => {
      console.log(err)
    })
})

//showMGG
app.post("/admin/api/post/quanlymagiamgia/showmgg", (req, res, next) => {
  var queryString = `exec showMGG`
  executeSQL(queryString)
    .then((data) => {
      res.send(data.recordset)
      return next()
    })
    .catch((err) => {
      console.log(err)
    })
})

// addMGG
app.post("/admin/api/post/quanlymagiamgia/themmgg", (req, res, next) => {
  var queryString = `exec addMGG N'${req.body.tenmgg}',${req.body.giatri},${req.body.dieukien},'${req.body.hsd}'`
  executeSQL(queryString)
    .then(() => {
      res.send(["Thêm thành công!"])
      return next()
    })
    .catch((err) => {
      console.log(err)
      res.send(["Mã đã tồn tại!"])
      return next()
    })
})

// saveMGG
app.post("/admin/api/post/quanlymagiamgia/savemgg", (req, res, next) => {
  var queryString = `exec saveMGG N'${req.body.tenmgg}', ${req.body.giatri}, ${req.body.dieukien}, '${req.body.hsd}', ${req.body.magg}`
  executeSQL(queryString)
    .then(() => {
      res.send(["Update thành công"])
      return next()
    })
    .catch((err) => {
      console.log(err)
      res.send(["Update thất bại"])
    })
})

// deleteMgg
app.post("/admin/api/post/quanlymagiamgia/deletemgg", (req, res) => {
  var queryString = `exec deleteMGG ${req.body.magg}`
  executeSQL(queryString)
    .then(() => {
      res.send(["Xóa thành công"])
    })
    .catch((err) => {
      console.log(err)
      res.send(["Xóa thất bại"])
    })
})

//searchMGG
app.post("/admin/api/post/quanlymagiamgia/timkiemmgg", (req, res, next) => {
  var queryString = `Select MaGiamGia, Ten, GiaTri,convert(varchar(20),HanSuDung,103) as HanSuDung from MaGiamGia
  where ${req.body.timkiemtheo} like N'%${req.body.timkiem}%'`
  executeSQL(queryString)
    .then((data) => {
      res.send(data.recordset)
      return next()
    })
    .catch((err) => {
      console.log(err)
    })
})

//showCTHD
app.post("/admin/api/post/quanlychitiethoadon/showcthd", (req, res, next) => {
  var queryString = `exec showCTHD`
  executeSQL(queryString)
    .then((data) => {
      res.send(data.recordset)
      return next()
    })
    .catch((err) => {
      console.log(err)
    })
})

//Option CTHD_MaSP
app.post("/admin/api/post/quanlychitiethoadon/showmasp", (req, res, next) => {
  var queryString = `exec showMaSP`
  executeSQL(queryString)
    .then((data) => {
      res.send(data.recordset)
      return next()
    })
    .catch((err) => {
      console.log(err)
    })
})

//Option CTHD_MaHD
app.post("/admin/api/post/quanlychitiethoadon/showmahd", (req, res, next) => {
  var queryString = `exec showMaHD`
  executeSQL(queryString)
    .then((data) => {
      res.send(data.recordset)
      return next()
    })
    .catch((err) => {
      console.log(err)
    })
})

//Option CTHD_MaSize
app.post("/admin/api/post/quanlychitiethoadon/showmasize", (req, res, next) => {
  var queryString = `exec showMaSize`
  executeSQL(queryString)
    .then((data) => {
      res.send(data.recordset)
      return next()
    })
    .catch((err) => {
      console.log(err)
    })
})

// deleteCTHD
app.post("/admin/api/post/quanlychitiethoadon/deletecthd", (req, res, next) => {
  var queryString = `exec deleteCTHD '${req.body.mahd}','${req.body.masp}','${req.body.masize}'`
  executeSQL(queryString)
    .then(() => {
      res.send(["Xóa thành công"])
    })
    .catch((err) => {
      console.log(err)
      res.send(["Xóa thất bại"])
    })
})

// saveCTHD
app.post("/admin/api/post/quanlychitiethoadon/savecthd", (req, res, next) => {
  var queryString = `exec saveCTHD ${req.body.mahd},'${req.body.masp}',${req.body.masize},${req.body.soluong},${req.body.giaban},${req.body.mahd_up},'${req.body.masp_up}',${req.body.masize_up}`
  executeSQL(queryString)
    .then(() => {
      res.send(["Update thành công"])
      return next()
    })
    .catch((err) => {
      console.log(err)
      res.send(["Update thất bại"])
    })
})

//searchCTHD
app.post(
  "/admin/api/post/quanlychitiethoadon/timkiemcthd",
  (req, res, next) => {
    if (req.body.timkiemtheo == "SoLuongTren") {
      var queryString = `Select MaHD, MaSP, MaSize,SoLuong,GiaBan from ChiTietHoaDon
    where SoLuong >= ${req.body.timkiem}`
    } else if (req.body.timkiemtheo == "SoLuongDuoi") {
      var queryString = `Select MaHD, MaSP, MaSize,SoLuong,GiaBan from ChiTietHoaDon
    where SoLuong <= ${req.body.timkiem}`
    } else if (req.body.timkiemtheo == "GiaBanTren") {
      var queryString = `Select MaHD, MaSP, MaSize,SoLuong,GiaBan from ChiTietHoaDon
    where GiaBan >= ${req.body.timkiem}`
    } else if (req.body.timkiemtheo == "GiaBanDuoi") {
      var queryString = `Select MaHD, MaSP, MaSize,SoLuong,GiaBan from ChiTietHoaDon
    where GiaBan <= ${req.body.timkiem}`
    } else {
      var queryString = `Select MaHD, MaSP, MaSize,SoLuong,GiaBan from ChiTietHoaDon
    where ${req.body.timkiemtheo} like N'%${req.body.timkiem}%'`
    }
    executeSQL(queryString)
      .then((data) => {
        res.send(data.recordset)
        return next()
      })
      .catch((err) => {
        console.log(err)
      })
  }
)

//showSize
app.post("/admin/api/post/quanlysize/showsize", (req, res, next) => {
  var queryString = `exec showSize`
  executeSQL(queryString)
    .then((data) => {
      res.send(data.recordset)
      return next()
    })
    .catch((err) => {
      console.log(err)
    })
})
// addMGG
app.post("/admin/api/post/quanlysize/themsize", (req, res, next) => {
  var queryString = `exec addSize N'${req.body.giatri}'`
  executeSQL(queryString)
    .then(() => {
      res.send(["Thêm thành công!"])
      return next()
    })
    .catch((err) => {
      console.log(err)
      res.send(["Mã đã tồn tại!"])
      return next()
    })
})

// saveSize
app.post("/admin/api/post/quanlysize/savesize", (req, res, next) => {
  var queryString = `exec updateSize '${req.body.giatri}', ${req.body.masize}`
  executeSQL(queryString)
    .then(() => {
      res.send(["Update thành công"])
      return next()
    })
    .catch((err) => {
      console.log(err)
      res.send(["Update thất bại"])
    })
})

// deleteSize
app.post("/admin/api/post/quanlysize/deletesize", (req, res) => {
  var queryString = `exec usp_delete_masize '${req.body.masize}'`
  executeSQL(queryString)
    .then(() => {
      res.send(["Xóa thành công"])
    })
    .catch((err) => {
      console.log(err)
      res.send(["Xóa thất bại"])
    })
})

//searchSize
app.post("/admin/api/post/quanlysize/timkiemsize", (req, res, next) => {
  var queryString = `Select MaSize, GiaTri from Size where ${req.body.timkiemtheo} like N'%${req.body.timkiem}%'`
  executeSQL(queryString)
    .then((data) => {
      res.send(data.recordset)
      return next()
    })
    .catch((err) => {
      console.log(err)
    })
})

//showPTTT
app.post("/admin/api/post/quanlyPTTT/showPTTT", (req, res, next) => {
  var queryString = `exec showPTTT`
  executeSQL(queryString)
    .then((data) => {
      res.send(data.recordset)
      return next()
    })
    .catch((err) => {
      console.log(err)
    })
})

//addPTTT
app.post("/admin/api/post/quanlyPTTT/addPTTT", (req, res, next) => {
  var queryString = `exec addPTTT N'${req.body.ten}','${req.body.phi}'`
  executeSQL(queryString)
    .then(() => {
      res.send(["Thêm thành công!"])
      return next()
    })
    .catch((err) => {
      console.log(err)
      res.send(["Mã đã tồn tại!"])
      return next()
    })
})

//savePTTT
app.post("/admin/api/post/quanlyPTTT/savePTTT", (req, res, next) => {
  var queryString = `exec savePTTT N'${req.body.ten}',${req.body.phi},${req.body.mapttt}`
  executeSQL(queryString)
    .then(() => {
      res.send(["Update thành công"])
      return next()
    })
    .catch((err) => {
      console.log(err)
      res.send(["Update thất bại"])
    })
})

//deletePTTT
app.post("/admin/api/post/quanlyPTTT/deletePTTT", (req, res) => {
  var queryString = `exec deletePTTT '${req.body.mapttt}'`
  executeSQL(queryString)
    .then(() => {
      res.send(["Xóa thành công"])
    })
    .catch((err) => {
      console.log(err)
      res.send(["Xóa thất bại"])
    })
})

//searchPTTT
app.post("/admin/api/post/quanlyPTTT/timkiemPTTT", (req, res, next) => {
  var queryString = `Select MaPTTT, Ten, Phi from PhuongThucThanhToan where ${req.body.timkiemtheo} like N'%${req.body.timkiem}%'`
  executeSQL(queryString)
    .then((data) => {
      res.send(data.recordset)
      return next()
    })
    .catch((err) => {
      console.log(err)
    })
})

//showPTVC
app.post("/admin/api/post/quanlyPTVC/showPTVC", (req, res, next) => {
  var queryString = `exec showPTVC`
  executeSQL(queryString)
    .then((data) => {
      res.send(data.recordset)
      return next()
    })
    .catch((err) => {
      console.log(err)
    })
})

//addPTVC
app.post("/admin/api/post/quanlyPTVC/addPTVC", (req, res, next) => {
  var queryString = `exec addPTVC N'${req.body.ten}','${req.body.phi}'`
  executeSQL(queryString)
    .then(() => {
      res.send(["Thêm thành công!"])
      return next()
    })
    .catch((err) => {
      console.log(err)
      res.send(["Mã đã tồn tại!"])
      return next()
    })
})

//savePTVC
app.post("/admin/api/post/quanlyPTVC/savePTVC", (req, res, next) => {
  var queryString = `exec savePTVC N'${req.body.ten}',${req.body.phi},${req.body.maptvc}`
  executeSQL(queryString)
    .then(() => {
      res.send(["Update thành công"])
      return next()
    })
    .catch((err) => {
      console.log(err)
      res.send(["Update thất bại"])
    })
})

//deletePTVC
app.post("/admin/api/post/quanlyPTVC/deletePTVC", (req, res) => {
  var queryString = `exec deletePTVC '${req.body.maptvc}'`
  executeSQL(queryString)
    .then(() => {
      res.send(["Xóa thành công"])
    })
    .catch((err) => {
      console.log(err)
      res.send(["Xóa thất bại"])
    })
})

//searchPTVC
app.post("/admin/api/post/quanlyPTVC/timkiemPTVC", (req, res, next) => {
  var queryString = `Select MaPTVC, Ten, Phi from PhuongThucVanChuyen where ${req.body.timkiemtheo} like N'%${req.body.timkiem}%'`
  executeSQL(queryString)
    .then((data) => {
      res.send(data.recordset)
      return next()
    })
    .catch((err) => {
      console.log(err)
    })
})

//ThongKeHienTai
app.post("/admin/api/post/thongke/showthongkehientai", (req, res, next) => {
  var queryString = `exec Thongkehientai`
  executeSQL(queryString)
    .then((data) => {
      res.send(data.recordset)
      return next()
    })
    .catch((err) => {
      console.log(err)
    })
})

// Thongketheonam
app.post("/admin/api/post/thongke/showthongketheonam", (req, res, next) => {
  var queryString = `exec Thongketheonam ${req.body.nam}`
  executeSQL(queryString)
    .then((data) => {
      res.send(data.recordset)
      return next()
    })
    .catch((err) => {
      console.log(err)
    })
})

// ThongkeTongCongTheoNam
app.post("/admin/api/post/thongke/showtongtheonam", (req, res, next) => {
  var queryString = `exec TongDoanhThuMoiNam ${req.body.nam}`
  executeSQL(queryString)
    .then((data) => {
      res.send(data.recordset)
      return next()
    })
    .catch((err) => {
      console.log(err)
    })
})

//SelectNam
app.post("/admin/api/post/thongke/showNam", (req, res, next) => {
  var queryString = `exec selectNam`
  executeSQL(queryString)
    .then((data) => {
      res.send(data.recordset)
      return next()
    })
    .catch((err) => {
      console.log(err)
    })
})

// select_hoadon_tongsoluong_tuoi
app.post("/admin/api/post/thongke/showtile", (req, res, next) => {
  var queryString = `exec usp_select_hoadon_tongsoluong_tuoi`
  executeSQL(queryString)
    .then((data) => {
      res.send(data.recordset)
      return next()
    })
    .catch((err) => {
      console.log(err)
    })
})

// show sản phẩm
app.post("/admin/api/post/quanlysanpham/showsp", (req, res, next) => {
  if (req.body.showtheo == "Giay") {
    var queryString = `exec showGiay`
  } else if (req.body.showtheo == "PhuTrang") {
    var queryString = `exec showPT`
  }
  executeSQL(queryString)
    .then((data) => {
      res.send(data.recordset)
      return next()
    })
    .catch((err) => {
      console.log(err)
    })
})
// option showNH
app.post("/admin/api/post/quanlysanpham/shownh", (req, res, next) => {
  var queryString = `exec showNH`
  executeSQL(queryString)
    .then((data) => {
      res.send(data.recordset)
      return next()
    })
    .catch((err) => {
      console.log(err)
    })
})

// option showLPT
app.post("/admin/api/post/quanlysanpham/showlpt", (req, res, next) => {
  var queryString = `exec showLPT`
  executeSQL(queryString)
    .then((data) => {
      res.send(data.recordset)
      return next()
    })
    .catch((err) => {
      console.log(err)
    })
})

// option get MaSP by NH
app.post("/admin/api/post/quanlysanpham/getmasp", (req, res, next) => {
  var queryString = `exec showMaSPByNH ${req.body.manh}`
  executeSQL(queryString)
    .then((data) => {
      res.send([data.recordset[0].MaSP])
      return next()
    })
    .catch((err) => {
      console.log(err)
    })
})

// option get MaSP by NH
app.post("/admin/api/post/quanlysanpham/showmadm", (req, res, next) => {
  var queryString = `exec showMaDMByNH ${req.body.manh}`
  executeSQL(queryString)
    .then((data) => {
      res.send(data.recordset)
      return next()
    })
    .catch((err) => {
      console.log(err)
    })
})

// saveSP -  size
app.post("/admin/api/post/quanlyspsize/suaspsize", (req, res, next) => {
  var queryString = `exec usp_update_sp_size '${req.body.masp}',${req.body.masize}, ${req.body.soluong}`
  executeSQL(queryString)
    .then((data) => {
      res.send(["Sửa thành công!"])
      return next()
    })
    .catch((err) => {
      res.send(["Sửa thất bại!"])
      console.log(err)
    })
})
// add Sản phẩm giày
app.post("/admin/api/post/quanlysanpham/themgiay", (req, res, next) => {
  var queryString = `exec addGiay ${req.body.madm}, '${req.body.masp}', '${req.body.tensp}', ${req.body.giasp}, ${req.body.km}, '${req.body.trangthai}', '${req.body.c1_h1}'`
  console.log(queryString)
  executeSQL(queryString)
    .then(() => {
      res.send(["Thêm thành công!"])
      return next()
    })
    .catch((err) => {
      console.log(err)
      res.send(["Mã đã tồn tại!"])
      return next()
    })
})

// add Sản phẩm phụ trang
app.post("/admin/api/post/quanlysanpham/thempt", (req, res, next) => {
  var queryString = `exec addPT ${req.body.madm}, '${req.body.masp}',  ${req.body.malpt},'${req.body.tensp}', ${req.body.giasp}, ${req.body.km}, '${req.body.trangthai}', '${req.body.c1_h1}'`
  executeSQL(queryString)
    .then(() => {
      res.send(["Thêm thành công!"])
      return next()
    })
    .catch((err) => {
      console.log(err)
      res.send(["Mã đã tồn tại!"])
      return next()
    })
})

// SET STORAGE
const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    fs.mkdirSync(
      `../outsideAssets/products/${file.originalname.split("-")[0]}`,
      {
        recursive: true,
      }
    )
    callBack(
      null,
      `../outsideAssets/products/${file.originalname.split("-")[0]}`
    )
  },
  filename: (req, file, callBack) => {
    callBack(null, `${file.originalname.split("-")[1]}`)
  },
})

var upload = multer({ storage: storage })

// upload hình
app.post(
  "/admin/api/post/quanlysanpham/themanh",
  upload.single("file"),
  (req, res, next) => {
    const file = req.file
    if (!file) {
      res.send({ Success: false })
      return next()
    }
    res.send({ Success: true })
    return next()
  }
)

// add Sản phẩm phụ trang
app.post("/admin/api/post/quanlysanpham/suaanh", (req, res, next) => {
  var queryString = `exec AnhSP ${req.body.table}, ${req.body.filename},  '${req.body.link}','${req.body.masp}'`
  executeSQL(queryString)
    .then(() => {
      res.send(["Sửa thành công!"])
      return next()
    })
    .catch((err) => {
      console.log(err)
      res.send(["Sửa thất bại!"])
      return next()
    })
})
// sửa chi tiết sản phẩm giày
app.post("/admin/api/post/quanlysanpham/suactgiay", (req, res, next) => {
  var queryString = `exec up_CTGiay N'${req.body.masp}',N'${req.body.gthieu}',N'${req.body.dsp}',N'${req.body.bst}',N'${req.body.nsx}',
  N'${req.body.cdbh}',N'${req.body.chpp}',N'${req.body.pktk}',N'${req.body.cdvc}',N'${req.body.ctvc}',N'${req.body.gtinh}',N'${req.body.clieu}',N'${req.body.ms}',
  N'${req.body.tnsp}',N'${req.body.pt}',N'${req.body.ll}',N'${req.body.dg}' `
  executeSQL(queryString)
    .then(() => {
      res.send(["Sửa thành công!"])
      return next()
    })
    .catch((err) => {
      console.log(err)
      res.send(["Sửa thất bại!"])
      return next()
    })
})

// sửa sản phẩm giày
app.post("/admin/api/post/quanlysanpham/suagiay", (req, res, next) => {
  var queryString = `exec up_Giay N'${req.body.masp}',N'${req.body.masptam}',${req.body.madm},N'${req.body.tensp}',${req.body.gia},
  ${req.body.km}, '${req.body.trangthai}'`
  executeSQL(queryString)
    .then(() => {
      res.send(["Sửa thành công!"])
      return next()
    })
    .catch((err) => {
      console.log(err)
      res.send(["Sửa thất bại!"])
      return next()
    })
})
// sửa chi tiết sản phẩm pt
app.post("/admin/api/post/quanlysanpham/suactpt", (req, res, next) => {
  var queryString = `exec up_CTPT N'${req.body.masp}',N'${req.body.gthieu}',N'${req.body.dsp}',N'${req.body.bst}',N'${req.body.nsx}',
  N'${req.body.cdbh}',N'${req.body.chpp}',N'${req.body.pktk}',N'${req.body.cdvc}',N'${req.body.ctvc}',N'${req.body.gtinh}',N'${req.body.ms}',
  N'${req.body.tnsp}',N'${req.body.ktsp}' `
  console.log(queryString)
  executeSQL(queryString)
    .then(() => {
      res.send(["Sửa thành công!"])
      return next()
    })
    .catch((err) => {
      console.log(err)
      res.send(["Sửa thất bại!"])
      return next()
    })
})

// sửa sản phẩm pt
app.post("/admin/api/post/quanlysanpham/suapt", (req, res, next) => {
  var queryString = `exec up_PT N'${req.body.masp}',N'${req.body.masptam}',${req.body.malpt},${req.body.madm},N'${req.body.tensp}',${req.body.gia},
  ${req.body.km}, '${req.body.trangthai}'`
  executeSQL(queryString)
    .then(() => {
      res.send(["Sửa thành công!"])
      return next()
    })
    .catch((err) => {
      console.log(err)
      res.send(["Sửa thất bại!"])
      return next()
    })
})
// xóa sản phẩm
app.post("/admin/api/post/quanlysanpham/deletesp", (req, res, next) => {
  var queryString = `exec usp_delete_sp N'${req.body.masp}'`
  executeSQL(queryString)
    .then(() => {
      res.send(["Xóa thành công!"])
      return next()
    })
    .catch((err) => {
      console.log(err)
      res.send(["Xóa thất bại!"])
      return next()
    })
})
// tìm kiếm giày
app.post("/admin/api/post/quanlysanpham/timkiemgiay", (req, res, next) => {
  var queryString = `exec up_TimKiemGiay N'${req.body.timkiem}','${req.body.timkiemtheo}'`
  executeSQL(queryString)
    .then((data) => {
      res.send(data.recordset)
      return next()
    })
    .catch((err) => {
      console.log(err)
    })
})

// tìm kiếm pt
app.post("/admin/api/post/quanlysanpham/timkiempt", (req, res, next) => {
  var queryString = `exec up_TimKiemPT N'${req.body.timkiem}','${req.body.timkiemtheo}'`
  executeSQL(queryString)
    .then((data) => {
      res.send(data.recordset)
      return next()
    })
    .catch((err) => {
      console.log(err)
    })
})

//showSPSize
app.post("/admin/api/post/quanlyspsize/showspsize", (req, res, next) => {
  var queryString = `exec showSPSize '${req.body.timkiem}'`
  executeSQL(queryString)
    .then((data) => {
      res.send(data.recordset)
      return next()
    })
    .catch((err) => {
      console.log(err)
    })
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////////// CLIENT
////////////////////////////////////////////////////////////////////////////////////////////////////////////////// CLIENT
////////////////////////////////////////////////////////////////////////////////////////////////////////////////// CLIENT
////////////////////////////////////////////////////////////////////////////////////////////////////////////////// CLIENT
////////////////////////////////////////////////////////////////////////////////////////////////////////////////// CLIENT
////////////////////////////////////////////////////////////////////////////////////////////////////////////////// CLIENT
////////////////////////////////////////////////////////////////////////////////////////////////////////////////// CLIENT
////////////////////////////////////////////////////////////////////////////////////////////////////////////////// CLIENT
////////////////////////////////////////////////////////////////////////////////////////////////////////////////// CLIENT
////////////////////////////////////////////////////////////////////////////////////////////////////////////////// CLIENT

app.post("/api/post/menu/categories", (req, res, next) => {
  var queryString = "exec usp_select_menu_categories"
  executeSQL(queryString)
    .then((data) => {
      res.send(data.recordset || [])
      return next()
    })
    .catch((err) => {
      console.log(err)
    })
})
app.post("/api/post/menu/accessories", (req, res, next) => {
  var queryString = "exec usp_select_menu_accessories "
  executeSQL(queryString)
    .then((data) => {
      res.send(data.recordset || [])
      return next()
    })
    .catch((err) => {
      console.log(err)
    })
})

app.post("/api/post/products", (req, res, next) => {
  var queryString = `exec usp_select_products '${req.body.tennh}', '${req.body.tendm}', ${req.body.min} , ${req.body.max}`
  executeSQL(queryString)
    .then((data) => {
      res.send(data.recordset || [])
      return next()
    })
    .catch((err) => {
      console.log(err)
    })
})
app.post("/api/post/danhmuc/mota", (req, res, next) => {
  DocFile(
    __dirname.replace("Nodejs", "Drake") +
      `/src/assets/pages/product-page/description/${req.body.tennh.toLowerCase()}/${req.body.tendm.toLowerCase()}/${
        req.body.tennh
      }-${req.body.tendm}.html`
  )
    .then((data) => {
      res.send([data])
      return next()
    })
    .catch((err) => {
      res.send("")
    })
})
app.post("/api/post/search/sp", (req, res, next) => {
  var queryString = `exec usp_search_products '${req.body.timkiem}', ${req.body.min} , ${req.body.max}`
  executeSQL(queryString)
    .then((products) => {
      res.send(products.recordset || [])
      return next()
    })
    .catch((err) => {
      console.log(err)
    })
})
app.post("/api/post/product/detail", (req, res, next) => {
  var queryString = `exec usp_select_chitietsanpham '${req.body.masp}'`
  executeSQL(queryString)
    .then((data) => {
      res.send(data.recordset[0] || {})
      return next()
    })
    .catch((err) => {
      console.log(err)
    })
})
app.post("/api/post/product/size", (req, res, next) => {
  var queryString = `exec usp_select_product_size '${req.body.masp}'`
  executeSQL(queryString)
    .then((data) => {
      res.send(data.recordset || [])
      return next()
    })
    .catch((err) => {
      console.log(err)
    })
})
app.post("/api/post/related/products", (req, res, next) => {
  var queryString = `exec usp_select_related_products '${req.body.masp}',${req.body.min},${req.body.max}`
  executeSQL(queryString)
    .then((data) => {
      res.send(data.recordset || [])
      return next()
    })
    .catch((err) => {
      console.log(err)
    })
})
app.post("/api/post/login/kh", (req, res, next) => {
  var queryString = `exec usp_login_khachhang '${req.body.email}', '${req.body.password}'`
  executeSQL(queryString)
    .then((userInfo) => {
      //
      userInfo.recordset[0].NgaySinh =
        userInfo.recordset[0].NgaySinh.toISOString().replace("Z", "")
      //
      res.send(userInfo.recordset[0] || {})
      return next()
    })
    .catch((err) => {
      console.log(err)
      res.send({})
    })
})

app.post("/api/post/update/mk/kh", (req, res, next) => {
  var queryString =
    "exec usp_update_password_khachhang " +
    `${req.body.MaKH},` +
    `'${req.body.newpassword}',` +
    `'${req.body.oldpassword}'`
  executeSQL(queryString)
    .then(() => {
      res.send({ Success: true })
      return next()
    })
    .catch((err) => {
      console.log(err)
      res.send({ Success: false })
      return next()
    })
})

app.post("/api/post/update/kh", (req, res, next) => {
  var queryString =
    "exec usp_update_khachhang " +
    `${req.body.MaKH},` +
    `N'${req.body.Ho}',` +
    `N'${req.body.Ten}',` +
    `${req.body.GioiTinh},` +
    `'${req.body.NgaySinh}',` +
    `'${req.body.Sdt}',` +
    `N'${req.body.DiaChiChinh}',` +
    `N'${req.body.TinhThanh}',` +
    `N'${req.body.QuanHuyen}',` +
    `'${req.body.Email}'`
  executeSQL(queryString)
    .then(() => {
      res.send({ Success: true })
      return next()
    })
    .catch((err) => {
      console.log(err)
      res.send({ Success: false })
      return next()
    })
})
app.post("/api/post/register/kh", (req, res, next) => {
  var queryString =
    "exec usp_insert_khachhang " +
    `N'${req.body.Ho}',` +
    `N'${req.body.Ten}',` +
    `${req.body.GioiTinh},` +
    `'${req.body.NgaySinh}',` +
    `'${req.body.Sdt}',` +
    `N'${req.body.DiaChiChinh}',` +
    `N'${req.body.TinhThanh}',` +
    `N'${req.body.QuanHuyen}',` +
    `'${req.body.Email}',` +
    `'${req.body.Password}'`
  console.log(queryString)
  executeSQL(queryString)
    .then(() => {
      res.send({ Success: true })
      return next()
    })
    .catch((err) => {
      console.log(err)
      res.send({ Success: false })
      return next()
    })
})
app.post("/api/post/select/wishlist", (req, res, next) => {
  var queryString = `exec usp_select_wishlist ${req.body.makh}`
  executeSQL(queryString)
    .then((wishlist) => {
      res.send(wishlist.recordset || [])
      return next()
    })
    .catch((err) => {
      console.log(err)
    })
})
app.post("/api/post/insert/wishlist", (req, res, next) => {
  var queryString = `exec usp_insert_wishlist ${req.body.makh},'${req.body.masp}'`
  executeSQL(queryString)
    .then(() => {
      res.send({ Success: true })
      return next()
    })
    .catch((err) => {
      console.log(err)
      res.send({ Success: false })
      return next()
    })
})
app.post("/api/post/delete/wishlist", (req, res, next) => {
  var queryString = `exec usp_delete_wishlist ${req.body.makh},'${req.body.masp}'`
  executeSQL(queryString)
    .then(() => {
      res.send({ Success: true })
      return next()
    })
    .catch((err) => {
      console.log(err)
      res.send({ Success: false })
      return next()
    })
})

app.post("/api/post/select/shopcart", (req, res, next) => {
  var queryString = `exec usp_select_shopcart ${req.body.makh}`
  executeSQL(queryString)
    .then((shopcart) => {
      res.send(shopcart.recordset || [])
      return next()
    })
    .catch((err) => {
      console.log(err)
    })
})
app.post("/api/post/insert/shopcart", (req, res, next) => {
  var queryString = `exec usp_insert_shopcart ${req.body.makh},'${req.body.masp}',${req.body.masize},${req.body.soluong}`
  executeSQL(queryString)
    .then(() => {
      res.send({ Success: true })
      return next()
    })
    .catch((err) => {
      console.log(err)
      res.send({ Success: false })
      return next()
    })
})
app.post("/api/post/update/shopcart", (req, res, next) => {
  var queryString = `exec usp_update_shopcart ${req.body.makh},'${req.body.masp}',${req.body.masize},${req.body.soluong}`
  executeSQL(queryString)
    .then(() => {
      res.send({ Success: true })
      return next()
    })
    .catch((err) => {
      console.log(err)
      res.send({ Success: false })
      return next()
    })
})
app.post("/api/post/delete/shopcart", (req, res, next) => {
  var queryString = `exec usp_delete_shopcart ${req.body.makh},'${req.body.masp}',${req.body.masize}`
  executeSQL(queryString)
    .then(() => {
      res.send({ Success: true })
      return next()
    })
    .catch((err) => {
      console.log(err)
      res.send({ Success: false })
      return next()
    })
})

app.post("/api/post/select/hoadon", (req, res, next) => {
  var queryString = `exec usp_select_hoadon ${req.body.makh}`
  executeSQL(queryString)
    .then((hoadon) => {
      //
      hoadon.recordset.forEach((element) => {
        element.Ngaymua =
          element.Ngaymua?.toISOString().replace("Z", "") || null
        element.Ngaynhanhang =
          element.Ngaynhanhang?.toISOString().replace("Z", "") || null
      })
      //
      res.send(hoadon.recordset || [])
      return next()
    })
    .catch((err) => {
      console.log(err)
    })
})

app.post("/api/post/select/khmgg", (req, res, next) => {
  var queryString = `exec usp_select_khmgg ${req.body.makh}`
  executeSQL(queryString)
    .then((khmgg) => {
      //
      khmgg.recordset.forEach((element) => {
        element.HanSuDung =
          element.HanSuDung?.toISOString().replace("Z", "") || null
      })
      //
      res.send(khmgg.recordset || [])
      return next()
    })
    .catch((err) => {
      console.log(err)
    })
})

app.post("/api/post/select/pttt", (req, res, next) => {
  var queryString = `exec usp_select_pttt`
  executeSQL(queryString)
    .then((pttt) => {
      res.send(pttt.recordset || [])
      return next()
    })
    .catch((err) => {
      console.log(err)
    })
})
app.post("/api/post/select/ptvc", (req, res, next) => {
  var queryString = `exec usp_select_ptvc`
  executeSQL(queryString)
    .then((ptvc) => {
      res.send(ptvc.recordset || [])
      return next()
    })
    .catch((err) => {
      console.log(err)
    })
})
app.post("/api/post/thanhtoan/hoadon", (req, res, next) => {
  var queryString =
    `declare @mahd int\n` +
    `exec @mahd = usp_thanhtoan_hoadon ${req.body.ThongTinThanhToan.MaKH},` +
    ` ${req.body.ThongTinThanhToan.HoaDon.MaGiamGia},` +
    ` ${req.body.ThongTinThanhToan.HoaDon.MaPTTT},` +
    ` ${req.body.ThongTinThanhToan.HoaDon.MaPTVC},` +
    ` N'${req.body.ThongTinThanhToan.HoaDon.TrangThai}',` +
    ` N'${req.body.ThongTinThanhToan.HoaDon.GhiChu}',` +
    ` '${req.body.ThongTinThanhToan.HoaDon.NgayMua}',` +
    ` '${req.body.ThongTinThanhToan.HoaDon.NgayNhanHang}',` +
    ` ${req.body.ThongTinThanhToan.HoaDon.TongTien}\n`

  queryString +=
    JSON.parse(req.body.ThongTinThanhToan.ChiTietHoaDon).reduce(
      (accumulator, ele, index, array) => {
        return (
          accumulator +
          `exec usp_thanhtoan_hdct @mahd,${req.body.ThongTinThanhToan.MaKH},'${ele.MaSP}', ${ele.MaSize}, ${ele.SoLuong}, ${ele.GiaBan}\n`
        )
      },
      ""
    ) || `exec usp_thanhtoan_hdct @mahd,0,'0',0,0,0\n`
  executeSQL(queryString)
    .then(() => {
      res.send({ Success: true })
      return next()
    })
    .catch((err) => {
      console.log(err)
      res.send({ Success: false })
      return next()
    })
})

app.get("/test", (req, res, next) => {
  executeSQL("select cast(0 as bit) isChecked")
    .then((data) => {
      res.send(data.recordset)
      return next()
    })
    .catch((err) => {
      console.log(err)
      res.send({ Success: false })
      return next()
    })
})
