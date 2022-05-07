import { Component, OnInit } from '@angular/core';
import {Compte} from '../../../models/compte';
import {CompteService} from '../../../services/compte.service';

@Component({
  selector: 'app-view-compte',
  templateUrl: './view-compte.component.html',
  styleUrls: ['./view-compte.component.scss']
})
export class ViewCompteComponent implements OnInit {

  term: string;
  comptesList!: Compte[];

  constructor(private compteService: CompteService) {
  }

  ngOnInit(): void {
    this.getComptes();
  }

  getComptes(): void {
    this.compteService.getComptes()
      .subscribe({
        next: (data) => {
          this.comptesList = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  deleteCompte(rib: any): void {
    this.compteService.deleteCompte(rib)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.getComptes();
          // this.router.navigate(['/comptes']);
        },
        error: (e) => console.error(e)
      });

  }
}
