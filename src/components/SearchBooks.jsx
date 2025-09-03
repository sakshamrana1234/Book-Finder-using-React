import { useState } from "react";
import { FaAngellist } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { BooksActions } from "../store/BookSlice";
const SearchBooks=()=>{
  const [bookName,setBookName]=useState("");
  const [bookMessage,setBookMessage]=useState("")
  const dispatch=useDispatch();
  const searchBar=()=>{
   let Message="";
  if(bookName.toLowerCase().trim()==="hilarious book-titles & authors")      
    { 
      Message="Hilarious book-titles & authors"
      
    }
    else if(bookName.toLowerCase().trim()==="a gossip on book-titles"){
    Message="A gossip on book-titles"
      
    }
    else if(bookName.toLowerCase().trim()==="pali book-titles and their brief designations"){
      Message="Pali book-titles and their brief designations"
     
    }
    else {
      Message="Not Found"
    }
   setBookMessage(Message)
dispatch(BooksActions.selectedBook(Message)) 

  }  
    
  return(
    
    <div className="Books container">
       <div>
        <input type="text" value={bookName} id="searchBar" placeholder="Search books . . ."  style={{width:"600px",padding:"8px", fontSize:"19px",margin:"0 0px 100px 330px "}} onChange={(e)=>setBookName(e.target.value)}/>
        <button style={{width:"90px",height:"40px",margin:"0px 0px 0px 10px "}} className="SearchButton" onClick={searchBar}>Search</button>
       </div>
      <div className="YourSearch"> Your search <FaAngellist />
      <div> <Link to ="http://localhost:5173/Details" className="bookMessage">
        <h5>{bookMessage}</h5> 
        </Link>
      </div>
      </div>
    </div>
    
  )
}
export default SearchBooks;