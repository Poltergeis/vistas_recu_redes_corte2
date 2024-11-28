import logo from './logo.svg';
import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Login from './views/login';
import Register from './views/register';
import Dashboard from './views/Dashboard';

function App() {
  return (
    <BrowserRouter>
    <Routes>
        <Route Component={Login} path='/' />
        <Route Component={Register} path='/register' />
        <Route Component={Dashboard} path='/dashboard'/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
