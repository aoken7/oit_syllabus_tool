import { List } from "./components/List";
import { GlobalStyles } from "@mui/material";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import datas from "./data.json"

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
        <div>
          {datas.map(data => (
            <List
              kougi={data.kougi}
              nenji={data.nenji}
              kikan={data.kikan}
              //tani={data.tani}
              tantousya={data.tantousya}
              //gakka={data.gakka}
              numbering={data.numbering}
              link={data.link}
            />
          ))}
        </div>
      </ThemeProvider>
    </>
  );
};