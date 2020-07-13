import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameScreenComponent } from './containers/game-screen/game-screen.component';
import { RouterModule, Route } from '@angular/router';
import { GameOutputComponent } from './components/game-output/game-output.component';
import { PlayerInfoComponent } from './components/player-info/player-info.component';
import { GameControlsComponent } from './components/game-controls/game-controls.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from './store/reducers';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ControlPadComponent } from './components/control-pad/control-pad.component';
import { effects } from './store/effects';
import { MatSnackBarModule } from '@angular/material/snack-bar';

const routes: Route[] = [
  { path: '', redirectTo: 'screen', pathMatch: 'full' },
  { path: 'screen', component: GameScreenComponent },
  { path: '**', redirectTo: 'screen' },
];

@NgModule({
  declarations: [
    GameScreenComponent,
    GameOutputComponent,
    PlayerInfoComponent,
    GameControlsComponent,
    ControlPadComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('game', reducers),
    EffectsModule.forFeature(effects),
    FlexLayoutModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
})
export class GameModule {}
