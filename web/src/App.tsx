import List from "./components/List";
import SearchAppBar from "./components/SearchBar";
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
        <SearchAppBar />
        <List />
      </ThemeProvider>
    </>
  );
};