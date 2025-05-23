import { useState } from 'react';
import './Books.css';

const BookCard =(props) =>{  

  const {id,title,author,price,genre,inStock,isFavorite,onEventHandler,onToggleStock,onToggleFavorite,onHandlePriceChange,onPriceChange,onHandleWishlist,...rest} = props; // Destructuring and used rest operator
  // console.log(rest);

  const [isEditing, setIsEditing] = useState(false);
  const [newPrice, setNewPrice] = useState(price);

  const eventHandler =()=>{
    console.log("You clicked 'Add Wishlist' button is clicked");
   
  }
  
  const handleSave = () => {
    onHandlePriceChange(id, parseFloat(newPrice));
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
          <p className='favourite' onClick = {onToggleFavorite}>{isFavorite ? "❤️": "♡" }</p>
          <p> {author}</p>
          <p> {genre}</p> 

          <div className="bookCard-content">
          {!isEditing ?  
          (<p className='price'> {price} €</p>) :
          (<input type='text' value={newPrice} onChange={(e => setNewPrice(e.target.value))}></input>)}
          </div>

          
          <div className= {`stock ${inStock ? 'in-stock' : 'out-of-stock'}`}>
          <p  onClick = {onToggleStock}>{inStock ? 'In Stock 👍':'Out of stock 👎'}</p>
          </div>

          
          {/* <button onClick={()=> onEventHandler(id)}>Read More</button>   passing the id in child component*/}
          <div className='buttons'>

            <button onClick={onEventHandler} >Read More</button> 
            {inStock && <button onClick ={onHandleWishlist} >Add to wishlist</button>}
            

            {isEditing ?  ( 
              <>
                <button onClick = {handleSave} disabled = {isSaveDisabled}>Save</button> 
                <button onClick={handleCancel}>Cancel</button>
              </>
             ) : (
              <button onClick={() => setIsEditing(!isEditing)}>Edit</button>
            )}

          </div>
          
        
        </div>
        </>
       
        
    );
}

export default BookCard;