import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  iProductDetail,
  iProductSize,
} from 'src/app/Interfaces/product-interface/product-interface';
import { DatabaseService } from 'src/app/Services/database.module';
import { ModalService } from 'src/app/Services/modal-service.module';
import { UserService } from 'src/app/Services/user.module';

@Component({
  selector: 'detail1',
  templateUrl: 'detail1.component.html',
  styleUrls: ['detail1.component.scss'],
})
export class Detail1Component implements OnInit, OnChanges {
  carousel_01_config_1S = {
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    cssEase: 'linear',
    fade: true,
    autoplay: true,
    draggable: true,
    asNavFor: '.carousel_01_3S',
    nextArrow:
      '<i class="fas fa-angle-right" style="position: absolute; top: 50%; transform: translateY(-50%); right: -5%; color: #999999;font-size:1.75rem"></i>',
    prevArrow:
      '<i class="fas fa-angle-left" style="position: absolute; top: 50%; transform: translateY(-50%); left: -5%; color: #999999;font-size:1.75rem"></i>',
  };
  carousel_01_config_3S = {
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    cssEase: 'linear',
    autoplay: true,
    centerMode: true,
    centerPadding: '0px',
    draggable: false,
    asNavFor: '.carousel_01_1S',
    nextArrow:
      '<i class="fas fa-angle-right" style="position: absolute; top: 50%; transform: translateY(-50%); right: -7.5%; color: #999999;font-size:1.75rem"></i>',
    prevArrow:
      '<i class="fas fa-angle-left" style="position: absolute; top: 50%; transform: translateY(-50%); left: -7.5%; color: #999999;font-size:1.75rem"></i>',
  };

  carousel_02_config = {
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    cssEase: 'linear',
    infinite: false,
    swipeToSlide: true,
    touchThreshold: 100,
    nextArrow:
      '<i class="fas fa-angle-right" style="position: absolute; top: 50%; transform: translateY(-50%); right: -4%; color: #999999;font-size:1.75rem"></i>',
    prevArrow:
      '<i class="fas fa-angle-left" style="position: absolute; top: 50%; transform: translateY(-50%); left: -4%; color: #999999;font-size:1.75rem"></i>',
  };

  carousel_01_slides: string[] = [];
  carousel_02_slides: string[] = [];
  @Input() ProductDetail = <iProductDetail>{};
  @Input() ProductSize: iProductSize[] = [];

  @ViewChild('ModalOpenButton') ModalOpenButton = <
    ElementRef<HTMLButtonElement>
  >{};
  @ViewChild('ModalImg') ModalImg = <ElementRef<HTMLInputElement>>{};
  @ViewChild('ModalCaption') ModalCaption = <ElementRef<HTMLDivElement>>{};

  InsertIntoShopCart: Function = () => {};
  InsertIntoWishlist: Function = () => {};
  constructor(
    private user_service: UserService,
    private modal_service: ModalService,
    private database_service: DatabaseService
  ) {}

  ngOnInit() {
    this.user_service.MaKH$.subscribe((makh) => {
      if (makh) {
        this.InsertIntoShopCart = (
          sizeindex: number,
          soluong: HTMLInputElement
        ) => {
          if (sizeindex >= 0) {
            if (
              this.ProductSize[sizeindex].SoLuong >= parseInt(soluong.value)
            ) {
              this.database_service
                .POST_Insert_Shopcart(
                  makh,
                  this.ProductDetail.MaSP,
                  this.ProductSize[sizeindex].MaSize,
                  soluong.value
                )
                .subscribe((ketqua) => {
                  if (ketqua.Success) {
                    this.user_service.Insert_Shopcart([
                      {
                        MaSP: this.ProductDetail.MaSP,
                        Ten: this.ProductDetail.Ten!,
                        Hinh: this.ProductDetail.c1_h1!,
                        Gia: this.ProductDetail.Gia!,
                        Km: this.ProductDetail.Km!,
                        DongSanPham: this.ProductDetail.DongSanPham!,
                        MaSize: this.ProductSize[sizeindex].MaSize,
                        GiaTriSize: this.ProductSize[sizeindex].GiaTriSize,
                        SoLuong: parseInt(soluong.value),
                        isChecked: false,
                      },
                    ]);
                    this.ProductSize[sizeindex].SoLuong -= parseInt(
                      soluong.value
                    );
                    this.modal_service.open('product-detail-page-modal1');
                  } else {
                    this.modal_service.open('product-detail-page-modal2');
                  }
                });
            } else {
              this.modal_service.open('product-detail-page-modal4');
            }
          } else {
            this.modal_service.open('product-detail-page-modal3');
          }
        };

        this.InsertIntoWishlist = () => {
          this.database_service
            .POST_Insert_Wishlist(makh, this.ProductDetail.MaSP)
            .subscribe((ketqua) => {
              if (ketqua.Success) {
                this.user_service.Insert_Wishlist([
                  {
                    MaSP: this.ProductDetail.MaSP,
                    Hinh: this.ProductDetail.c1_h1!,
                    Ten: this.ProductDetail.Ten!,
                    DongSanPham: this.ProductDetail.DongSanPham!,
                    TinhTrang: this.ProductDetail.TinhTrang!,
                    Gia: this.ProductDetail.Gia!,
                    Km: this.ProductDetail.Km!,
                  },
                ]);
                this.modal_service.open('product-detail-page-modal5');
              } else {
                this.modal_service.open('product-detail-page-modal6');
              }
            });
        };
      }
    });
  }
  ngOnChanges() {
    Object.keys(this.ProductDetail).forEach((key) => {
      if (
        key === 'c1_h1' ||
        key === 'c1_h2' ||
        key === 'c1_h3' ||
        key === 'c1_h4' ||
        key === 'c1_h5'
      ) {
        if (this.ProductDetail[key])
          this.carousel_01_slides.push(this.ProductDetail[key]!);
      } else if (
        key === 'c2_h1' ||
        key === 'c2_h2' ||
        key === 'c2_h3' ||
        key === 'c2_h4' ||
        key === 'c2_h5'
      ) {
        if (this.ProductDetail[key])
          this.carousel_02_slides.push(this.ProductDetail[key]!);
      }
    });
  }

  OpenImgModal(imgsrc: string) {
    this.ModalCaption.nativeElement.innerHTML = this.ProductDetail.Ten || '';
    this.ModalImg.nativeElement.src = imgsrc;
    this.ModalOpenButton.nativeElement.click();
  }
}
