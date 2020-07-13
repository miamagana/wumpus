import { createAction } from '@ngrx/store';

export const initGame = createAction('[Game] Init Game');
export const checkPerceptions = createAction('[Game] Check Perceptions');
export const checkAlive = createAction('[Game] Check Alive');
export const resetGame = createAction('[Game] Reset');
