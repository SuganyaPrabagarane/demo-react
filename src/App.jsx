import { createBrowserRouter, RouterProvider} from "react-router";
import { BrowserRouter, Routes, Route} from "react-router";
import {use, useState} from 'react';
import Root from "./pages/Root";
import About from "./pages/About";
import AddBookForm from "./pages/AddBookForm";
import BookList from './pages/BookList';
import NotFound from "./pages/NotFound";
import AxiosExample from "./pages/AxiosExample";
import Todos from "./pages/Todos";
import './App.css';
import { useEffect } from "react";
import axios from 'axios';
import BookDetail from "./pages/BookDetail";
import Cart from "./pages/Cart";


const App =()=>{
  const [booksData, setBooksData] = useState([]);
  const [counter, setCounter] = useState(0);

  const addWishlistHandler = (id) =>{
    console.log('Add wishlist handle triggered',id)
    setCounter(counter +1);
  }

  
  useEffect (() =>{
    axios.get('http://localhost:3002/books')
    .then((res) => { setBooksData(res.data)  })
    .catch((err) => console.error('Failed to fetch', err));
   
  }, []);

  const addBookHandler = (newBook) =>{
    console.log(booksData);
    setBooksData(prev => [ ...prev, newBook ]);
  }

  const handlePriceChange = (id, newPrice)=>{
    axios.patch(`http://localhost:3002/books/${id}`,{ price: newPrice })
    .then((res) => {
        setBooksData (prevBooks => 
            prevBooks.map(book=> book.id === id ? res.data : book));
    })
    .catch((err) => console.error('Failed to update new price:', err));

  }

  const handleToggleFields = (id, fieldName) =>{
    const book = booksData.find(b => b.id === id);
    if(!book) return;

    const updatedField = {[fieldName]: !book[fieldName]};

    axios.patch(`http://localhost:3002/books/${id}`,updatedField)
    .then(res => {
        setBooksData(prev => 
            prev.map((b) => (b.id === id ? res.data : b))
    );
     })
     .catch((err) => console.error(`Failed to update ${fieldName}:`, err));

  }


  // const router = createBrowserRouter([
  //   { path: "/", 
  //     element: <Root /> ,
  //     children: [ 
  //       { path: "/about", element: <About /> },
  //       { path: "/book", element: <BookList booksData = {booksData} setBooksData = {setBooksData} /> },
  //       { path: "/add", element: <AddBookForm onAddBook = {addBookHandler} /> },
  //       { path: "/axios", element: <AxiosExample /> },
  //       { path: "/todos", element: <Todos /> },
  //       { path: '/*', element: <NotFound />},
  //     ]},
    
   
  // ]);

  return (
    // <>
    //   <main>
    //     <RouterProvider router={router} 
    //   </main>
    //  </>

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Root />}>
                <Route index element={<About />} />
                <Route path="/books" 
                       element={ <BookList
                          booksData={booksData}
                          onToggleChange={handleToggleFields}
                          onPriceChange={handlePriceChange}
                          handleWishlist = {addWishlistHandler}
                          counter={counter}
                          
                          />  }              
                  />
                <Route path="/books/:id" element={<BookDetail />} />
                <Route path="/books/cart" element={<Cart />} />
                <Route path="/add"
                      element={<AddBookForm onAddBook={addBookHandler} />}
                  />
                <Route path="/todos" element={<Todos />} />
            </Route>
          </Routes>
        </BrowserRouter>


  );
}


export default App
