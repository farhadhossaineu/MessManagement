import { NavLink } from 'react-router-dom';
import './navbar.css';
export default function Navbar(){
        return(
            <div className="navbar">
                    <NavLink end to='/'  className='input'> Home Page </NavLink>
                    <NavLink end to='/bazar'  className='input'> Bazar List</NavLink>
                    <NavLink end to='/meal'  className='input'> Meal Count </NavLink>
                {/* <input type="button" value="Home Page" />
                <input type="button" value="Bazar List" />
                <input type="button" value="Meal Count" />
                <input className="last" type="button" value="Add Data" /> */}
            </div>
        )
}