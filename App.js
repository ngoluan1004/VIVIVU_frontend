import logo from './logo.svg';
import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import HomePage from './Components/HomePage/HomePage';
import Authentication from './Components/Authentication/Authentication';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile } from './Store/Auth/Action';

function App() {

  const jwt = localStorage.getItem("jwt")
  const {auth} = useSelector(store=>store)
  const dispatch=useDispatch()
  const navigate = useNavigate();

  useEffect(() => {

    if(jwt) {
      dispatch(getUserProfile(jwt))
      navigate("/")
    }

  }, [auth.jwt])
  return (
    <div className="">
      <Routes>
        <Route path="/*" element={auth.user ? <HomePage /> : <Authentication />}>

        </Route>
      </Routes>
    </div>
  );
}

export default App;
