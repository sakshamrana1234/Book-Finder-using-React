import { useSelector } from "react-redux";

const HomeBooks=()=>{
  const books=useSelector((state)=>state.books.books)
  return (
    
<div className="FetchItems">
    <h2 >Books present in our store:</h2>
     {
      books.map((book)=>(
        <li key={book.author_key}>
          {book.title} {book.author_name ? `: by ${book.author_name.join(", ")}`:""}
        </li>
      ))
     }
  </div>
)}
export default HomeBooks;