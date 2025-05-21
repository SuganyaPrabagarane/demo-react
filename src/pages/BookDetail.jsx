import { useEffect, useState } from "react";
import BookCard from "../components/Books/BookCard";
import { useNavigate, useParams } from "react-router";
import axios from 'axios';


const BookDetail = () =>{

    const {id} = useParams();
    console.log(id);
    const[displayBook, setDisplayBook] = useState();
    const navigate = useNavigate();

    useEffect (() =>{
        axios.get(`http://localhost:3002/books/${id}`)
        .then((res)=>{
            setDisplayBook(res.data);
            console.log(res.data);
        })
        .catch(err => console.error('Failed to fetch book',err))
    }, [id])
    
    if(!displayBook) return ('Lodaing book details');


    return(
        <>
            <div className="container">
            <div className="book-detail">
                <div className="title">
                    <h2>{displayBook.title}</h2>
                </div>
                <p> <strong>Author: </strong>{displayBook.author}</p>
                <p> <strong>Price: </strong>{displayBook.price}</p>
                <p> <strong>Stock: </strong>{displayBook.inStock ? 'In Stock 👍' : 'out of Stock 👎'}</p>
                <p> <strong>Favorite: </strong>{displayBook.isFavorite ? '❤️' : '♡'}</p>
                <p> <strong>Genre: </strong>{displayBook.genre}</p>

                <div className="button">
                    <button className= 'save-btn' onClick={() => navigate(-1)}>Back</button>
                </div>
            </div>
            </div>
          

                
        

        </>
    );
}

export default BookDetail;