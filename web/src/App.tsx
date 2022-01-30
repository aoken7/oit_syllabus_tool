import { Table } from "./components/Table";
import { GlobalStyles } from "@mui/material";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Footer from "./components/Footer";
import Header from "./components/Header";

const Theme = createTheme({
  palette: {
    mode: 'light',
  },
});

export const App = () => {
  return (
    <>
      <GlobalStyles styles={{ body: { margin: 0, padding: 0 } }} />
      <ThemeProvider theme={Theme}>
        <CssBaseline />
        <Header />
        <Table />
        <Footer />
      </ThemeProvider>
    </>
  );
};