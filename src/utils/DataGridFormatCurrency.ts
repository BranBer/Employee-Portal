import { GridValueFormatterParams } from "@mui/x-data-grid";

const CurrencyFormatter = (params: GridValueFormatterParams<number>) => {
  if (params.value == null) {
    return "";
  }

  return "$" + params.value.toFixed(2);
};

export default CurrencyFormatter;
