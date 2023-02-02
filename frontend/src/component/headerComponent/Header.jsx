import './header.css';
import Navbar from './navbar/Navbar';
import Titlebar from "./titlebar/Titlebar";

export default function Header(){
        return(
           <div>
                <Titlebar/>
                <Navbar/>
           </div>
        )
}