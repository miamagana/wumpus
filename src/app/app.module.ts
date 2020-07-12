import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { AppComponent } from './core/containers/app.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import {
  StoreRouterConnectingModule,
  DefaultRouterStateSerializer,
  RouterStateSerializer,
} from '@ngrx/router-store';
import { RouterModule, Route } from '@angular/router';
import { GameConfigComponent } from './core/containers/game-config/game-config.component';
import { ConfigGuard } from './core/guards/config.guard';
import { CustomSerializer } from './core/store/reducers/router.reducer';
import { EffectsModule } from '@ngrx/effects';

const routes: Route[] = [
  { path: '', redirectTo: 'game', pathMatch: 'full' },
  { path: 'config', component: GameConfigComponent },
  {
    path: 'game',
    loadChildren: () => import('./game/game.module').then((m) => m.GameModule),
    canActivate: [ConfigGuard],
  },
  { path: '**', redirectTo: 'config' },
];

@NgModule({
  imports: [
    CoreModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot(
      {},
      {
        runtimeChecks: {
          strictStateImmutability: true,
          strictActionImmutability: true,
        },
      }
    ),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot({
      serializer: DefaultRouterStateSerializer,
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
    }),
  ],
  providers: [{ provide: RouterStateSerializer, useClass: CustomSerializer }],
  bootstrap: [AppComponent],
})
export class AppModule {}
