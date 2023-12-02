export interface Ingredient {
  name: string;
  amount: number;
  unit: Unit;
  edit?: boolean;
}

export enum Unit {
  Gram = 'Gram',
  Milliliter = 'Milliliter',
  Tablespoon = 'Tablespoon',
  Teaspoon = 'Teaspoon',
  Piece = 'Piece'
}
