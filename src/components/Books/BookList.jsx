import {useEffect, useState} from 'react';
import BookCard from "./BookCard";
import axios from 'axios';
// import {books} from "../../data/bookData"

const BookList =() =>{
     const [booksData, setbooksData] = useState([]);
    const [searchValue, setsearchValue] = useState('');
   
    useEffect (() =>{
        axios.get('http://localhost:3001/books')
        .then((res) => {
            setbooksData(res.data);
        })
    }, []);

    const eventHandler = (id)=>{
        console.log("Read more button was clicked",id);

    }

    const toggleStock = (id) =>{
        const updatedArray = booksData.map(book => book.id === id ? {...book, inStock: !book.inStock} : book);
        setbooksData(updatedArray);
    }

    const toggleFavorite = (id) =>{
        setbooksData(prevBooks => prevBooks.map(book=> book.id === id ? {...book, isFavorite: !book.isFavorite} : book));
    }


    const searchHandler = (event) =>{
        setsearchValue(event.target.value);

    }

    const handlePriceChange = (id, newPrice)=>{
        setbooksData(prevBooks => prevBooks.map(book=> book.id === id? {...book, price: parseFloat(newPrice)} : book));
    }

    const filteredBooks = booksData.filter((book) => {
        const search = searchValue.toLowerCase();
        return (
          book.title.toLowerCase().includes(search) ||
          book.author.toLowerCase().includes(search)
        );
      });

    return (
        <>
         <div className='books'>
            <h2>Books Catalog</h2>
            <label htmlFor='search'>Search</label>
            <input type='text' id='search' name='search' value={searchValue} onChange = {searchHandler}></input>
            <p>Your search word is: {searchValue}</p>
            

            <div className="bookList">
            {filteredBooks.length > 0 ? (
            filteredBooks.map((book) => (
                  <BookCard key = {book.id} {...book} onEventHandler={()=>eventHandler(book.id)} onToggleStock={toggleStock} onToggleFavorite = {toggleFavorite} onHandlePriceChange = {handlePriceChange}/> //Here using SPREAD operator to pass Props value and it should be same name with array attributes
            ))) 
            : (
                <p>No matching books found. Try another search.</p>
              )}
              
        </div>
        </div>

        </>
    )
}

export default BookList;