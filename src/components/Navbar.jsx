import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <header>
      <nav className="bg-amber-800f flex flex-row ">
        <ol id="navbox">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/owner">Owner</NavLink>
          </li>
        </ol>
      </nav>
    </header>
  );
}
