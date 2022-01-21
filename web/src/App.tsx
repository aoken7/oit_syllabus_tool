import { List } from "./components/List";
import { GlobalStyles } from "@mui/material";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Footer from "./components/Footer";

const darkTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

export const App = () => {
  return (
    <>
      <GlobalStyles styles={{ body: { margin: 0, padding: 0 } }} />
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <List />
        <Footer />
      </ThemeProvider>
    </>
  );
};