import BoxCard from "./BoxCard";
import {persons} from "../../data/personsData"

const BoxList = () =>{
    return(
        <>
             {persons.map((person)=>  (
        <BoxCard key={person.id} {...person} />
      ))}
        </>
    )
}

export default BoxList;
