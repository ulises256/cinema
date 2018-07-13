import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-confirm-del-dialog',
  templateUrl: './confirm-del-dialog.component.pug',
  styleUrls: ['./confirm-del-dialog.component.styl']
})
export class ConfirmDelDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ConfirmDelDialogComponent>) { }

  ngOnInit() {

  }

  submit() {
    this.dialogRef.close(true);
  }

  cancel() {
    this.dialogRef.close(false);
  }

}
