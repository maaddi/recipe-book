export interface Ingredient {
  name: string;
  amount: number;
  unit: Unit;
}

export enum Unit {
  Gram = 'Gram',
  Milliliter = 'Milliliter',
  Tablespoon = 'Tablespoon',
  Teaspoon = 'Teaspoon',
  Piece = 'Piece'
}
