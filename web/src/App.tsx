import { List } from "./components/List";
import AppBar from "./components/AppBar";
import { GlobalStyles } from "@mui/material";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export const App = () => {
  return (
    <>
      <GlobalStyles styles={{ body: { margin: 0, padding: 0 } }} />
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <AppBar />
        <List />
      </ThemeProvider>
    </>
  );
};