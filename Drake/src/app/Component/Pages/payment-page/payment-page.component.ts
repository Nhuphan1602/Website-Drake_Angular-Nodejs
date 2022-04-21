import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
  iMaGiamGia,
  iPTTT,
  iPTVC,
  iShopCartItem,
  iThongTinThanhToan,
  iUser,
} from 'src/app/Interfaces/user-interface/user-interface';
import { AlertService } from 'src/app/Services/alert-service.module';
import { DatabaseService } from 'src/app/Services/database.module';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { ModalService } from 'src/app/Services/modal-service.module';
import { UserService } from 'src/app/Services/user.module';
import { UtilityService } from 'src/app/Services/utility.module';

@Component({
  selector: 'payment-page',
  templateUrl: 'payment-page.component.html',
  styleUrls: ['payment-page.component.scss', '../../../Scss/mytable.scss'],
})
export class PaymentPageComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject();
  //
  User = <iUser>{};
  ShopCartItems: iShopCartItem[] = [];
  MaGiamGiaItems: iMaGiamGia[] = [];
  PtttItems: iPTTT[] = [];
  PtvcItems: iPTVC[] = [];
  //
  ThanhTien = 0;
  PhiGiaoDich = 0;
  PhiShip = 0;
  Voucher = 0;
  TongCong = 0;
  //
  TenMgg_NgModel = '';
  MggSelected = false;
  TenMgg = '';
  IdMgg = '0';
  //
  GhiChu_NgModel = '';
  //
  i = 0;
  iAgreed = true;
  constructor(
    private user_service: UserService,
    private alert_service: AlertService,
    private modal_service: ModalService,
    private utility_service: UtilityService,
    private database_service: DatabaseService,
    private local_storage_service: LocalStorageService
  ) {}
  ngOnInit() {
    this.user_service.UserExistence$.pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe((bool) => {
      if (bool) {
        //
        this.User = this.local_storage_service.get<iUser>('user');

        this.ShopCartItems =
          this.local_storage_service.get<iShopCartItem[]>('SCItems');

        if (this.ShopCartItems && this.ShopCartItems.length > 0) {
          this.ThanhTien = this.ShopCartItems.reduce((accumulator, ele) => {
            return accumulator + ele.Gia * (1 - ele.Km) * ele.SoLuong;
          }, 0);
          this.TinhTongCong();

          this.database_service
            .POST_Select_Khmgg(this.User.MaKH)
            .subscribe((khmgg) => {
              this.MaGiamGiaItems = khmgg;
            });

          this.database_service.POST_Select_Pttt().subscribe((pttt) => {
            this.PtttItems = pttt;
            this.PhiGiaoDich = pttt[0].Phi;
            this.TinhTongCong();
          });

          this.database_service.POST_Select_Ptvc().subscribe((ptvc) => {
            this.PtvcItems = ptvc;
            this.PhiShip = ptvc[0].Phi;
            this.TinhTongCong();
          });
        } else {
          this.utility_service.ToHome();
        }
      } else {
        this.utility_service.ToHome();
      }
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
    this.local_storage_service.remove('SCItems');
  }
  PtvcRadioOnChange(phi: number) {
    this.PhiShip = phi;
    this.TinhTongCong();
  }
  PtttRadioOnChange(phi: number) {
    this.PhiGiaoDich = phi;
    this.TinhTongCong();
  }
  TinhTongCong() {
    this.TongCong =
      this.ThanhTien + this.PhiGiaoDich + this.PhiShip - this.Voucher;
  }
  ThemMaGiamGia() {
    //Nếu đã có ròi thì kh tạo nữa
    if (!this.MggSelected) {
      let MaGiamGia = this.MaGiamGiaItems.find((ele, index, array) => {
        return ele.Ten === this.TenMgg_NgModel;
      });
      //Mã giảm giá có tồn tại và đạt điều kiện
      if (
        MaGiamGia &&
        MaGiamGia.SoLanSuDung >= 1 &&
        this.ThanhTien > MaGiamGia.DieuKien &&
        new Date(MaGiamGia.HanSuDung).valueOf() - Date.now() >= 0
      ) {
        this.MggSelected = true;
        this.IdMgg = MaGiamGia.Id;
        this.TenMgg = this.TenMgg_NgModel;
        this.Voucher = MaGiamGia.GiaTri * this.ThanhTien;
        this.TinhTongCong();
        this.alert_service.open('payment-page-alert3');
      } else {
        this.alert_service.open('payment-page-alert1');
      }
    } else {
      this.alert_service.open('payment-page-alert2');
    }

    this.TenMgg_NgModel = '';
  }
  XoaMaGiamGia() {
    this.MggSelected = false;
    this.IdMgg = '0';
    this.TenMgg = '';
    this.Voucher = 0;
    this.TinhTongCong();
  }
  ThanhToan() {
    let ThongTinThanhToan: iThongTinThanhToan = {
      MaKH: this.User.MaKH,
      HoaDon: {
        MaGiamGia: this.MggSelected ? this.IdMgg : '0',
        MaPTTT: (<HTMLInputElement>(
          document.querySelector('input[name="pttt"]:checked')
        )).id,
        MaPTVC: (<HTMLInputElement>(
          document.querySelector('input[name="ptvc"]:checked')
        )).id,
        TrangThai: 'Đang xử lí',
        GhiChu: this.GhiChu_NgModel,
        NgayMua: this.utility_service.Datetime_Sql(new Date()),
        NgayNhanHang: '',
        TongTien: this.TongCong,
      },
      ChiTietHoaDon: JSON.stringify(
        this.ShopCartItems.map((ele, index, array) => {
          return {
            MaSP: ele.MaSP,
            MaSize: ele.MaSize,
            SoLuong: ele.SoLuong,
            GiaBan: Math.round(ele.Gia * (1 - ele.Km) * ele.SoLuong),
          };
        })
      ),
    };
    this.database_service
      .POST_ThanhToan_HoaDon(ThongTinThanhToan)
      .subscribe((ketqua) => {
        if (ketqua.Success) {
          this.user_service.Remove_ShopCart(
            this.ShopCartItems.reduce((accumulator: string[], ele) => {
              accumulator.push(ele.MaSP);
              return accumulator;
            }, [])
          );
          this.modal_service.open('payment-page-modal-1');
        } else {
          this.modal_service.open('payment-page-modal-2');
        }
      });
  }
  Modal1Closed() {
    this.utility_service.ToInvoicePage();
  }
}
