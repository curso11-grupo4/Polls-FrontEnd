import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Candidate } from '../../../models/candidate.model';
import { Vote } from '../../../models/vote.model';
import { Table } from '../../../models/table.model';
import { CandidatesService } from '../../../services/candidates.service';
import { VotesService } from '../../../services/votes.service';
import { TablesService } from '../../../services/tables.service';

@Component({
  selector: 'ngx-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  creationMode: boolean = true;
  sendingAttemp: boolean = false;

  tables: Table[];
  candidates: Candidate[];

  voteId: string = "";
  vote: Vote = {
    vote: 0,
    table: {
      _id: null
    },
    candidate: {
      _id: ""
    }
  }

  constructor(private votesService: VotesService,
              private studentsService: TablesService,
              private candidateService: CandidatesService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getTables();
    this.getCandidate();   

    if(this.activatedRoute.snapshot.params.idVote){
      // update
      this.creationMode = false;
      this.voteId = this.activatedRoute.snapshot.params.idVote;
      this.getVote(this.voteId);
    }
    else // create
      this.creationMode = true;
  }

  getTables(): void {
    this.studentsService.list().subscribe(
      data => {
        this.tables = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  getCandidate(): void {
    this.candidateService.list().subscribe(
      data => {
        this.candidates = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  getVote(id: string): void{
    this.votesService.getOne(id).subscribe(
      data => {
        this.vote = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  validateMandatoryData(): boolean {
    this.sendingAttemp = true;
    if(this.vote.table._id=="" || this.vote.candidate._id=="")
      return false;
    else
      return true;
  }

  create(): void{
    if(this.validateMandatoryData()){
      this.votesService.create(this.vote).subscribe
        data => {
          Swal.fire({
            title: 'Creada',
            text: 'El voto ha sido creado correctamente',
            icon: 'success',
          });
          this.router.navigate(["pages/votos/listar"]);
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
}
