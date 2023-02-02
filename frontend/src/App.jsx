import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './app.css';
import Header from './component/headerComponent/Header';
import Bazar from './component/sectionComponent/baxzarList/Bazar';
import Home from './component/sectionComponent/home/Home';
import Meal from './component/sectionComponent/meadCount/Meal';

export default function App(){
        return(
           <div>
                
                <BrowserRouter>
                <Header/>
                <Routes>
                        <Route path='/' element={<Home/>} />
                        <Route path='/meal' element={<Meal/>}/>
                        <Route path='/bazar' element={<Bazar/>}/>
                  </Routes>
                </BrowserRouter>
                {/* <Header/>
                <Home/>
                <Meal/>
                <Bazar/> */}
           </div>
        )
}