import BookList from './BookList';
import { useState } from 'react';
import axios from 'axios';
import './Books.css';
import { books } from '../../data/bookData';


const BookCard =(props) =>{  // Destructuring and used rest operator
  // console.log(rest);

  const {id,title,author,price,genre,inStock,isFavorite,onEventHandler,onToggleStock,onToggleFavorite,onHandlePriceChange,...rest} = props;

const [isEditing, setIsEditing] = useState(false);
const [newPrice, setNewPrice] = useState(price);

  const eventHandler =()=>{
    console.log("You clicked 'Add Wishlist' button is clicked");
  }

  const handleSave = () =>{
    onHandlePriceChange(id, newPrice);

    // const updatedBook = { ...bookData, id, title, price:newPrice, genre, inStock, isFavorite};
    const updatedBook = { ...props, price:newPrice};

    axios.put(`http://localhost:3001/books/${id}`,updatedBook)
    .then((res) => {
      console.log(res.data);
    })

    setIsEditing(!isEditing);
  }

  const handleCancel = () => {
    setNewPrice(price);
    setIsEditing(!isEditing);
  };

  const isSaveDisabled =
    newPrice === "" || parseFloat(newPrice) === parseFloat(price);


 
    return(

      <>
        <div className="book">
          <h2> {title} </h2>
          <p className='favourite' onClick = {() =>onToggleFavorite(id)}>{isFavorite ? "❤️": "♡" }</p>
          <p> {author}</p>
          <p> {genre}</p> 

          <div className="bookCard-content">
          {!isEditing ?  
          (<p className='price'> {price} €</p>) :
          (<input type='text' value={newPrice} onChange={(e => setNewPrice(e.target.value))}></input>)}
          </div>

          
          <div className= {`stock ${inStock ? 'in-stock' : 'out-of-stock'}`}>
          <p  onClick = {() =>onToggleStock(id)}>{inStock ? 'In Stock 👍':'Out of stock 👎'}</p>
          </div>

          
          {/* <button onClick={()=> onEventHandler(id)}>Read More</button>   passing the id in child component*/}
          <div className='buttons'>
          <button onClick={onEventHandler}>Read More</button> 

          {!inStock && <button onClick ={eventHandler}>Add to wishlist</button>}
          {isEditing ?  ( 
            <>
              <button onClick = {handleSave} disabled = {isSaveDisabled}>Save</button> 
              <button onClick={handleCancel}>Cancel</button>
            </> )
           : (<button onClick={() => setIsEditing(!isEditing)}>Edit</button>
           )}

          </div>
          
        
        </div>
        </>
       
        
    );
}

export default BookCard;