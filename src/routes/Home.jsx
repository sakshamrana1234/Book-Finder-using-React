import FetchBooks from "../components/FetchBooks";
import HomeBooks from "../components/HomeBooks";
import SearchBooks from "../components/SearchBooks";

const Home=()=>{
return(<>
    
    <SearchBooks />
           <HomeBooks></HomeBooks>
          
          <FetchBooks />
       
      </>
) 

}
export default Home;