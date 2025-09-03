import { useSelector } from "react-redux";

const Details = () => {
  const bookMessage = useSelector((state) => state.books.chosenOne);
  const books = useSelector((state) => state.books.books);
  console.log(" bookMessage value:", bookMessage, "type:", typeof bookMessage);

  let BooksFiltered = [];
  if (typeof bookMessage === "string" && bookMessage.trim() !== "") {
    BooksFiltered = books.filter(
      (book) => book.title?.toLowerCase() === bookMessage.toLowerCase()
    );
  }
  if (BooksFiltered.length === 0) {
    return (
      <p className="NoDetails">
        <strong>NO details found for this book.</strong>
      </p>
    );
  }
  return (
    <div className="BookDetails">
      <h2 className="TopMessage">It's good to see you have found your book</h2>
      <p>
        <strong>Title: </strong>
        {BooksFiltered[0].title}
      </p>
      <p>
        <strong>Author: </strong>
        {BooksFiltered[0].author_name?.join(",")}
      </p>
      <p>
        <strong>First Published: </strong>
        {BooksFiltered[0].first_publish_year}
      </p>
  
      <p>
        <strong>Language: </strong>
        {BooksFiltered[0].language?.join(",")}
      </p>
      <p>
        <strong>Ebook Access: </strong>
        {BooksFiltered[0].ebook_access}
      </p>
      <p>
        <strong>EditionCount: </strong>
        {BooksFiltered[0].edition_count}
      </p>
      <p>
        <strong>Has Fulltext: </strong>
        {BooksFiltered[0].has_fulltext ? "True" : "False"}
      </p>
      <p>
        <strong>Work key: </strong>
        {BooksFiltered[0].key}
      </p>
    </div>
  );
};
export default Details;
