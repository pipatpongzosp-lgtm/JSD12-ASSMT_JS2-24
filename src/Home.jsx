import { Link,useNavigate } from "react-router-dom"
import Hero from "./components/Hero";
import AdminButton from "./components/AdminButton";
import UserButton from "./components/UserButton";
import Navbar from "./components/Navbar";

function Home() {
  const navigate = useNavigate();
  const handlenavigate = useNavigate();
  return (
    <>
      <Navbar/>
      <Hero />
      {/* <button onClick={<AdminButton/>}></button>
      <button onClick={<UserButton/>}></button>
       */}
    </>
  )
}

export default Home
