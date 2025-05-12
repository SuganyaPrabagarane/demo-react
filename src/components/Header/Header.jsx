import { Link, NavLink } from 'react-router';
import './Header.css';
const Header = ({logo}) =>{
    return (
        <header>
            <div>
                <Link to = '/'>
            <h2>{logo}</h2>
            </Link>
            </div>
            <nav>
                <ul>
                    <li> <NavLink to = '/'>Home</NavLink></li>
                    <li> <NavLink to = '/todos'>Todos</NavLink></li>
                    <li> <NavLink to = '/book'>Books</NavLink></li>
                    <li> <NavLink to = '/add'>Add new Book</NavLink></li>
                    <li><NavLink to = '/about'>About</NavLink></li>
                </ul>
                </nav>
        </header>
    );
}

export default Header;