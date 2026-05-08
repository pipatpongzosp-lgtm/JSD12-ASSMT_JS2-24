import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <header>
      <nav className="bg-amber-800f flex flex-col ">
        <ul id="navbox">
          <li>
            <NavLink to="/">Home</NavLink>
           
          </li>
          <li>
            <NavLink to="/owner">Owner</NavLink>
           </li>
        </ul>
      </nav>
    </header>
  );
}
