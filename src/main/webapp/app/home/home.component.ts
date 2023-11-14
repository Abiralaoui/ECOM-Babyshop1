import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/auth/account.model';

@Component({
  selector: 'jhi-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})

export class HomeComponent implements OnInit, OnDestroy {
  products: any[];
  account: Account | null = null;

  private readonly destroy$ = new Subject<void>();

  constructor(private accountService: AccountService, private router: Router) {
    this.products = [
      { id: 1, nom: 'Produit 1', prix: 19.99, description: 'Description du Produit 3 en solde "30%"',image: '../../../../content/images/img.png' },
      { id: 2, nom: 'Produit 2', prix: 29.99,description: 'Description du Produit 3', image: '../../../content/images/carsoul1.png' },
      { id: 3, nom: 'Produit 3', prix: 39.99,description: 'Description du Produit 3', image: '../../../content/images/carsoul1.png' },
      { id: 1, nom: 'Produit 1', prix: 19.99,description: 'Description du Produit 3', image: '../../../../content/images/img.png' },
      { id: 2, nom: 'Produit 2', prix: 29.99,description: 'Description du Produit 3', image: '../../../content/images/carsoul1.png' },
      { id: 3, nom: 'Produit 3', prix: 39.99,description: 'Description du Produit 3', image: '../../../content/images/carsoul1.png' },
      { id: 1, nom: 'Produit 1', prix: 19.99, description: 'Description du Produit 3',image: '../../../../content/images/img.png' },
      { id: 2, nom: 'Produit 2', prix: 29.99,description: 'Description du Produit 3', image: '../../../content/images/carsoul1.png' },
      { id: 3, nom: 'Produit 3', prix: 39.99, description: 'Description du Produit 3',image: '../../../content/images/carsoul1.png' },
      { id: 1, nom: 'Produit 1', prix: 19.99,description: 'Description du Produit 3', image: '../../../../content/images/img.png' },
      { id: 2, nom: 'Produit 2', prix: 29.99, description: 'Description du Produit 3',image: '../../../content/images/carsoul1.png' },
      { id: 3, nom: 'Produit 3', prix: 39.99, description: 'Description du Produit 3',image: '../../../content/images/carsoul1.png' },
    ];
  }


  ngOnInit(): void {
    this.accountService
      .getAuthenticationState()
      .pipe(takeUntil(this.destroy$))
      .subscribe(account => (this.account = account));
  }

  login(): void {
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
