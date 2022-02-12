import Timeago from "react-timeago"

const Offer = (props) => {
  
  const {name, message, rating, reads, dateOffered } = props;
  
  return (
    <div style={{border: "1px solid black"}}>
      <div>{name}</div>
      <div>Rating: {rating}</div>
      <div>Reads: {reads}</div>
      <div>"{message}"</div>
      <button>Accept</button>
      <button>Ignore</button>
      <div><Timeago date={dateOffered} /></div>
    </div>
  )
}
export default Offer