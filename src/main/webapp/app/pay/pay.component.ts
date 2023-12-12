import {Component, OnInit} from '@angular/core';
import dayjs from 'dayjs/esm';
import {CommandeService} from "../entities/commande/service/commande.service";
import {IClient} from "../entities/client/client.model";
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {Account} from "../core/auth/account.model";
import {AccountService} from "../core/auth/account.service";
import {UserService} from "../entities/user/user.service";
import {IUser} from "../admin/user-management/user-management.model";
import {ClientService} from "../entities/client/service/client.service";
import {ActivatedRoute, Router} from '@angular/router';
import {NewCommande} from "../entities/commande/commande.model";
import {PanierService} from "../panier/panier.service";
import {IProduit} from 'app/entities/produit/produit.model';
import {LigneCommandeService} from "../entities/ligne-commande/service/ligne-commande.service";
import {ILigneCommande} from "../entities/ligne-commande/ligne-commande.model";
import {TypePayement} from 'app/entities/enumerations/type-payement.model';
import {EtatCommande} from "../entities/enumerations/etat-commande.model";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ValiderCommandePopupComponent } from 'app/valider-commande-popup/valider-commande-popup.component';


interface ProduitGroup {
  produits: IProduit[];
  quantite: number;
}

@Component({
  selector: 'jhi-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.scss']
})
export class PayComponent implements OnInit {
  total = 0;
  paiementIsOk = false;
  error= false;
  errorMessage= "";

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
  id: number | undefined;

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
    private modalService: NgbModal,
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
    this.total=this.panierService.gettotal();
    this.accountService.identity().subscribe((account) => {
      if (account?.login) {
        this.account=account;
        this.login= account.login;
        this.id= account.id;
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
      // Retrieve values from the form
      const formValues = this.paymentForm.value;

      // Construct the payload for Commande
      const newCommande: NewCommande = {
        id: null,
        date: dayjs(), // Assuming you have dayjs imported
        etat: EtatCommande.EN_COURS,
        typePayement:TypePayement.CB,
        carteBancaire: {
          id: undefined,
          nomPorteur: formValues.nom,
          numCarte: formValues.numero,
          dateExpiration: dayjs(formValues.dateExpiration, 'MM/YYYY'), // Assuming date format is MM/YYYY
          cvv: formValues.cryptogramme
        },
        client: {
          id: this.id ?? -1, //  { id: client.id }
         },
        ligneCommandes: [] // Leave it empty for now
      };
      this.produits.forEach((produit) => {
        // Check if the product already exists in ligneCommandes
        const existingLigneCommandeIndex = newCommande.ligneCommandes!.findIndex(
          (ligneCommande) => ligneCommande.produit?.id === produit.id
        );

        if (existingLigneCommandeIndex !== -1) {
          // If the product exists, update the quantity and price
          newCommande.ligneCommandes![existingLigneCommandeIndex].quantite! += 1;
          newCommande.ligneCommandes![existingLigneCommandeIndex].prix! += produit.prixUnitaire!;
        } else {
          // If the product doesn't exist, create a new ligneCommande
          const ligneCommande: ILigneCommande = {
            id: null, // Generate the ID as needed
            quantite: 1,
            prix: produit.prixUnitaire,
            produit: { id: produit.id }
          };

          // Add the new ligneCommande to the list
          newCommande.ligneCommandes!.push(ligneCommande);
        }
      });
      console.log("voillaaa la ligne de comande ");
      console.log(newCommande.ligneCommandes);
      console.log("voillaaa la COMMANDE");
      console.log(newCommande);
      // Call the create method from CommandeService to create a new order
      this.commandeService.create(newCommande).subscribe(
        (response) => {
          // Handle success response
          this.paiementIsOk = true;
          this.panierService.retirertout();
          this.openPaymentConfirmationPopup();
          //this.router.navigate(['/mescommandes']);
        },
        (error) => {
          // Handle error response
          console.error('Error processing payment:', error);
          this.error = true;
          this.errorMessage = error.error.message;
        }
      );
    } else {
      // The form is not valid, display an error message or take appropriate action
    }
  }



  get produitsGroupes(): ProduitGroup[] {
    const produitsGroupes: ProduitGroup[] = [];
    this.produits.forEach((produit) => {
      const groupeExist = produitsGroupes.find((g) => g.produits[0].id === produit.id);

      if (groupeExist) {
        groupeExist.quantite += 1;
      } else {
        produitsGroupes.push({ produits: [produit], quantite: 1 });
      }
    });

    return produitsGroupes;
  }
  openPaymentConfirmationPopup(): void {
    const modalRef = this.modalService.open(ValiderCommandePopupComponent);

  }}
