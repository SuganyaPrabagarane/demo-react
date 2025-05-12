import './TodoCard.css';

const TodoCard = ({title, completed, username}) =>{

    return(
        <>
        <div className="todo-card">
            <h2>{title}</h2>
            <p>{username}</p>
            <div className='image'>
                <img src = {`https://robohash.org/${username}?set=set5&size=70x70`}/>
            </div>
            <p>{completed ? '✅ Completed' : '❌ Not Completed'}</p>
        </div>
        </>
    )
}

export default TodoCard;