import { useState } from "react";
import { useDispatch } from "react-redux";
import { BooksActions } from "../store/BookSlice";
import { FaBookOpen, FaMagnifyingGlass } from "react-icons/fa6";
const SearchBooks=()=>{
  const [bookName,setBookName]=useState("");
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState("");
  const dispatch=useDispatch();

  const sortBooksByCover=(books)=>{
    return [...books].sort((firstBook,secondBook)=>Number(Boolean(secondBook.cover_i))-Number(Boolean(firstBook.cover_i)));
  }

  const searchBar=async(e, queryOverride)=>{
    e?.preventDefault();
    const query=(queryOverride || bookName).trim();
    if(!query){
      setError("Type a title, author, subject, or ISBN to search.");
      return;
    }

    setLoading(true);
    setError("");
    try{
      const res=await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=18`);
      const data=await res.json();
      dispatch(BooksActions.addInitialBooks(sortBooksByCover(data.docs || [])));
      if(!data.docs?.length){
        setError("No books found. Try a broader title or author name.");
      }
    }
    catch(err){
      console.error("Error searching books:",err);
      setError("Search failed. Please check your connection and try again.");
    }
    finally{
      setLoading(false);
    }

  }  

  const quickSearch=(query)=>{
    setBookName(query);
    searchBar({ preventDefault: () => {} }, query);
  };
    
  return(
    
    <section className="search-hero">
      <div className="hero-content">
        <div className="hero-kicker"><FaBookOpen /> Open Library search</div>
        <h1>Find your next book faster.</h1>
        <p>Search by title, author, subject, or ISBN and browse live results from Open Library.</p>
        <form className="search-panel" onSubmit={searchBar}>
          <FaMagnifyingGlass className="search-icon" />
          <input type="search" value={bookName} id="searchBar" placeholder="Search for Atomic Habits, Jane Austen, fantasy, 978..." onChange={(e)=>setBookName(e.target.value)}/>
          <button className="SearchButton" type="submit" disabled={loading}>{loading ? "Searching" : "Search"}</button>
        </form>
        {error && <p className="search-error">{error}</p>}
        <div className="quick-searches" aria-label="Popular searches">
          {["Harry Potter","Agatha Christie","Science fiction","Indian history"].map((item)=>(
            <button type="button" key={item} onClick={()=>quickSearch(item)}>{item}</button>
          ))}
        </div>
      </div>
    </section>
    
  )
}
export default SearchBooks;
