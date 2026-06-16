import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaBook, FaCalendarDays, FaCheck, FaGlobe, FaLanguage, FaUserPen } from "react-icons/fa6";

const DetailCoverFallback=({book})=>(
  <div className="fallback-cover cover-theme-ink large-fallback-cover">
    <span className="cover-label">Book Finder</span>
    <strong>{book.title || "Untitled book"}</strong>
    <small>{book.author_name?.[0] || "Unknown author"}</small>
  </div>
)

const Details = () => {
  const selectedBook = useSelector((state) => state.books.chosenOne);
  const [imageFailed,setImageFailed]=useState(false);

  if (!selectedBook) {
    return (
      <section className="empty-details">
        <FaBook />
        <h2>No book selected yet.</h2>
        <p>Choose a book from the search results to see its full details.</p>
        <Link to="/" className="back-link"><FaArrowLeft /> Back to search</Link>
      </section>
    );
  }

  const authors=selectedBook.author_name?.join(", ") || "Unknown author";
  const languages=selectedBook.language?.slice(0,8).join(", ").toUpperCase() || "Language unavailable";

  return (
    <section className="details-page">
      <Link to="/" className="back-link"><FaArrowLeft /> Back to results</Link>
      <div className="details-layout">
        <div className="details-cover">
          {selectedBook.cover_i && !imageFailed ? (
            <img src={`https://covers.openlibrary.org/b/id/${selectedBook.cover_i}-L.jpg`} alt={`${selectedBook.title} cover`} onError={()=>setImageFailed(true)} />
          ) : (
            <DetailCoverFallback book={selectedBook} />
          )}
        </div>
        <div className="details-content">
          <span className="details-eyebrow">Selected book</span>
          <h1>{selectedBook.title}</h1>
          <div className="details-meta">
            <p><FaUserPen /> {authors}</p>
            <p><FaCalendarDays /> First published {selectedBook.first_publish_year || "year unavailable"}</p>
            <p><FaLanguage /> {languages}</p>
            <p><FaCheck /> {selectedBook.has_fulltext ? "Full text available" : "Full text not listed"}</p>
          </div>
          <div className="detail-stats">
            <div>
              <span>{selectedBook.edition_count || 0}</span>
              <p>Editions</p>
            </div>
            <div>
              <span>{selectedBook.ebook_access || "Unknown"}</span>
              <p>Ebook access</p>
            </div>
            <div>
              <span>{selectedBook.key || "Unavailable"}</span>
              <p>Work key</p>
            </div>
          </div>
          {selectedBook.key && (
            <a className="open-library-link" href={`https://openlibrary.org${selectedBook.key}`} target="_blank" rel="noreferrer">
              <FaGlobe /> View on Open Library
            </a>
          )}
        </div>
      </div>
    </section>
  );
};
export default Details;
