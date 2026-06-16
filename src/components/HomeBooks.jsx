import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BooksActions } from "../store/BookSlice";
import { FaArrowRight, FaBook } from "react-icons/fa6";

const HomeBooks=()=>{
  const books=useSelector((state)=>state.books.books)
  const dispatch=useDispatch();
  const visibleBooks=books.filter((book)=>book.cover_i).slice(0,18);

  const selectBook=(book)=>{
    dispatch(BooksActions.selectedBook(book));
  }

  const hideBrokenCover=(event)=>{
    event.currentTarget.closest(".book-result")?.remove();
  }

  return (
    <section className="results-section">
      <div className="section-heading">
        <span><FaBook /> Curated results</span>
      </div>
      <div className="book-grid">
        {
          visibleBooks.map((book,index)=>(
            <article className="book-result" key={`${book.key || book.title}-${index}`}>
              <div className="book-cover">
                <img src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`} alt={`${book.title} cover`} loading="lazy" onError={hideBrokenCover} />
              </div>
              <Link className="details-link" to="/Details" onClick={()=>selectBook(book)}>
                Details <FaArrowRight />
              </Link>
            </article>
          ))
        }
      </div>
    </section>
  )
}
export default HomeBooks;
