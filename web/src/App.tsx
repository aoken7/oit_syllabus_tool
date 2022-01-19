import List from "./components/List";
import SearchAppBar from "./components/SearchBar";
import { GlobalStyles } from "@mui/material";

export const App = () => {
  return (
    <>
      <GlobalStyles styles={{body: {margin:0,padding:0}}} />
      <SearchAppBar />
      <List />
    </>
  );
};