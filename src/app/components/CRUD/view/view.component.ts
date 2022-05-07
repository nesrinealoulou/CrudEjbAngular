import {Component, NgModule, OnInit} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {Compte} from '../../../models/compte';
import {ClientService} from '../../../services/client.service';
import {CompteService} from '../../../services/compte.service';
import {Router} from '@angular/router';
import {Client} from '../../../models/client';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})

export class ViewComponent implements OnInit{
  term: string;
  clientList!: Client[];

  constructor(private clientService: ClientService) {
  }

  ngOnInit(): void {
    this.getClients();
  }

  getClients(): void {
    this.clientService.getClients()
      .subscribe({
        next: (data) => {
          this.clientList = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  deleteClient(id: any): void {
    this.clientService.deleteClient(id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.getClients();
          // this.router.navigate(['/comptes']);
        },
        error: (e) => console.error(e)
      });

  }

}
