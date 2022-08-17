import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { store } from './store';
import App from './App';
import NoMatch from './components/NoMatch';
import Home from './features/petStore/home';
import Pets from './features/petStore/pets';
import Pet from './features/petStore/pet';
import About from './features/petStore/about';
import Contact from './features/petStore/contact';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route index element={<Home />} />
          <Route path='home' element={<Home />} />
          <Route path='pets/:petId' element={<Pet />} />
          <Route path='pets' element={<Pets />} />
          <Route path='about' element={<About />} />
          <Route path='contact' element={<Contact />} />
          <Route path='*' element={<NoMatch />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
);
