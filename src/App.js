
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from './Components/HomePage';
import Register from './Components/Register';
import Login from './Components/Login';

function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<HomePage/>}  ></Route>
    <Route path="/register" element={<Register/>} ></Route>
    <Route path="/login" element={<Login/>} ></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
