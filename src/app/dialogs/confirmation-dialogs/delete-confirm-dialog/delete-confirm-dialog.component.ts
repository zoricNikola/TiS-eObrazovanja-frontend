import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-confirm-dialog',
  templateUrl: './delete-confirm-dialog.component.html',
  styleUrls: ['./delete-confirm-dialog.component.css']
})
export class DeleteConfirmDialogComponent implements OnInit {

  id: number;
  name: string;

  constructor(private dialogRef: MatDialogRef<DeleteConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.id = data.id;
      this.name = data.name;
     }

  ngOnInit(): void {
  }

  onSubmit(){
    this.dialogRef.close({data: this.id, confirmation: true});
  }

}
