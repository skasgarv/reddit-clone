import './App.css';

import {BrowserRouter as Router} from 'react-router-dom';

import HeaderComponent from "./header/headerComponent";
import Routes from "./router";

function App() {
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
