import { List } from "./components/List";
import datas from "./data.json"

export const App = () => {
  return (
    <div>
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
    </div>
  );
};