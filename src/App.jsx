import { createBrowserRouter, RouterProvider} from "react-router";
import {use, useState} from 'react';
import { books } from "./data/bookData";
import Root from "./pages/Root";
import About from "./pages/About";
import AddBookForm from "./pages/AddBookForm";
import BookList from './components/Books/BookList';
import NotFound from "./pages/NotFound";
import AxiosExample from "./pages/AxiosExample";
import Todos from "./components/Todos/Todos";
import './App.css';



const App =()=>{
  const [booksData, setBooksData] = useState(books);

  const addBookHandler = (newBook) =>{
    console.log(booksData);
    setBooksData(prev => [
      ...prev, {...newBook, id: Date.now(), inStock:true, isFavorite:false},
    ]);
  }

  const router = createBrowserRouter([
    { path: "/", 
      element: <Root /> ,
      children: [ 
        { path: "/about", element: <About /> },
        { path: "/book", element: <BookList booksData = {booksData} setBooksData = {setBooksData} /> },
        { path: "/add", element: <AddBookForm onAddBook = {addBookHandler} /> },
        { path: "/axios", element: <AxiosExample /> },
        { path: "/todos", element: <Todos /> },
        { path: '/*', element: <NotFound />},
      ]},
    
   
  ]);

  return (
    <>
      <main>
        <RouterProvider router={router} />
      </main>
     </>

  );
}


export default App
