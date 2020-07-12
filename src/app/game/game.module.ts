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
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FlexLayoutModule,
    StoreModule.forFeature('game', reducers),
    EffectsModule.forFeature([]),
  ],
})
export class GameModule {}
