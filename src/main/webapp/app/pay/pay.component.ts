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
import {ActivatedRoute, Router} from '@angular/router';
import {NewCommande} from "../entities/commande/commande.model";
import {PanierService} from "../panier/panier.service";
import { IProduit } from 'app/entities/produit/produit.model';
import {LigneCommandeService} from "../entities/ligne-commande/service/ligne-commande.service";
import {ILigneCommande, NewLigneCommande} from "../entities/ligne-commande/ligne-commande.model";




@Component({
  selector: 'jhi-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.scss']
})
export class PayComponent implements OnInit {
  total = 0;
  paiementIsOk = false;
  numero: FormControl = new FormControl('',
    [Validators.required,
      Validators.pattern('[0-9]{16}')
    ]);

  nom: FormControl = new FormControl('',
    [Validators.required,
      Validators.pattern(/^[A-Za-zÀ-ÖØ-öø-ÿ-' ]+$/)
    ]);

  regex = new RegExp(/^(0[1-9]|1[0-2])\/\d{4}$/);

  dateExpiration: FormControl = new FormControl('',
    Validators.compose([
      Validators.required,
      Validators.pattern(this.regex),
      this.isValidDate()])
  );

  cryptogramme: FormControl = new FormControl('',
    [Validators.required,
      Validators.pattern('[0-9]{3}')
    ]);

  codePostal: FormControl = new FormControl('',
    [Validators.required,
      Validators.pattern('[0-9]{5}')
    ]);

  paymentForm: FormGroup = this.formBuilder.group({
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
  client: IClient = {} as IClient;
  login: string | null = null;
  produits: IProduit[] = [];
  constructor(
    private route: ActivatedRoute,
    private commandeService: CommandeService,
    // private cartService: CartService,
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private userService: UserService,
    private clientService: ClientService,
    public panierService: PanierService,
    private ligneCommandeService: LigneCommandeService,

  private router: Router
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
    this.route.queryParams.subscribe(params => {
      this.total = params['total'];
    });
    this.accountService.identity().subscribe((account) => {
      if (account?.login) {
        this.account=account;
        this.login= account.login;
      }
    });
    this.panierService.produits$.subscribe((produits) => {
      this.produits = produits;
      // You can perform any additional logic when products are updated in this component
    });
  }

  isValidDate(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (control.status === "VALID") {

        const regex = /^(\d{1,2})\/(\d{4})$/;
        const match = control.value.match(regex);

        if (match) {
          const month = parseInt(match[1], 10);
          const year = parseInt(match[2], 10);

          const date = new Date(year, month - 1);

          const today = new Date();
          today.setHours(0, 0, 0, 0);

          const result = date >= today ? null : {dateExpired: true};

          return result;
        }

        return null;
      } else {
        return null;
      }
    };
  }

  payCommand(): void {
    if (this.paymentForm.valid) {
      // The form is valid, proceed with the payment

      // Retrieve values from the form
      const formValues = this.paymentForm.value;
      const newCommande: NewCommande = {
        // Assuming you have 'id', 'date', 'etat', 'typePayement', 'carteBancaire', 'client' properties in NewCommande
        id: null,  // It's often assigned by the server
        date: null,  // Convert the date to dayjs if needed
        etat: formValues.etat || null,
        typePayement: null,
        carteBancaire:  null,
        client: null,

      };

      // Call the create method from CommandeService to create a new order
      this.commandeService.create(newCommande).subscribe(
        (response) => {
          // Handle success response
          this.paiementIsOk = true;
        },
        (error) => {
          // Handle error response
          console.error('Error processing payment:', error);
        }
      );
      // Create ILigneCommande and save it
      const ligneCommande:  NewLigneCommande = {
        id: null, // Set to 0 if creating a new instance
        quantite: null, // Adjust as needed
       prix: null, // Adjust as needed
       commande: null,
       produit: null // Adjust as needed
      };

      this.ligneCommandeService.create(ligneCommande).subscribe(
        (createdLigneCommande) => {
          // Handle success if needed
        },
        (error) => {
          // Handle error if needed
          console.error('Error creating LigneCommande:', error);
        }
      );

      // Create a NewCommande object based on the form values

    } else {
      // The form is not valid, display an error message or take appropriate action
    }
  }






}
