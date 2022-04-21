import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  ViewChild,
  EventEmitter,
  AfterViewInit,
} from '@angular/core';
import { ModalService } from 'src/app/Services/modal-service.module';

@Component({
  selector: 'modal',
  templateUrl: 'modal.component.html',
  styleUrls: ['modal.component.scss'],
})
export class ModalComponent implements OnChanges, AfterViewInit, OnDestroy {
  @Input() id = '';
  @Input() Content = '';
  @Input() Type = '';
  private ModalAnswer = false;
  @Output() ModalClosed = new EventEmitter();
  @ViewChild('ModalOpenButton') OpenBtn = <ElementRef<HTMLButtonElement>>{};
  @ViewChild('ModalCloseButton') CloseBtn = <ElementRef<HTMLButtonElement>>{};
  @ViewChild('Modal') Modal = <ElementRef<HTMLDivElement>>{};
  constructor(private modal_service: ModalService) {}
  ngOnChanges() {
    if (!this.id) {
      console.log('modal must have an id.');
      return;
    }
    this.modal_service.add(this);
  }
  ngAfterViewInit() {
    this.Modal.nativeElement.addEventListener('hidden.bs.modal', () => {
      this.ModalClosed.emit(this.ModalAnswer);
    });
  }

  ngOnDestroy() {
    this.modal_service.remove(this.id);
  }

  Open() {
    this.ModalAnswer = false;
    this.OpenBtn.nativeElement.click();
  }
  ModalYesButtonClick() {
    this.ModalAnswer = true;
    this.CloseBtn.nativeElement.click();
  }
  ModalNoButtonClick() {
    this.CloseBtn.nativeElement.click();
  }
}
