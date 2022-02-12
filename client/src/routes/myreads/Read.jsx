const Read = (props) => {

  const { title, reader, status } = props;

  return (
    <div>
      <span>
      { title } | 
      </span>
      <span>
      { reader } | 
      </span>
      <span>
      status: {status }
      </span>
      <br/>
    </div>
  )

}
export default Read