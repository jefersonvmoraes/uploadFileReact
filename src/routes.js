import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PrivateRouter } from './privateRoute';
import { HomeScreen } from './Pages/homeScreen';
import { UploadScreen } from './Pages/uploadeScreen';
import { NotFoundScreen } from './Pages/notFound';



const Rotas = () => (
  <BrowserRouter>
    <Routes>
      <Route path='/'element={<HomeScreen/>}/>
      <Route path='/fileupload'element={<PrivateRouter><UploadScreen/></PrivateRouter>}/>
      <Route path='*'element={<NotFoundScreen/>}/>
    </Routes>
  </BrowserRouter>
)

export default Rotas;