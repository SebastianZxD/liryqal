import { Routes, Route, Outlet } from 'react-router-dom';
import Home from './routes/home/home.component';
import Navbar from './routes/navigation/navigation.component';
import Authentication from './routes/authentication/authentication.component'

const Shop = () => {
  return (
    <div>
      <div>
        <h1>
          .I'm the shop page.
        </h1>
      </div>
      <Outlet/>
    </div>
  );
};

const App = () => {
  return (
    <Routes> 
      <Route path='/' element={<Navbar />}>
        <Route index element={<Home />}/>
        <Route path='shop' element={<Shop />}/>
        <Route path='auth' element={<Authentication />}/>
      </Route>
    </Routes>
  );
};

export default App;
