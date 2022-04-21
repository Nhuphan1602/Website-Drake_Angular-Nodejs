import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  ViewChild,
  EventEmitter,
  OnInit,
  AfterViewInit,
} from '@angular/core';
import { ModalService } from 'src/app/services/modal-service.module';

@Component({
  selector: 'modal',
  templateUrl: 'modal.component.html',
  styleUrls: ['modal.component.scss'],
})
export class ModalComponent implements OnChanges, OnDestroy {
  @Input() id = '';
  @Input() Content = '';
  @Input() Type = '';
  @Output() ModalClosed = new EventEmitter();
  @ViewChild('modalOpenButton') OpenBtn = <ElementRef<HTMLButtonElement>>{};
  @ViewChild('modalCloseButton') CloseBtn = <ElementRef<HTMLButtonElement>>{};

  constructor(private modal_service: ModalService) {}
  ngOnChanges() {
    if (!this.id) {
      console.log('modal must have an id.');
      return;
    }
    this.modal_service.add(this);
  }

  ngOnDestroy() {
    this.modal_service.remove(this.id);
  }

  ModalClick() {
    if (this.Type !== 'yesno') {
      this.ModalClosed.emit();
    }
  }
  ModalContentClick(event: any) {
    event.stopPropagation();
  }
  ModalCloseButtonClick() {
    if (this.Type !== 'yesno') {
      this.ModalClosed.emit();
    }
  }
  ModalOpenButtonClick() {
    this.OpenBtn.nativeElement.click();
  }
  ModalYesButtonClick() {
    this.ModalClosed.emit();
    this.CloseBtn.nativeElement.click();
  }
  ModalNoButtonClick() {
    this.CloseBtn.nativeElement.click();
  }
}
