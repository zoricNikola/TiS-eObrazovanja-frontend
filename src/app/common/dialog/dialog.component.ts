import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit, OnChanges {
  @Input('opened') opened: boolean = false;
  @Input('modal') modal: boolean = false;
  @Input('mask') mask: boolean = true;
  @Input('maskPointerEvents') maskPointerEvents: boolean = true;
  @Output('dialogClose') dialogClose: EventEmitter<void> = new EventEmitter();

  opened$ = new BehaviorSubject(false);

  delayedOpened$: Observable<boolean> = of(false);
  delayedClosed$: Observable<boolean> = of(true);

  constructor() {}

  ngOnInit(): void {
    this.delayedOpened$ = this.opened$.pipe(delay(30));
    this.delayedClosed$ = this.opened$.pipe(delay(300));
  }

  onDialogClose(): void {
    this.dialogClose.emit();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.opened) this.opened$.next(this.opened);
  }
}
