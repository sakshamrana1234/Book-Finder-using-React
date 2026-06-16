import { useEffect, useState } from "react"
import{useDispatch} from "react-redux"
import { BooksActions } from "../store/BookSlice";
const FetchBooks=()=>{
  const dispatch=useDispatch();
  const [loading,setLoading]=useState(true);
  const fallbackBooks=[
    {
      title:"Harry Potter and the Philosopher's Stone",
      author_name:["J. K. Rowling"],
      first_publish_year:1997,
      language:["eng"],
      cover_i:10521270,
      edition_count:451,
      ebook_access:"borrowable",
      has_fulltext:true,
      key:"/works/OL82563W",
    },
    {
      title:"The Hobbit",
      author_name:["J. R. R. Tolkien"],
      first_publish_year:1937,
      language:["eng"],
      cover_i:6979861,
      edition_count:857,
      ebook_access:"borrowable",
      has_fulltext:true,
      key:"/works/OL262758W",
    },
    {
      title:"The Lord of the Rings",
      author_name:["J. R. R. Tolkien"],
      first_publish_year:1954,
      language:["eng"],
      cover_i:14627502,
      edition_count:407,
      ebook_access:"borrowable",
      has_fulltext:true,
      key:"/works/OL27448W",
    },
    {
      title:"Dune",
      author_name:["Frank Herbert"],
      first_publish_year:1965,
      language:["eng"],
      cover_i:12645194,
      edition_count:335,
      ebook_access:"borrowable",
      has_fulltext:true,
      key:"/works/OL893415W",
    },
    {
      title:"The Hunger Games",
      author_name:["Suzanne Collins"],
      first_publish_year:2008,
      language:["eng"],
      cover_i:12646518,
      edition_count:248,
      ebook_access:"borrowable",
      has_fulltext:true,
      key:"/works/OL5735363W",
    },
    {
      title:"Jurassic Park",
      author_name:["Michael Crichton"],
      first_publish_year:1990,
      language:["eng"],
      cover_i:10510468,
      edition_count:171,
      ebook_access:"borrowable",
      has_fulltext:true,
      key:"/works/OL46833W",
    },
    {
      title:"The Lion, the Witch and the Wardrobe",
      author_name:["C. S. Lewis"],
      first_publish_year:1950,
      language:["eng"],
      cover_i:9255566,
      edition_count:383,
      ebook_access:"borrowable",
      has_fulltext:true,
      key:"/works/OL135048W",
    },
    {
      title:"The Lightning Thief",
      author_name:["Rick Riordan"],
      first_publish_year:2005,
      language:["eng"],
      cover_i:13163023,
      edition_count:210,
      ebook_access:"borrowable",
      has_fulltext:true,
      key:"/works/OL82586W",
    },
    {
      title:"Life of Pi",
      author_name:["Yann Martel"],
      first_publish_year:2001,
      language:["eng"],
      cover_i:10301343,
      edition_count:204,
      ebook_access:"borrowable",
      has_fulltext:true,
      key:"/works/OL573536W",
    },
    {
      title:"Ready Player One",
      author_name:["Ernest Cline"],
      first_publish_year:2011,
      language:["eng"],
      cover_i:8231856,
      edition_count:98,
      ebook_access:"borrowable",
      has_fulltext:true,
      key:"/works/OL16059589W",
    },
    {
      title:"The Martian",
      author_name:["Andy Weir"],
      first_publish_year:2011,
      language:["eng"],
      cover_i:8231990,
      edition_count:105,
      ebook_access:"borrowable",
      has_fulltext:true,
      key:"/works/OL16844789W",
    },
    {
      title:"Little Women",
      author_name:["Louisa May Alcott"],
      first_publish_year:1868,
      language:["eng"],
      cover_i:12646511,
      edition_count:1096,
      ebook_access:"borrowable",
      has_fulltext:true,
      key:"/works/OL23367W",
    },
  ];
  const popularTitles=[
    "harry potter",
    "lord of the rings",
    "the hobbit",
    "jurassic park",
    "hunger games",
    "dune",
    "narnia",
    "percy jackson",
    "life of pi",
    "the martian",
    "ready player one",
    "little women",
    "the shining",
    "maze runner",
    "twilight",
  ];

  const removeDuplicateBooks=(books)=>{
    const seenBooks=new Set();
    return books.filter((book)=>{
      const bookId=book.key || `${book.title}-${book.author_name?.[0]}`;
      if(seenBooks.has(bookId)){
        return false;
      }
      seenBooks.add(bookId);
      return true;
    });
  }

  const sortPopularCoveredBooks=(books)=>{
    return books
      .filter((book)=>book.cover_i && book.title && book.author_name?.length)
      .sort((firstBook,secondBook)=>{
        const firstTitle=firstBook.title.toLowerCase();
        const secondTitle=secondBook.title.toLowerCase();
        const firstScore=popularTitles.some((title)=>firstTitle.includes(title)) ? 1 : 0;
        const secondScore=popularTitles.some((title)=>secondTitle.includes(title)) ? 1 : 0;
        return secondScore - firstScore;
      });
  }

  useEffect(()=>{
    const fetchBooks=async()=>{
      try{
      const starterQuery="harry potter lord rings hobbit dune narnia hunger games jurassic park";
      const res= await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(starterQuery)}&limit=80`)
      if(!res.ok){
        throw new Error(`Open Library returned ${res.status}`);
      }
      const data =await res.json()
      const books=sortPopularCoveredBooks(removeDuplicateBooks(data.docs || [])).slice(0,18);
   
      dispatch(BooksActions.addInitialBooks(books.length ? books : fallbackBooks))
      setLoading(false);
      }
    catch (err){
      console.error("Error fetching books:",err)
      dispatch(BooksActions.addInitialBooks(fallbackBooks))
      setLoading(false);
    }
  };
  fetchBooks();
  },[dispatch]);
  if (loading)  return <p>Loading books...</p>;
  return null;
}

export default FetchBooks;
