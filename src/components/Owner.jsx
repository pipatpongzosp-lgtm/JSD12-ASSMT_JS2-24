import Navbar from "./Navbar";
import mayuri from "../meme/mayuri.jpg";

function Owner() {
  return (
    <section>
      <Navbar />
      <div id="layoutowner">
        <div id="name"></div>
        <div id="image">
          <img src={mayuri} alt="Status eiei" />
        </div>
      </div>
      <div id="about" className="">
        <p >My status is Nu ja Crazy</p>  
        <br/>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum ipsa
          maiores possimus odio vero aliquid, libero officia dicta quaerat eos
          eum minima! Doloribus ratione neque perferendis illo ipsam, sit autem.
        </p>
      </div>
    </section>
  );
}

export default Owner;
