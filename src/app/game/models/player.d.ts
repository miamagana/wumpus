export interface ICoordinates {
  x: number;
  y: number;
}

export interface IPlayerState {
  position: ICoordinates;
  hasGold: boolean;
  arrows: number;
  perceptions: string[];
  wallHit: boolean;
}
