import React, { useEffect, useState } from 'react';
import { List } from "./components/List";
import axios from "axios";
import type { Syllabus } from "./types/syllabus";

export const App = () => {
  const [users, setUsers] = useState<Syllabus[]>([]);

  useEffect(() => {
    axios.get<Syllabus[]>("https://gist.githubusercontent.com/yashikota/1acd6ebfdcb9008af898ef9cb38f6782/raw/2abb87bd756c9bfb2f339dd54a4c38e5f5cd7581/oit").then((res) => {
      setUsers(res.data);
    })
  }, []);

  return (
    <div>
      {users.map(user => (
        <List
          kougi={user.kougi}
          nenji={user.nenji}
          kikan={user.kikan}
          numbering={user.numbering}
          tantousya={user.tantousya}
          link={user.link}
        />
      ))}
    </div>
  );
};