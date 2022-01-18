import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import SearchAppBar from './components/SearchBar';
import ReactVirtualizedTable from './components/VirtualizedTable';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

ReactDOM.render(
  <React.StrictMode>
    <SearchAppBar />
    <ReactVirtualizedTable />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorkerRegistration.register();