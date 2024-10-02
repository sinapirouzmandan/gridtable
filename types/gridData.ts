export interface IGridData {
    columns: string[];
    rows: string[];
    data: (number | null)[][];
    extras: { key: string; title: string; values: any[] }[] | null;
 
  }