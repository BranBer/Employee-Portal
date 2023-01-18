import { Box } from "@mui/material";
import { Stack, CircularProgress, Typography, Divider } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { useQuery } from "@apollo/client";
import React from "react";
import GetEmployees from "./Graphql/queries/GetEmployees";
import CurrencyFormatter from "./utils/DataGridFormatCurrency";

function App() {
  const { data, error, loading } = useQuery(GetEmployees);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 130 },
    {
      field: "paycheck",
      headerName: "Paycheck",
      type: "number",
      width: 130,
      valueFormatter: (params) => CurrencyFormatter(params),
    },
    {
      field: "yearlyBenefitsCost",
      headerName: "Benefits Deducted",
      description: "Benefits Deducted",
      sortable: false,
      width: 160,
      valueGetter: (params: GridValueGetterParams) =>
        params.row.yearlyBenefitsCost / 26,
      valueFormatter: (params) => CurrencyFormatter(params),
    },
    {
      field: "postDeductionPaycheck",
      headerName: "Paycheck After Deductions",
      description: "Paycheck After Deductions",
      sortable: false,
      width: 160,
      valueGetter: (params: GridValueGetterParams) =>
        2000 - params.row.yearlyBenefitsCost / 26,
      valueFormatter: (params) => CurrencyFormatter(params),
    },
  ];

  console.log(data);

  return (
    <Box position="fixed" height="100vh" width="100vw">
      <Stack
        height="100%"
        width="100%"
        justifyContent="center"
        alignItems="center"
        direction="column"
        rowGap="1em"
      >
        <Typography variant="h2" textAlign="center">
          Next Pay Period for Employees
        </Typography>
        <Divider sx={{ width: "50%" }} />
        {loading ? (
          <CircularProgress />
        ) : error ? (
          "Something went wrong"
        ) : (
          <DataGrid
            sx={{ width: "50%", height: "50%" }}
            rows={data.GetEmployees}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        )}
      </Stack>
    </Box>
  );
}

export default App;
