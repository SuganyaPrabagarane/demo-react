import {useEffect, useState} from 'react';
import BookCard from "../components/Books/BookCard";
import axios from 'axios';
import { useNavigate } from 'react-router';
import Cart from './Cart';

const BookList =({booksData,onPriceChange,onToggleChange,handleWishlist,counter}) =>{
 
    const [searchValue, setsearchValue] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [stockFilter, setStockFilter] = useState('all');
   
    const navigate = useNavigate();

    //cart wishlist
    const cartEventHandler = ()=>{
        console.log('cart on click event triggered');
        navigate('/books/cart');

    };
    const eventHandler = (id)=>{
        console.log("Read more button was clicked",id);
        navigate(`/books/${id}`);

    };

    const searchHandler = (event) =>{
        setsearchValue(event.target.value);
       
    }

    const filteredBooks = booksData.filter((book) => {
        const search = searchValue.toLowerCase();
        // return (
        //   book.title.toLowerCase().includes(search) ||   
        //   book.author.toLowerCase().includes(search)
        // );
        
        const searchMatches = book.title.toLowerCase().includes(search) || book.author.toLowerCase().includes(search);
        const favoriteCheckBox = !isChecked || book.isFavorite;

        const matchStatus = 
        stockFilter === 'all' 
        ? true : 
        stockFilter === 'in-stock' 
        ? book.inStock : !book.inStock;

        return (searchMatches && favoriteCheckBox && matchStatus);

      });


    return (
        <>
         <div className='books'>

            <h2>Books Catalog</h2>

            <div className='add-wishlist'>

                {/* <Cart counter={counter}/> */}
                <div className='cart-image' onClick={cartEventHandler}>
                    <img src='/src/imgaes/cart-icon1.png' alt='cart image' width='100' height='90'/>
                <p className='counter-para'>{counter}</p>
                </div>

            </div>

            <label htmlFor='search'>Search</label>
            <input type='text' id='search' name='search' value={searchValue} onChange = {searchHandler}></input>

            <div className='checkbox'>
                <label htmlFor='favorite'>Is Favorite</label>
                <input type='checkbox' value={isChecked} onChange={() => setIsChecked(!isChecked)}></input>
       
                <label htmlFor='favorite'>Stock</label>
                <select value={stockFilter} onChange={(e) => setStockFilter(e.target.value)}>
                    <option value='all'>All</option>
                    <option value='in-stock'>In Stock</option>
                    <option value='out-of-stock'>Out of Stock</option>
                </select>
            </div>
         

        </div>
            

            <div className="bookList">
            {filteredBooks.length > 0 ? (
            filteredBooks.map((book) => (
                  <BookCard key = {book.id} 
                  {...book}  //Here using SPREAD operator to pass Props value and it should be same name with array attributes
                  onEventHandler = {()=>eventHandler(book.id)} 
                  onToggleStock={() => onToggleChange(book.id, 'inStock')} 
                  onToggleFavorite = {() => onToggleChange(book.id, 'isFavorite')}  
                  onHandlePriceChange = {(id, newPrice) => onPriceChange(id, newPrice)}
                  onHandleWishlist = {() => handleWishlist(book.id)}
                  /> 
            ))
            ) : (
                <p>No matching books found. Try another search.</p>
              )}
              
       
        </div>

        </>
    )
}

export default BookList;