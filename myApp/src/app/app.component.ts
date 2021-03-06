import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router'
import { AngularFireAuth } from '@angular/fire/auth';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Cadastros',
      children: [
        {
          title: 'Cadastro Usuario',
          url: '/cadastro-usuario',
          icon: 'arrow-dropright'
        },
        {
          title: 'Cadastro Cliente',
          url: '/cadastro-empresa',
          icon: 'arrow-dropright'
        },
        {
          title: 'Cadastro Prest. Servico',
          url: '/cadastro-prestador-servico',
          icon: 'arrow-dropright'
        },
        {
          title: 'Cadastro Residuo',
          url: '/cadastro-residuo',
          icon: 'arrow-dropright'
        },
        {
          title: 'Cadastro Tipos De Planos',
          url: '/cadastro-tipos-planos',
          icon: 'arrow-dropright'
        }
      ]
    },
    {
      title: 'Consulta',
      children: [
        {
          title: 'Consulta Clientes',
          url: '/controle',
          icon: 'arrow-dropright'
        },
        {
          title: 'Consulta Prestador',
          url: '/consulta-prestador',
          icon: 'arrow-dropright'
        },
        {
          title: 'Consulta Residuo',
          url: '/consulta-residuo',
          icon: 'arrow-dropright'
        },
        {
          title: 'Consulta Plano',
          url: '/consulta-plano',
          icon: 'arrow-dropright'
        },
        {
          title: 'Consulta Tempo Real',
          url: '/realtime-logs',
          icon: 'arrow-dropright'
        },


      ],
    },


    {
      title: 'Relatorios',
      children: [
        {
          title: 'Relatorio',
          url: '/relatorio',
          icon: 'arrow-dropright'
        },

      ],
    },


  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage,
    private router: Router,
    private afAuth: AngularFireAuth,
    private controledomenu: MenuController
  ) {
    this.initializeApp();
    this.verificaPlataforma();
  }
  verificaPlataforma() {
    if (this.platform.is('android')) {
      this.appPages = [
        {
          title: 'Home',
          url: '/home',
          icon: 'home'
        },
        {
          title: 'Consulta',
          children: [
            {
              title: 'Consulta Clientes',
              url: '/controle',
              icon: 'arrow-dropright'
            },
            {
              title: 'Consulta Prestador',
              url: '/consulta-prestador',
              icon: 'arrow-dropright'
            },
            {
              title: 'Consulta Residuo',
              url: '/consulta-residuo',
              icon: 'arrow-dropright'
            },
            {
              title: 'Consulta Plano',
              url: '/consulta-plano',
              icon: 'arrow-dropright'
            },
            {
              title: 'Consulta Tempo Real',
              url: '/realtime-logs',
              icon: 'arrow-dropright'
            },


          ],
        },


        {
          title: 'Relatorios',
          children: [
            {
              title: 'Relatorio',
              url: '/relatorio',
              icon: 'arrow-dropright'
            },

          ],
        },


      ];
    } else {
      this.appPages = [
        {
          title: 'Home',
          url: '/home',
          icon: 'home'
        },
        {
          title: 'Cadastros',
          children: [
            {
              title: 'Cadastro Usuario',
              url: '/cadastro-usuario',
              icon: 'arrow-dropright'
            },
            {
              title: 'Cadastro Cliente',
              url: '/cadastro-empresa',
              icon: 'arrow-dropright'
            },
            {
              title: 'Cadastro Prest. Servico',
              url: '/cadastro-prestador-servico',
              icon: 'arrow-dropright'
            },
            {
              title: 'Cadastro Residuo',
              url: '/cadastro-residuo',
              icon: 'arrow-dropright'
            },
            {
              title: 'Cadastro Tipos De Planos',
              url: '/cadastro-tipos-planos',
              icon: 'arrow-dropright'
            }
          ]
        },
        {
          title: 'Consulta',
          children: [
            {
              title: 'Consulta Clientes',
              url: '/controle',
              icon: 'arrow-dropright'
            },
            {
              title: 'Consulta Prestador',
              url: '/consulta-prestador',
              icon: 'arrow-dropright'
            },
            {
              title: 'Consulta Residuo',
              url: '/consulta-residuo',
              icon: 'arrow-dropright'
            },
            {
              title: 'Consulta Plano',
              url: '/consulta-plano',
              icon: 'arrow-dropright'
            },
            {
              title: 'Consulta Tempo Real',
              url: '/realtime-logs',
              icon: 'arrow-dropright'
            },


          ],
        },


        {
          title: 'Relatorios',
          children: [
            {
              title: 'Relatorio',
              url: '/relatorio',
              icon: 'arrow-dropright'
            },

          ],
        },


      ];
    }
  }


  // Decide para onde vai o usuario
  initializeApp() {
    this.controledomenu.enable(false);
    this.storage.get('usuario')
      .then((usuario) => {
        if (usuario.adm == true) {
          this.router.navigate(['home']);
          this.splashScreen.hide();
          this.controledomenu.enable(true);
        } else {
          if (usuario.adm == false) {
            this.router.navigate(['home-funcionario']);
            this.splashScreen.hide();
            this.controledomenu.enable(false);
          } else
            this.router.navigate(['login']);
          this.splashScreen.hide();
          this.controledomenu.enable(false);
        }
      })

    this.platform.ready().then(() => {

      //Muda Cor da Barra De Status
      this.statusBar.backgroundColorByHexString('#17b336');
    });

  }
  signOut() {
    this.afAuth.auth.signOut();
    this.controledomenu.enable(false);
    this.router.navigate(['login'])
  }
}
