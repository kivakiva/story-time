const Read = (props) => {

  const { title, reader, status } = props;

  return (
    <container>
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
    </container>
  )

}
export default Read