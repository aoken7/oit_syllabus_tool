import { List } from "./components/List";
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
    <div>
      {datas.map(data => (
        <>
          <List
            kougi={data.kougi}
            nenji={data.nenji}
            kikan={data.kikan}
            numbering={data.numbering}
            tantousya={data.tantousya}
            link={data.link}
          />
          <ThemeProvider theme={darkTheme}>
            <CssBaseline />
          </ThemeProvider>
        </>
      ))}
    </div>
  );
};