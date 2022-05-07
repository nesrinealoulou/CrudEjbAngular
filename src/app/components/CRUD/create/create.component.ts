import {Component, Input, OnInit} from '@angular/core';
import {Client} from '../../../models/client';
import {ClientService} from '../../../services/client.service';
import {CompteService} from '../../../services/compte.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  nom!: ' ';
  id!: 0;
  prenom = ' ';
  addresse = ' ';
  submitted = false;
  title!: string;

  constructor(private clientService: ClientService,
              private compteService: CompteService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params.id;
    if (this.id === undefined) {
      this.title = ' ajouter client';
    } else {
      this.title = 'editer client';
    }
    if (!!this.id) {

      this.getClientDetails();
    } else {
      console.log('ghheheh');
    }

  }

  OnSubmit(): void {
    this.id = this.activatedRoute.snapshot.params.id;
    console.log(this.id)
    if (this.id === undefined) {
      this.saveClient();

    } else {
      this.updateClient();
    }
  }
  saveClient(): void {
    const data = {
      nom: this.nom ,
      prenom: this.prenom,
      addresse: this.addresse
    };

    this.clientService.addClient(data)
      .subscribe({

        next: (res) => {
          this.submitted = true;
          if (this.submitted) {
            this.router.navigate(['/view']);
          }
        },
        error: (e) => console.error(e)
      });
  }
  updateClient(): void  {
    const data = {
      nom: this.nom ,
      prenom: this.prenom,
      addresse: this.addresse
    };


    this.clientService.updateClient(data)
      .subscribe({
        next: (res) => {
          console.log('resss',res)
          this.router.navigate(['/view']);
        },
        error: (e) => console.error('eeeeeeeeeeee',e)
      });

  }

  private getClientDetails(): void {
    this.clientService.getClientById(this.id).subscribe({
      next: (res) => {
        this.nom = res.nom;
        this.prenom = res.prenom;
        this.addresse = res.addresse;
      }
    });
  }
}
