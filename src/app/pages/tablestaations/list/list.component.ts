import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { subscribeOn } from 'rxjs-compat/operator/subscribeOn';
import Swal from 'sweetalert2';
import { Student } from '../../../models/table.model';
import { StudentsService } from '../../../services/tables.service';

@Component({
  selector: 'ngx-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  columNames: string[] = ['Cedula', 'Nombres', 'Apellidos', 'Opciones']
  students: Student[];

  constructor(private studentsService: StudentsService,
              private router: Router ) { }

  ngOnInit(): void {
    this.list();
  }

  list(): void{
    this.studentsService.list().subscribe(
      data => {
        this.students = data;
      },
      error => {
        console.log(error);
      }
    )
  }

  create(): void{
    this.router.navigate(["pages/estudiantes/crear"]);
  }

  edit(id: string): void{
    this.router.navigate(["pages/estudiantes/actualizar/"+id]);
  }

  delete(id: string): void{
    Swal.fire({
      title: 'Eliminar Estudiantes',
      text: '¿Está seguro que quiere eliminar al estudiante?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#D33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sí, eliminar',
      confirmButtonColor: '#3085D6',
    }).then((result) => {
      if(result.isConfirmed){
        this.studentsService.delete(id).subscribe(
          data => {
            Swal.fire(
              'Eliminado',
              'El estudiante ha sido eliminado correctamente',
              'success'
            ),
            this.ngOnInit();
          },
          error => {
            console.log(error);
          }
        )
      }
    })
  }

}