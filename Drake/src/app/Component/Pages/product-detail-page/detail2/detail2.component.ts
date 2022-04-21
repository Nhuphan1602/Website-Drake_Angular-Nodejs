import { Component, Input, OnInit } from '@angular/core';
import { iProductDetail } from 'src/app/Interfaces/product-interface/product-interface';

@Component({
  selector: 'detail2',
  templateUrl: 'detail2.component.html',
  styleUrls: ['detail2.component.scss'],
})
export class Detail2Component implements OnInit {
  @Input() ProductDetail = <iProductDetail>{};
  constructor() {}
  ngOnInit() {}
}
