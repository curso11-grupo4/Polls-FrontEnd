import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Vote } from '../../../models/vote.model';
import { VotesService } from '../../../services/votes.service';


@Component({
  selector: 'ngx-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  columNames: string[] = ['Nombre', 'Apellido', 'Mesa']
  votes: Vote[];

  constructor(private votesService: VotesService,
              private router: Router) { }

  ngOnInit(): void {
    this.list();
  }

  list(): void{
    this.votesService.list().subscribe(
      data => {
        console.log(data);
        this.votes = data;
      },
      error => {
        console.log(error);
      }
    )
  }

  create(): void{
    this.router.navigate(["pages/votos/crear"]);
  }
  
}
