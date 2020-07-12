import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameScreenComponent } from './containers/game-screen/game-screen.component';
import { RouterModule, Route } from '@angular/router';
import { GameOutputComponent } from './components/game-output/game-output.component';
import { PlayerInfoComponent } from './components/player-info/player-info.component';
import { GameControlsComponent } from './components/game-controls/game-controls.component';
import { FlexLayoutModule } from '@angular/flex-layout';

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
  imports: [CommonModule, RouterModule.forChild(routes), FlexLayoutModule],
})
export class GameModule {}
