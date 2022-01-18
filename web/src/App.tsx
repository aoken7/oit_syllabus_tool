import { List } from "./components/List";
import datas from "./data.json"
import SearchAppBar from "./components/SearchBar";
import { GlobalStyles } from "@mui/material";

export const App = () => {
  return (
    <>
      <GlobalStyles styles={{body: {margin:0,padding:0}}} />
      <div className="App">
        <SearchAppBar />
      </div>
      {datas.map(data => (
          <List
            kougi={data.kougi}
            nenji={data.nenji}
            kikan={data.kikan}
            numbering={data.numbering}
            tantousya={data.tantousya}
            link={data.link}
          />
      ))}
    </>
  );
};