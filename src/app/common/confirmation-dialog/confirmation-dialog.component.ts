import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { AsyncSubject, BehaviorSubject } from 'rxjs';

interface Options {
  opened: boolean;
  decline: () => void;
  confirm: () => void;
}

@Component({
  selector: 'confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css'],
})
export class ConfirmationDialogComponent implements OnInit, OnChanges {
  @Input('opened') opened: boolean = false;
  @Input('title') title: string = '';
  @Input('message') message: string = '';
  @Input('subject') subject$!: AsyncSubject<boolean>;
  @Output('declined') declined: EventEmitter<void> = new EventEmitter();
  @Output('confirmed') confirmed: EventEmitter<void> = new EventEmitter();

  @Input('options') options!: Options;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {}

  ngOnInit(): void { }

  onDeclined(): void {
    this.declined.emit();
    this.options.decline();
    this.subject$.next(false);
    this.subject$.complete();
  }

  onConfirmed(): void {
    this.confirmed.emit();
    this.options.confirm();
    this.subject$.next(true);
    this.subject$.complete();
  }
}
