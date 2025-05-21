import { useNavigate } from "react-router";
const Cart =({counter}) =>{

    const navigate = useNavigate();

    const cartEventHandler = ()=>{
        console.log('cart on click event triggered')

    };

    return(
        <>
            {/* <div className='cart-image' onClick={cartEventHandler}>
                <img src='/src/imgaes/cart-icon1.png' alt='cart image' width='100' height='90'/>
                <p className='counter-para'>{counter}</p>
            </div> */}
            <button onClick={() =>navigate(-1)}>Back</button>
        </>
    )
}


export default Cart;