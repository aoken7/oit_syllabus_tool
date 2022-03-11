import { Routes, Route, Navigate } from 'react-router-dom';
import About from './components/About';
import { Table } from "./components/Table";
import { GlobalStyles } from "@mui/material";
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from "./components/Header";
import useMediaQuery from '@material-ui/core/useMediaQuery/useMediaQuery';
import React from 'react';

export const ColorModeContext = React.createContext({ toggleColorMode: () => { } });

export const App = () => {
  const [mode, setMode] = React.useState<'light' | 'dark'>('dark');
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)', { noSsr: true });

  // localStorageに保存されているならそれを使い、なければシステムの設定を使う
  React.useEffect(() => {
    if (localStorage.getItem('colorMode') === "dark") {
      setMode("dark");
    } else if (localStorage.getItem('colorMode') === "light") {
      setMode("light");
    } else if ((prefersDarkMode) === true) {
      setMode("dark");
    } else {
      setMode("light");
    }
  }, [prefersDarkMode]);

  //トグルボタンでテーマを切り替える
  const colorMode = React.useMemo(() => ({
    toggleColorMode: () => {
      setMode((prevMode: string) => (prevMode === 'light' ? 'dark' : 'light'));
    },
  }
  ), []);

  //localStorageに保存
  React.useEffect(() => {
    if (mode === "dark") {
      localStorage.setItem("colorMode", "dark");
    } else {
      localStorage.setItem("colorMode", "light");
    }
  }, [mode]);

  // テーマの適応とダークモード時の背景
  const Theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: mode,
          background: {
            default: mode === "dark" ? "#121212" : "#fafafa",
            paper: mode === "dark" ? "#121212" : "#fafafa",
          },
        },
      }),
    [mode],
  );

  return (
    <>
      <GlobalStyles styles={{ body: { margin: 0, padding: 0 } }} />
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={Theme} >
          <CssBaseline />
          <Header />
          <Routes>
            <Route path="/" element={<Table year="2022" />} />
            <Route path="/2021" element={<Table year="2021" />} />
            <Route path="/2022" element={<Table year="2022" />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  );
};