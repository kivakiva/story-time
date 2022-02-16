import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import StarRating from "./shared/StarRating";

const Profile = (props) => {
  const userID = localStorage.getItem("userID");
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [imgURL, setImgURL] = useState();
  const [editName, setEditName] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [editImgURL, setEditImgURL] = useState(false);
  const [saved, setSaved] = useState(true);

  const [profile, setProfile] = useState();

  useEffect(() => {
    if (saved) {
      axios.get(`/users/${userID}`).then((result) => {
        setProfile({ ...result.data.user });
        // console.log({ ...result.data.user });
        setSaved(false);
      });
    }
  }, [saved]);

  useEffect(() => {
    if (profile) {
      // console.log(profile);
    }
  }, [profile]);

  const signout = () => {
    axios.post("/api/users/logout");
  };

  const editNameHander = () => {
    setEditName((prev) => !prev);
    setName(profile.name);
  };
  const nameChangeHandler = (e) => {
    setName(e.target.value);
  };

  const editEmailHander = () => {
    setEditEmail((prev) => !prev);
    setEmail(profile.email);
  };
  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  const editImgURLHander = () => {
    setEditImgURL((prev) => !prev);
    console.log("HERE", profile.image_url);
    setImgURL(profile.image_url);
  };
  const imgURLChangeHandler = (e) => {
    setImgURL(e.target.value);
  };

  const saveProfile = () => {
    axios({
      method: "put",
      url: `/users/${localStorage.getItem("userID")}`,
      headers: {},
      data: {
        image_url: editImgURL ? imgURL : profile.image_url,
        name: editName ? name : profile.name,
        email: editEmail ? email : profile.email,
      },
    }).then(() => {
      console.log("SAVED!");
      setSaved(true);
      setEditEmail(false);
      setEditImgURL(false);
      setEditName(false);
    });
  };

  return (
    <div>
      {profile && (
        <div className="flex flex-col items-center">
          {(editName || editEmail || editImgURL) && (
            <button
              className="btn btn-active mt-4"
              role="button"
              aria-pressed="true"
              onClick={saveProfile}
            >
              Save
            </button>
          )}

          {editImgURL ? (
            <input className="m-16" onChange={imgURLChangeHandler} type="text" value={imgURL} />
          ) : (
            <div onClick={editImgURLHander} className="avatar mt-6">
              <div className="mb-8 rounded-full w-48 h-48 ring ring-primary ring-offset-base-100 ring-offset-2">
                <img
                  className="object-cover h-48 w-48 rounded-full"
                  src={profile.image_url}
                  alt=""
                />
              </div>
            </div>
          )}

          {editName ? (
            <input onChange={nameChangeHandler} type="text" value={name} />
          ) : (
            <h2 onClick={editNameHander} className="card-title">
              {profile.name}
            </h2>
          )}

          {editEmail ? (
            <input onChange={emailChangeHandler} type="text" value={email} />
          ) : (
            <h2 onClick={editEmailHander}>{profile.email}</h2>
          )}

          <div className="m-4">
            <div className="flex items-center w-48 justify-between">
              <h2>reads: {profile.accepted_reads}</h2>
              {profile.reader_rating && (
                <StarRating rating={profile.reader_rating}></StarRating>
              )}
            </div>
            <div className="flex items-center w-48 justify-between">
              <h2>listens: {profile.accepted_listens}</h2>
              {profile.listener_rating && (
                <StarRating rating={profile.listener_rating}></StarRating>
              )}
            </div>
          </div>

          <p>"Hi! I'm here to read the world to sleep!"</p>

          <p className="m-4">
            Member since {new Date(profile.created_at).toDateString()}
          </p>

          <button className="btn btn-active" role="button" aria-pressed="true">
            <Link to="/logout">Sign Out</Link>
          </button>
        </div>
      )}
    </div>
  );
};
export default Profile;
