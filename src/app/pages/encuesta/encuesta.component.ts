import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatDialog, MatSnackBar } from '@angular/material';
import { Encuesta } from 'src/app/_model/Encuesta';
import { EncuestaService } from 'src/app/_services/encuesta.service.';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
export class EncuestaComponent implements OnInit {

  dataSource:MatTableDataSource<Encuesta>;
  totalElementos: number = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['id', 'nombres', 'apellidos', 'edad', 'lenguaje'];

  constructor(
    private serviceProblema: EncuestaService,
    private snackBar: MatSnackBar) {
    this.dataSource = new MatTableDataSource<Encuesta>();
  }

  ngOnInit() {
    this.cargarTabla(0, 100, false);
    this.serviceProblema.mensajeRegistro.subscribe((dato) => {
      this.snackBar.open(dato, null, {
        duration: 1500,
      });
      this.cargarTabla(0, 100, false);
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  mostrarMas(event){
    this.cargarTabla(event.pageIndex, event.pageSize, true);
  }

  cargarTabla(pageIndex: number, pageSize: number, desdePaginador: boolean){
    this.serviceProblema.obtenerFeedBacksPropios(pageIndex, pageSize).subscribe((datos) => {
      let feedbacks = JSON.parse(JSON.stringify(datos)).content;
      this.dataSource = new MatTableDataSource<Encuesta>(feedbacks);
      this.totalElementos = JSON.parse(JSON.stringify(datos)).totalElements;
      if(!desdePaginador){
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  eliminarFeedBack(id: number) {
    this.serviceProblema.eliminarFeedBack(id).subscribe((data) => {
      this.serviceProblema.mensajeRegistro.next('Dato eliminado correctamente...');
    });
  }


}
