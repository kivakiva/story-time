const Profile = (props) => {
  return (
    <div className="flex flex-col items-center">
      <div className="avatar">
        <div className="mb-8 rounded-full w-40 h-40 ring ring-primary ring-offset-base-100 ring-offset-2">
          <img
            className="object-cover h-40 w-40 rounded-full"
            src="https://images.unsplash.com/photo-1611695434369-a8f5d76ceb7b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80"
            alt=""
          />
        </div>
      </div>
      <h2 className="card-title">Jerry</h2>
      <h2>Jerry@gmail.com</h2>
      <h2>reads: 34</h2>

      <div className="flex flex-row">
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-star"></i>
        <i className="fa-regular fa-star"></i>
      </div>
      <h2>listens: 20</h2>
      <div className="flex flex-row">
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-star"></i>
        <i className="fa-regular fa-star"></i>
      </div>

      <p>"Hi! I'm here to read the world to sleep!"</p>

      <p>member since Feb 11, 2022</p>
      <button className="btn btn-active" role="button" aria-pressed="true">
        Sign Out
      </button>
    </div>
  );
};
export default Profile;
