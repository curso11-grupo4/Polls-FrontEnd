import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { id } from '@swimlane/ngx-charts';
import Swal from 'sweetalert2';
import { Table } from '../../../models/table.model';
import { TablestationsService } from '../../../services/tablestations.service';

@Component({
  selector: 'ngx-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  creationMode: boolean = true; //true=create  false=update
  tableId: string = "";
  table: Table = {    
    table_number: "",
    number_personal_ids: "",
  };
  sendingAttemp: boolean = false;

  constructor(private tablesServices: TablesService,
              private router: Router,
              private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    if(this.activateRoute.snapshot.params.tableId){
      // Update
      this.creationMode = false;
      this.tableId = this.activateRoute.snapshot.params.tableId;
      this.getTable(this.tableId);
    }
    else // Create
      this.creationMode = true;
  }

  getTable(id: string): void {
    this.tablesServices.getOne(id).subscribe(
      data => {
      this.table = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  validateMandatoryData(): boolean {
    this.sendingAttemp = true;
    if(this.table.table_number=="" || this.table.number_personal_ids=="")
      return false;
    else
      return true;
  }
  
  create(): void {
    if(this.validateMandatoryData()){
      this.tablesServices.create(this.table).subscribe
        data => {
          Swal.fire({
            title: 'Creado',
            text: 'La mesa ha sido creada correctamente',
            icon: 'success',
          });
          this.router.navigate(["pages/mesas/listar"]);
        };
        error => {
          console.log(error);
          Swal.fire({
            title: 'Error en el Proceso',
            text: 'Estamos presentando inconvenientes, Por favor, intente mas tarde.',
            icon: 'error',
            timer: 5000
          });
        };
      
    }
    else{
      Swal.fire({
        title: 'Campos Obligatorios',
        text: 'Por favor, diligenciar todos los campos obligatorios',
        icon: 'warning',
        timer: 5000
      });
    }
  }

  edit(): void {
    if(this.validateMandatoryData()){
      let table_: Table = { ...this.table }
      delete table_._id
      this.tablesServices.edit(this.table._id, table_).subscribe(
        data => {
          Swal.fire({
            title: 'Actualizado',
            text: 'La mesa se ha actualizado correctamente.',
            icon: 'success',
          });
          this.router.navigate(["pages/mesas/listar"]);
        },
        error => {
          console.log(error);
        }
      )
    }
    else{
      Swal.fire({
        title: 'Campos Obligatorios',
        text: 'Por favor, diligenciar todos los campos obligatorios',
        icon: 'warning',
        timer: 5000
      });
    }
  }

}