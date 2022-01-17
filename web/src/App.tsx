import React, { useEffect, useState } from 'react';
import { List } from "./components/List";
import type { Syllabus } from "./types/syllabus";
import data from "./data.json"

export const App = () => {
  return (
    <div>
      {data.map(datas => (
        <List
          kougi={datas.kougi}
          nenji={datas.nenji}
          kikan={datas.kikan}
          numbering={datas.numbering}
          tantousya={datas.tantousya}
          link={datas.link}
        />
      ))}
    </div>
  );
};