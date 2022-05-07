import {Component, Input, OnInit} from '@angular/core';
import {Compte} from '../../../models/compte';
import {Client} from '../../../models/client';
import {ClientService} from '../../../services/client.service';
import {CompteService} from '../../../services/compte.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-create-compte',
  templateUrl: './create-compte.component.html',
  styleUrls: ['./create-compte.component.scss']
})
export class CreateCompteComponent implements OnInit {
  clientList!: Client[];
  solde!: number;
  client1!: Client;
  rib!: number ;


  submitted = false;
  title!: string;
  subTitle!: string ;
  constructor(private clientService: ClientService,
              private compteService: CompteService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    console.log(this.rib);
    this.getClients();
    this.rib = this.activatedRoute.snapshot.params.id;

    if (this.rib === undefined) {
      this.title = ' ajouter compte';
      this.subTitle = 'ajouter des cordonnées';
    } else {
      this.title = 'editer compte';
      this.subTitle = 'editer des cordonnées';
    }
    console.log(this.title);
    if (!!this.rib) {
      console.log(this.rib);
      this.getCompteDetails();
    } else {
      console.log("ghheheh")
    }

  }
  OnSubmit(): void {
    if (this.rib === undefined) {
      console.log('added');
      this.saveCompte();

    } else {
      this.updateCompte();
    }
  }

  getClients(): void {
    this.clientService.getClients()
      .subscribe({
        next: (data) => {
          this.clientList = data;

        },
        error: (e) => console.error(e)
      });
  }

  saveCompte(): void {
    const data = {
      solde: this.solde,
      client: this.client1,
    };
    console.log(data);

    this.compteService.addCompte(data)
      .subscribe({

        next: (res) => {
          console.log(res);
          this.submitted = true;
          if (this.submitted){
            this.router.navigate(['/view-compte']);
          }},
        error: (e) => console.error(e)
      });
  }

  updateCompte(): void {
    const data = {
      solde: this.solde,
      rib: this.rib,
    };

    this.compteService.updateCompte(data)
      .subscribe({
        next: (res) => {
          this.router.navigate(['/view-compte']);
        },
        error: (e) => console.error(e)
      });

  }

  private getCompteDetails(): void  {
    this.compteService.getCompteByRib(this.rib).subscribe({
      next: (res) => {
        this.solde = res.solde;
        this.client1 = res.client;
        console.log("client1",this.client1)
      }
    });
  }

}
