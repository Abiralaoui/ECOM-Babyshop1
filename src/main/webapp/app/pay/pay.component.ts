import { Component, OnInit } from '@angular/core';
import dayjs from 'dayjs/esm';
import {CommandeService} from "../entities/commande/service/commande.service";

import {IClient} from "../entities/client/client.model";
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import {Account} from "../core/auth/account.model";
import {AccountService} from "../core/auth/account.service";
import {UserService} from "../entities/user/user.service";
import {IUser} from "../admin/user-management/user-management.model";
import {ClientService} from "../entities/client/service/client.service";

import { Router } from '@angular/router';



@Component({
  selector: 'jhi-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.scss']
})
export class PayComponent implements OnInit {
  // moyenPaiement: IMoyenPaiement = {} as IMoyenPaiement;
  // cartItems: CartItem[] = [];
  paiementIsOk = false;
  numero: FormControl = new FormControl('',
    [ Validators.required,
      Validators.pattern('[0-9]{16}')
    ]);

  nom: FormControl = new FormControl('',
    [ Validators.required,
      Validators.pattern(/^[A-Za-zÀ-ÖØ-öø-ÿ-' ]+$/)
    ]);

  regex: RegExp = new RegExp(/^(0[1-9]|1[0-2])\/\d{4}$/);

  dateExpiration: FormControl = new FormControl('',
    Validators.compose([
      Validators.required,
      Validators.pattern(this.regex),
      this.isValidDate()])
  );

  cryptogramme: FormControl = new FormControl('',
    [ Validators.required,
      Validators.pattern('[0-9]{3}')
    ]);

  codePostal: FormControl = new FormControl('',
    [ Validators.required,
      Validators.pattern('[0-9]{5}')
    ]);

  paymentForm : FormGroup =  this.formBuilder.group({
    numero: this.numero,
    dateExpiration: this.dateExpiration,
    cryptogramme: this.cryptogramme,
    nom: this.nom,
    adresse: ['', Validators.required],
    complementAdresse: [''],
    ville: ['', Validators.required],
    region: ['', Validators.required],
    codePostal: this.codePostal
  });
  account: Account | null = null;
  user: IUser = {} as IUser;
  client : IClient = {} as IClient;

  constructor(
    private commandeService: CommandeService,
    // private cartService: CartService,
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private userService: UserService,
    private clientService: ClientService,
    private router : Router
  ) {
  }

   ngOnInit(): void {
  //   this.cartItems = JSON.parse(localStorage.getItem('cartItems')!) || [];
  //
  //   this.clientService.getDeliveryAddress().subscribe((result) => {
  //     let adr: Adresse | null = result.body;
  //
  //     if(adr !== null){
  //       this.paymentForm.patchValue({
  //         adresse: adr.rue,
  //         complementAdresse: adr.complement,
  //         ville: adr.ville,
  //         region: adr.region,
  //         codePostal: adr.codePostal
  //       });
  //     }
  //   });

  }

  getCartTotal() {
    // return this.cartService.getCartTotal();
  }

  isValidDate(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (control.status === "VALID") {

        const regex = /^(\d{1,2})\/(\d{4})$/;
        const match = control.value.match(regex);

        if(match) {
          const month = parseInt(match[1], 10);
          const year = parseInt(match[2], 10);

          const date = new Date(year, month - 1);

          let today = new Date();
          today.setHours(0,0,0,0);

          let result = date >= today ? null : { dateExpired: true};

          return result;
        }

        return null;
      } else {
        return null;
      }
    };
  }

  payCommand(): void {
    let values = this.paymentForm.value;

    // this.setDeliveryAddress(values);

    // this.moyenPaiement.numeroCarte = values.numero;
    // this.moyenPaiement.cvv = parseInt(values.cryptogramme);
    // this.moyenPaiement.nomPorteur = values.nom;
    //
    // // this.moyenPaiement.dateExpiration = dayjs(values.dateExpiration,"MM/YYYY");
    // this.getCurrentClient()
  }

  get isDeliveryAddressFormValid() {
    return this.paymentForm.controls.adresse.valid &&
      this.paymentForm.controls.ville.valid &&
      this.paymentForm.controls.region.valid &&
      this.paymentForm.controls.codePostal.valid;
  }

  // getFullAddress(): string {
  //   const formValues = this.paymentForm.value;
  //
  //   return formValues.adresse +';'
  //     + formValues.complementAdresse +';'
  //     + formValues.ville +';'
  //     + formValues.region +';'
  //     + formValues.codePostal;
  // }

  saveDeliveryAddress(event: MouseEvent): void {
    event.preventDefault();

    // const fullAddress = this.getFullAddress();

    // Appel API pour sauvegarder l'adresse de livraison du client courant
    // this.clientService.updateDeliveryAddress(fullAddress).subscribe();
  }

  setDeliveryAddress(formValues: any) {
    // const fullAddress = formValues.adresse +';'
    //   + formValues.complementAdresse +';'
    //   + formValues.ville +';'
    //   + formValues.region +';'
    //   + formValues.codePostal;

  }

  loadCartFromLocalStorage(): void {
    // this.cartItems = JSON.parse(localStorage.getItem('cartItems')!) || [];
  }

  // getCurrentClient(): void {
  //   this.accountService.getAuthenticationState().subscribe(responseAccount => {
  //     const account : Account | null = responseAccount;
  //     this.userService.find(account!.login).subscribe(
  //       responseUser => {
  //         const user : IUser = responseUser;
  //         this.clientService.query({idInternalUser: user.id}).subscribe(
  //           responseClient => {
  //             const client : IClient = responseClient.body![0];
  //             this.createCommande(client);
  //           });
  //       });
  //   });
  // }

  // createCommande(client : IClient): void {
  //   const commandeInfo: CommandeInfo = {} as CommandeInfo;
  //   commandeInfo.moyenPaiement = this.moyenPaiement;
  //   commandeInfo.client = client;
  //   commandeInfo.listSneakersInfo = [];
  //   this.cartItems.forEach((cartItem,i) => {
  //     commandeInfo.listSneakersInfo[i] = {
  //       idModele: cartItem.modele.id,
  //       taille: cartItem.taille,
  //       couleur: cartItem.couleur,
  //       prixUnitaire: cartItem.modele.prixUnitaire,
  //       quantite: cartItem.quantite
  //     }
  //   })
  //   commandeInfo.adresse = {
  //     rue : this.paymentForm.value.adresse,
  //     complement : this.paymentForm.value.complement,
  //     ville : this.paymentForm.value.ville,
  //     region : this.paymentForm.value.region,
  //     codePostal : this.paymentForm.value.codePostal
  //   }
  //
  //   this.commandeService.createCommandeWithInfo(commandeInfo).subscribe(response =>
  //   {
  //     if(response.status === 200 || response.status === 201){
  //       this.router.navigate(['/endCommand']);
  //       this.clearCartFromLocalStorage();
  //     }else{
  //       //Normalement géré dans le error-handler.interceptor, ne devrait jamais arriver ici
  //       this.router.navigate(['/errorCommand'],{queryParams:{reason:"inconnu"}});
  //     }
  //   });
  //
  // }
  //
  // clearCartFromLocalStorage() : void {
  //   this.cartService.emptyCart();
  // }

}
