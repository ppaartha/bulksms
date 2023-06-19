import './App.css';
import Header from './Header';
import Menu from './Menu.js';
import Form from './Form.js';
import Dashboard from './Dashboard.js';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";


function App() {
  return (

      <BrowserRouter>
      <Header/>
        <Menu/>
          <Routes>
            <Route exact path="/" element={<Form />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>

      </BrowserRouter>

  );
}

export default App;
