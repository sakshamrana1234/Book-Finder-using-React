import { Link } from "react-router-dom";
import { FaBookOpen, FaHouse, FaStore } from "react-icons/fa6";

const Header=()=>{
   return (<nav className="app-navbar navbar navbar-expand-lg">
  <div className="container-fluid nav-shell">
    <Link className="navbar-brand brand-mark" to="/"><FaBookOpen /> Book Finder</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav ms-auto nav-actions">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/"><FaHouse /> Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/Details"><FaStore /> Selected book</Link>
        </li>
      </ul>
    </div>
  </div>
</nav>
   )
}
export default Header;
