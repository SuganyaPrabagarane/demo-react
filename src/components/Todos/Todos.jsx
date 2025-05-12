import { useEffect,useState } from "react";
import TodoCard from "./TodoCard";
import axios from "axios";
 
const Todos=()=>{
 
    const[todos, setTodos] = useState([]);
    const[loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);

    const [statusFilter, setStatusFilter] = useState('all');
    const [userFilter, setUserFilter] = useState('all');

    // wait to load the data
    const simulateLoading = (callback) =>{
        setTimeout(callback, 2000);
    };
    

 
    useEffect(() => {
        axios.get("https://jsonplaceholder.typicode.com/todos")
        .then(res => setTodos(res.data))
        .catch(console.error);

    }, []);


    useEffect(() => {fetch("https://jsonplaceholder.typicode.com/users")
        .then((res) => res.json())
        .then(setUsers) // Updates posts state
        .catch(console.error) // Logs errors
        // .finally(() => setLoading(false)); // Stops loading indicator
        }, []);
    
    useEffect(() => {
        if(todos.length && users.length){
            simulateLoading(() => setLoading(false));

        }
    }, [todos, users]);

        console.log('Todos:' , todos);
        console.log('Users:' , users);


    const filteredData = todos.filter(todo => {
        const matchStatus = 
            statusFilter === 'all' 
            ? true 
            : statusFilter === 'completed' 
            ? todo.completed :  !todo.completed;
        
        const matchUser = userFilter === 'all' ? true : todo.userId === Number(userFilter);

        return matchStatus && matchUser;
    });


    return loading ? (
    
    <div className="loading-container">   
        <p className="loading"></p>
    </div> ) 
    
    : (
        
    <div>
        <div className="filters">
            <label for = 'filter-status'>Filter by status</label>
            <select value={statusFilter} onChange = {(e) => setStatusFilter(e.target.value)} >
                <option value = 'all'>All</option>
                <option value='completed'> Completed</option>
                <option value='not-completed'>Not Completed</option>
            </select >

            <label for = 'filter-user'>Filter by User</label>
            <select value = {userFilter} onChange={(e) => setUserFilter(e.target.value)}>
                <option value = 'all'>All</option>
                {users.map(user => (
                    <option key={user.id} value = {user.id}>{user.name}</option>
                    ))}
            </select>
            </div>

            <div className="todo-list">

            {filteredData.map(todo => {
                const user = users.find(user => user.id === todo.userId);

                return (
                <TodoCard key={todo.id}
                 username = {user?.name || 'Unknown'}  
                 title={todo.title} completed={todo.completed}/>)
            })}

            </div>
       

    </div>
);

}


export default Todos;