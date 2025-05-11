import { useEffect,useState } from "react";
 
const Example=()=>{
 
    const[todos, setTodos] = useState([]);
    const[loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);
 
    useEffect(() => {fetch("https://jsonplaceholder.typicode.com/todos")
    .then((res) => res.json())
    .then(setTodos) // Updates posts state
    .catch(console.error) // Logs errors
    .finally(() => setLoading(false)); // Stops loading indicator
    }, []);


    useEffect(() => {fetch("https://jsonplaceholder.typicode.com/users")
        .then((res) => res.json())
        .then(setUsers) // Updates posts state
        .catch(console.error) // Logs errors
        .finally(() => setLoading(false)); // Stops loading indicator
        }, []);
    
        console.log('Todos:' , todos);
        console.log('Users:' , users);


    return loading ?
    (<p>Loading...</p>) : (
    <div>
        {users.map(user => (
            <div key={user.id}>
                <h2>{user.name}</h2>
                <h3>Todos</h3>
                {todos
                .filter( todo => todo.userId === user.id) 
                .sort((a,b) => a.completed - b.completed) 
                .map(todo => {
                    if(todo.completed){
                        return <p key={todo.id}>{todo.title} ✅</p>
                    } else{
                        return <p key={todo.id}>{todo.title} ❌</p>
                    }

        
                
                    
                })}
            </div>

        ))}
    </div>
);

}


export default Example;