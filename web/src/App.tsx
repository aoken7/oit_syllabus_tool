import { Routes, Route, Navigate } from 'react-router-dom';
import About from './components/About';
import { Table } from "./components/Table";
import { GlobalStyles } from "@mui/material";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
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
        <Routes>
          <Route path="/" element={<Table />} />
          <Route path="/about" element={<About />} />
          <Route
            path="*"
            element={<Navigate to="/" />}
          />
        </Routes>
      </ThemeProvider>
    </>
  );
};