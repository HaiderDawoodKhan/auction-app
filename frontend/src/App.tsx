import React from 'react';
import './App.css';
import {Route,Routes,Navigate} from 'react-router-dom'
import {Login} from './pages/Login'
import {Signup} from './pages/Signup'
import {Home} from './pages/Home'
import { ChangePassword } from './pages/ChangePass';
import { CreateAuction } from './pages/CreateAuction';
import { SpecificAuction } from './pages/SpecificAuction';
import { Browse } from './pages/Browse';
import { Profile } from './pages/Profile';
import { RootState } from './store/store';
import { useSelector } from 'react-redux';


function App() {

  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  
  const renderProtectedRoute = (Component: React.ComponentType) => {
    return isAuthenticated ? <Component /> : <Navigate to='/signup'/>;
  };

  return (
    <div className="App">
      <Routes>
        <Route path = '/' element = {<Signup/>}/>
        <Route path='login' element = {<Login />}/>
        <Route path='signup' element = {<Signup/>}/>
        <Route path="/home" element={renderProtectedRoute(Home)}/>
        <Route path='/profile' element={renderProtectedRoute(Profile)}/>
        <Route path='/change/password'  element={renderProtectedRoute(ChangePassword)}/>
        <Route path='/auction/create' element= {renderProtectedRoute(CreateAuction)}/>
        <Route path='/browse' element={renderProtectedRoute(Browse)}/>
        <Route path='/auction/:id' element={renderProtectedRoute(SpecificAuction)}/>
      </Routes> 
    </div>
  );
}

export default App;
