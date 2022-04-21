import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as AOS from 'aos';
@Component({
  selector: 'shop-info-page',
  templateUrl: 'shop-info-page.component.html',
  styleUrls: ['shop-info-page.component.scss'],
})
export class ShopInfoPage implements OnInit {
  constructor(private modalService: NgbModal) {
    AOS.init({
      once: true,
      offset: 50,
      duration: 1500,
    });
  }
  ngOnInit() {}
  closeModal: string | undefined;

  triggerModal(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (res) => {
          this.closeModal = `Closed with: ${res}`;
        },
        (res) => {
          this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
