import BookList from '../components/Books/BookList';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

const Books = () =>{
    return(
        <>
        <Header logo='Suganya Prabagarane'/>
        <main>
        <BookList />
        </main>
        <Footer year='2025K'/>
        </>
    )
}

export default Books;