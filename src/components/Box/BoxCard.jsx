import './Box.css';
const BoxCard = ({name,title,age,animal,salary,id})=>{
    return (
     
      <div className="boxes">
      <div className="box">
        <p>Name: {name}</p>
        <p>Title: {title}</p>
        <p>Age: {age}</p>
        <p>Animal: {animal}</p>
        <p>Salary: {salary}</p>
        <p>ID: {id}</p>
      </div>
      </div>
     
    );
  
  }


  export default BoxCard;