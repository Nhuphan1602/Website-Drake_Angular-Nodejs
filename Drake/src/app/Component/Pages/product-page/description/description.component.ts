import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  OnChanges,
} from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'product-page-description',
  templateUrl: 'description.component.html',
  styleUrls: ['description.component.css'],
})
export class DescriptionComponent implements OnInit, OnChanges {
  @Input() HtmlContent: SafeHtml = {};
  @ViewChild('Content') Content = <ElementRef<HTMLDivElement>>{};
  @ViewChild('ContentWrap') ContentWrap = <ElementRef<HTMLDivElement>>{};
  @ViewChild('ContentBody') ContentBody = <ElementRef<HTMLDivElement>>{};
  @ViewChild('ButtonContainer') ButtonContainer = <
    ElementRef<HTMLDivElement>
  >{};
  @ViewChild('WrapUnwrapContentButtonIcon') WrapUnwrapContentButtonIcon = <
    ElementRef<HTMLElement>
  >{};
  constructor() {}
  ngOnInit() {}

  ngOnChanges() {
    setTimeout(() => {
      if (
        (this.ContentBody?.nativeElement?.getBoundingClientRect().height ||
          0) <= 300
      ) {
        this.Content.nativeElement.classList.remove('h-300');
        this.Content.nativeElement.classList.add('h-auto');
        this.ContentWrap.nativeElement.classList.remove('content-wrap');
        this.ButtonContainer.nativeElement.classList.add('hidden');
      } else {
        this.Content.nativeElement.classList.remove('h-auto');
        this.Content.nativeElement.classList.add('h-300');
        this.ContentWrap.nativeElement.classList.add('content-wrap');
        this.ButtonContainer.nativeElement.classList.remove('hidden');
        this.WrapUnwrapContentButtonIcon.nativeElement.classList.remove(
          'fas',
          'fa-arrow-up'
        );
        this.WrapUnwrapContentButtonIcon.nativeElement.classList.add(
          'fas',
          'fa-arrow-down'
        );
      }
    }, 100);
  }
  WrapUnWrapContent() {
    if (this.Content.nativeElement.classList[1] === 'h-300') {
      this.Content.nativeElement.classList.remove('h-300');
      this.Content.nativeElement.classList.add('h-auto');
      this.ContentWrap.nativeElement.classList.remove('content-wrap');
      this.WrapUnwrapContentButtonIcon.nativeElement.classList.remove(
        'fas',
        'fa-arrow-down'
      );
      this.WrapUnwrapContentButtonIcon.nativeElement.classList.add(
        'fas',
        'fa-arrow-up'
      );
    } else {
      this.Content.nativeElement.classList.remove('h-auto');
      this.Content.nativeElement.classList.add('h-300');
      this.ContentWrap.nativeElement.classList.add('content-wrap');
      this.WrapUnwrapContentButtonIcon.nativeElement.classList.remove(
        'fas',
        'fa-arrow-up'
      );
      this.WrapUnwrapContentButtonIcon.nativeElement.classList.add(
        'fas',
        'fa-arrow-down'
      );
    }
  }
}
