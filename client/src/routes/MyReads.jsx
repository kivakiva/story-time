import { Link, Outlet } from "react-router-dom";
import { useState } from "react";
import Reads from "./Reads";
import Listens from "./Listens";

const MyReads = (props) => {

  const [state, setState] = useState("listening")

  const listening = () => {
    console.log("listening");
    setState("listening")
  }
  const reading = () => {
    console.log("reading");
    setState("reading")
  }

  return (
    <main>
      <p>MyReads</p> 
      <span onClick={()=> listening()}>
        {state === "listening" ? <b>Listening</b> : <>Listening</> }
      </span> | 
      <span onClick={() => reading()}>
        { state === "reading" ? <b>Reading</b> : <>Reading</> }
      </span>
      { state === "reading" && <Reads /> }
      { state === "listening" && <Listens /> }
    </main>
  )
}
export default MyReads