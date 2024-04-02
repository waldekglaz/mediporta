import { HeadCell } from "./types";

const headCells: readonly HeadCell[] = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Tag",
  },
  {
    id: "count",
    numeric: true,
    disablePadding: false,
    label: "Count",
  },
];

export { headCells };
