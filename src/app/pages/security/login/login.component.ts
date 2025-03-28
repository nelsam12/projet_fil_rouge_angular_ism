import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgIf} from '@angular/common';
import {ActivatedRoute, Router, RouterLinkActive} from '@angular/router';
import {AuthentificationMockService} from '../../../shared/services/impl/authentification-mock.service';
import {LoginResponse} from '../../../shared/models/user.model';
import {CommandeService} from '../../../shared/services/impl/commande.service';
import {PanierService} from '../../../shared/services/impl/panier.service';

@Component({
  selector: 'ism-login',
  imports: [
    ReactiveFormsModule,
    NgIf,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  // 1 ere approche
  formLogin: FormGroup = new FormGroup({
    login: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });
  // 2 eme approche
  formLogin2: FormGroup;

  errorMessage: string = "";


  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private authService: AuthentificationMockService,
              private router: Router,
              private commandeService: CommandeService,
              private panierService: PanierService) {

    this.formLogin2 = this.formBuilder.group({
      login: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    })
  }

  private queryParams: string = "";
  loading: boolean = false;

  onLogin() {

    if (this.formLogin.invalid) {
      return;
    }


    const {login, password} = this.formLogin.value;
    this.authService.login(login, password).subscribe(
      {
        next: (response: LoginResponse) => {
          this.loading = true;
          if (response && response.success) {
            if (response.data?.role == "Client") {
              this.route.queryParams.subscribe(params => {
                let query: string = params["link"]
                if (query == "panier") {
                  // Ajoute la commande et rediriger
                  this.commandeService.addCommande().subscribe(
                    data => {
                      console.log(data);
                    }
                  );
                }
              })
            }
            this.router.navigateByUrl("/catalogue/commandes");
          } else {
            this.errorMessage = response.message || "Login ou Mot de passe incorrect";
          }
        },
        complete: () => {
          this.loading = false;
        },
        error: (err) => {
          this.loading = true;
          this.errorMessage = err.error.message || "Problème Backend !";
        },
      }
    )
  }

  protected readonly require = require;

  ngOnInit(): void {
    // S'il est déjà authentifier on ajoute sa commande
    if (this.authService.isAuthenticated()) {
      // AddCommande
      if (this.authService.isClient() && this.panierService.panierSignal().produits.length > 0) {
        this.commandeService.addCommande().subscribe()
        this.router.navigateByUrl("/catalogue/commandes");
        return;
      }
      this.router.navigateByUrl('/catalogue');
      //Rediriger vers la page mes_commandes (liste de ses commandes)
    }
  }
}
