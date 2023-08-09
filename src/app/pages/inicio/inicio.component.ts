import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import { Equipo } from 'src/model/equipo.model';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { ModalAddEquipoComponent } from './components/modal-add-equipo/modal-add-equipo.component';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  displayedColumns: string[] = ['nro', 'nombre', 'estadio', 'sitio', 'nacionalidad', 'fundacion', 'entrenador', 'capacidad', 'valor', 'acciones']
  totalData: number = 1003
  loading: boolean = false
  equipos: Equipo[] = []
  pagina: number = 0
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  filtro = new FormControl('')
  userLogged: boolean = false

  constructor(private _AppService: AppService, private dialog: MatDialog, private datePipe: DatePipe,  private router: Router) {
    this.range.valueChanges.subscribe((res: any) => {
      if (res.start && res.end) {
        let fechaInicio = this.datePipe.transform(res.start, 'dd-MM-yyyy') || '';
        let fechaFin = this.datePipe.transform(res.end, 'dd-MM-yyyy') || '';
        this.loading = true
        this._AppService.consultarEquiposFecha(fechaInicio, fechaFin).subscribe((res: any) => {
          this.equipos = res
          this.loading = false
        })
      } else if(!res.start && !res.end) {
        this.obtenerEquipos()
      }
    })

    this.filtro.valueChanges.subscribe((res: any) => {
      if(res){
        this.equipos = []
        this.loading = true
        this._AppService.consultarID(res).subscribe((res: any) => {
          this.equipos.push(res)
          this.loading = false
        })
      }else{
        this.obtenerEquipos()
      }
    })
    localStorage.getItem('usuario') ? this.userLogged = true : this.userLogged = false
  }

  ngOnInit(): void {
    this.obtenerEquipos()
  }

  openDialog(equipo?: Equipo) {
    this.dialog.open(ModalAddEquipoComponent,
      {
        data: equipo ? equipo : null
      }).afterClosed().subscribe((res: boolean) => {
      if (res) {
        this.obtenerEquipos()
      }
    })
  }

  obtenerEquipos() {
    this.loading = true
    this._AppService.getEquipos(this.pagina).subscribe((res: any) => {
      if(res.content.length > 0){
        this.equipos = res.content
        this.totalData = res.totalElements
      }
      this.loading = false
    })
  }

  nextPagina(event: any) {
    this.pagina = event.pageIndex
    this.obtenerEquipos()
  }

  deleteEquipo(equipo: Equipo) {
    this.dialog.open(ConfirmModalComponent, {
      data: equipo,
      position: {
        bottom: '10px',
      }
    }).afterClosed().subscribe((res: boolean) => {
      if (res) {
        this._AppService.deleteEquipo(equipo.id).subscribe((res: any) => {
          if (res) {
            this.obtenerEquipos()
          }
        })
      }
    })
  }

  cerrarSeccion() {
    localStorage.removeItem('usuario')
    this.userLogged = false
    this.router.navigate(['/']);
  }

}
