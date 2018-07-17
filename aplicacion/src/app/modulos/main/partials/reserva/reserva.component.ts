import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
/* import { Evento } from '../../../models/evento' */

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.pug',
  styleUrls: ['./reserva.component.styl']
})

export class ReservaComponent implements OnInit {
  form: FormGroup;
  precio: number;
  constructor(
    public dialogRef: MatDialogRef<ReservaComponent>,
    private formBuilder: FormBuilder,
  /*   @Inject(MAT_DIALOG_DATA) public data: Evento */
  ) { }

  cancel() {
    this.dialogRef.close();
  }

  submit(form: FormGroup) {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      telefono: ['' ,Validators.required],
      correo: ['', [Validators.required]],
      integrantes: ['', [Validators.required]],
    });
  }

}
