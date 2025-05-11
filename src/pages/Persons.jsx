import BoxList from '../components/Box/BoxList';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
const Persons = () =>{
    return(
        <>
        <Header logo='Suganya Prabagarane'/>
        <main>
       <BoxList />
        </main>
        <Footer year='2025K'/>
        </>
    )
}

export default Persons;