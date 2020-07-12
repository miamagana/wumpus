export interface ICoordinates {
  x: number;
  y: number;
}

export interface IPlayerState {
  position: ICoordinates;
  hasGold: boolean;
  perceptions: string[];
}
