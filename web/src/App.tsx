import { Routes, Route, Navigate } from 'react-router-dom';
import About from './components/About';
import { Table } from "./components/Table";
import { GlobalStyles } from "@mui/material";
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from "./components/Header";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import useMediaQuery from '@material-ui/core/useMediaQuery/useMediaQuery';
import React from 'react';

export const App = props => {
  //システム環境に合わせたテーマに設定（優先度低）
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const SysTheme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );

  //トグルボタンでテーマを切り替える（優先度高）
  const { Theme } = props;

  return (
    <>
      <GlobalStyles styles={{ body: { margin: 0, padding: 0 } }} />
      <ThemeProvider theme={SysTheme} >
        <ThemeProvider theme={Theme} >
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
      </ThemeProvider>
    </>
  );
};