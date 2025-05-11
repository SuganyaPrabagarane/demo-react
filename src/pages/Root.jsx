import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import { Outlet } from 'react-router';

const Root = () =>{
    return(
        <>
        <Header logo='Suganya Prabagarane'/>
        <main>
        <Outlet />
        </main>
        <Footer year='2025K'/>
        </>
    )
}

export default Root;