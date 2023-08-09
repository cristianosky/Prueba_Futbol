import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppService } from 'src/app/services/app.service';
import { BodyAddEquipo, Equipo } from 'src/model/equipo.model';

@Component({
  selector: 'app-modal-add-equipo',
  templateUrl: './modal-add-equipo.component.html',
  styleUrls: ['./modal-add-equipo.component.css']
})
export class ModalAddEquipoComponent implements OnInit {
  editar: boolean = false
  equipoForm: FormGroup;
  constructor(private fb: FormBuilder, private _snackBar: MatSnackBar, private _AppService: AppService, private datePipe: DatePipe, private dialogRef: MatDialogRef<ModalAddEquipoComponent>, @Inject(MAT_DIALOG_DATA) public data: Equipo) {
    if(data) this.editar = true

    this.equipoForm = this.fb.group({
      nombre: [this.data ? this.data.nombre : '', Validators.required],
      estadio: [this.data ? this.data.estadio : '', Validators.required],
      sitio: [this.data ? this.data.sitioWeb : ''],
      nacionalidad: [this.data ? this.data.nacionalidad : '', Validators.required],
      fundacion: [this.data ? new Date(this.data.fundacion) : '', Validators.required],
      entrenador: [this.data ? this.data.entrenador : '', Validators.required],
      capacidad: [this.data ? this.data.capacidad : '', Validators.required],
      valor: [this.data ? (this.data.valor ? this.data.valor : 0) : '', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  addEquipo() {
    if (this.equipoForm.invalid){
      this._snackBar.open('Por favor llene todos los campos', '', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top'
      })
      return;
    }

    const { nombre, estadio, sitio, nacionalidad, fundacion, entrenador, capacidad, valor } = this.equipoForm.value

    const body: BodyAddEquipo = {
      nombre,
      estadio,
      sitioWeb: sitio,
      nacionalidad,
      fundacion: this.datePipe.transform(fundacion, 'yyyy-MM-dd') || '',
      entrenador,
      capacidad,
      valor
    }

    this._AppService.addEquipo(body).subscribe((res: any) => {
      if(res.id){
        this._snackBar.open('Equipo agregado correctamente', '', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top'
        })
        this.equipoForm.reset()
        this.cerrarDialog(true)
      }else{
        this._snackBar.open('Ocurrio un error al agregar el equipo', '', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top'
        })
      }
    })
  }

  actualizarEquipo() {
    if(this.equipoForm.invalid){
      this._snackBar.open('Por favor llene todos los campos', '', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top'
      })
      return;
    }
    const { nombre, estadio, sitio, nacionalidad, fundacion, entrenador, capacidad, valor } = this.equipoForm.value

    const body: BodyAddEquipo = {
      nombre,
      estadio,
      sitioWeb: sitio,
      nacionalidad,
      fundacion: this.datePipe.transform(fundacion, 'yyyy-MM-dd') || '',
      entrenador,
      capacidad,
      valor
    }

    this._AppService.actualizarEquipo(body, this.data.id).subscribe((res: any) => {
      if(res.id){
        this._snackBar.open('Equipo actualizado correctamente', '', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top'
        })
        this.equipoForm.reset()
        this.cerrarDialog(true)
      }else{
        this._snackBar.open('Ocurrio un error al actualizar el equipo', '', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top'
        })
      }
    })
  }

  cerrarDialog(respuesta: boolean) {
    this.dialogRef.close(respuesta)
  }

}
