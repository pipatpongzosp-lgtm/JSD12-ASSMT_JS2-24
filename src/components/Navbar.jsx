import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <header>
      <nav className="bg-amber-800 ">
        <ol id="navbox" className="flex flex-row gap-6 font-bold justify-end">
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
