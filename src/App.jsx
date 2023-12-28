// import { useState } from "react";
import "./App.css";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Content } from "./Content";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <Header />
        <Content />
        <Footer />
      </div>
    </>
  );
}

export default App;
