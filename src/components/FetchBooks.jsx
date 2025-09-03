import { useEffect, useState } from "react"
import{useDispatch} from "react-redux"
import { BooksActions } from "../store/BookSlice";
const FetchBooks=()=>{
  const dispatch=useDispatch();
  const [loading,setLoading]=useState(true);
  useEffect(()=>{
    const fetchBooks=async()=>{
      try{
    const res= await fetch("https://openlibrary.org/search.json?title=%7BbookTitle")
    const data =await res.json()
   
      dispatch(BooksActions.addInitialBooks(data.docs))
      setLoading(false);
      }
    catch (err){
      console.error("Error fetching books:",err)
      setLoading(false);
    }
  };
  fetchBooks();
  },[dispatch]);
  if (loading)  return <p>Loading books...</p>;
  return null;
}

export default FetchBooks;