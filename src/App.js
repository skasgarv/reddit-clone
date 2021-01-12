import './App.css';

import {BrowserRouter as Router} from 'react-router-dom';

import HeaderComponent from "./header/headerComponent";
import history from "./history";
import Routes from "./router";

function App() {
  console.log(history.location.search)
  return (
    <div className="App">
      <HeaderComponent></HeaderComponent>
      <Router>
        <Routes></Routes>
      </Router>
    </div>
  );
}

export default App;
