export type ItemType = "single" | "sealed";

export interface PortfolioItem {
  id: string;
  type: ItemType;
  name: string;
  set: string;
  cardNumber: string;
  variantOrProduct: string;
  condition: string;
  quantity: number;
  purchasePrice: number;
  feesPercent: number;
  purchaseDate: string;
  marketPrice: number;
  notes: string;
}

export interface PortfolioStats {
  totalCost: number;
  totalValue: number;
  totalPLDollar: number;
  totalPLPercent: number;
  singlesValue: number;
  sealedValue: number;
}
