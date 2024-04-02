export type TOrder = "asc" | "desc";

export interface Data {
  count: number;
  name: string;
}

export interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}
