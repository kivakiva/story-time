import { useState, useEffect, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import StarRating from "./shared/StarRating";
import { AiFillEdit } from "react-icons/ai";
import { ImCancelCircle } from "react-icons/im";
import Error from "./shared/Error";

const Profile = (props) => {
  const [error, setError] = useState("");
  const userID = localStorage.getItem("userID");
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [imgURL, setImgURL] = useState();
  const [intro, setIntro] = useState();
  const [edit, setEdit] = useState(false);
  const [saved, setSaved] = useState(true);
  const [profile, setProfile] = useState();

  const navigate = useNavigate();

  console.log("userID => ", userID);
  console.log("userID => ", localStorage);

  useEffect(() => {
    if (!userID) {
      navigate("/login");
    }
    if (saved && userID) {
      axios
        .get(`/users/${userID}`)
        .then((result) => {
          setProfile({ ...result.data.user });
          setSaved(false);
          setError("");
        })
        .catch((err) => {
          console.log(err);
          setError("Profile did not load");
        });
    }
  }, [saved]);

  useEffect(() => {
    if (profile) {
      console.log(profile);
    }
  }, [saved]);

  const signout = () => {
    axios.post("/api/users/logout");
  };

  const nameChangeHandler = (e) => {
    setName(e.target.value);
  };

  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  const imgURLChangeHandler = (e) => {
    setImgURL(e.target.value);
  };

  const introChangeHandler = (e) => {
    setIntro(e.target.value);
  };

  const initialEdit = () => {
    setEdit(true);
    setName(profile.name);
    setEmail(profile.email);
    setImgURL(profile.image_url);
    setIntro(profile.intro);
  };

  const saveProfile = () => {
    axios({
      method: "put",
      url: `/users/${localStorage.getItem("userID")}`,
      headers: {},
      data: {
        image_url: imgURL,
        name: name,
        email: email,
        intro: intro,
      },
    })
      .then(() => {
        console.log("Profile Changes SAVED!");
        setSaved(true);
        setEdit(false);
        setError("");
      })
      .catch((err) => {
        console.log(err);
        setError("Changes could not be saved.");
      });
  };

  let pageResponse;
  if (profile && edit) {
    pageResponse = (
      <Fragment>
        <div className="form-control container m-4">
          <label className="input-group input-group-vertical">
            <span>Profile Picture URL</span>
            <input
              type="text"
              className="input input-bordered"
              value={imgURL}
              onChange={imgURLChangeHandler}
            />
          </label>
        </div>
        <div className="form-control container m-4">
          <label className="input-group input-group-vertical">
            <span>Name</span>
            <input
              type="text"
              className="input input-bordered"
              value={name}
              onChange={nameChangeHandler}
            />
          </label>
        </div>
        <div className="form-control container m-4">
          <label className="input-group input-group-vertical">
            <span>Email</span>
            <input
              type="text"
              className="input input-bordered"
              value={email}
              onChange={emailChangeHandler}
            />
          </label>
        </div>
        <div className="form-control container m-4">
          <label className="input-group input-group-vertical">
            <span>Introduction</span>
            <textarea
              className="textarea textarea-bordered h-48"
              value={intro}
              onChange={introChangeHandler}
            ></textarea>
          </label>
        </div>
        <div className="flex">
          <button
            className="btn btn-outline m-2"
            role="button"
            aria-pressed="true"
            onClick={saveProfile}
          >
            <AiFillEdit className="inline-block mr-2" />
            Save Changes
          </button>
          <button
            className="btn btn-outline m-2"
            role="button"
            aria-pressed="true"
            onClick={() => setEdit(false)}
          >
            <ImCancelCircle className="inline-block mr-2" />
            Cancel
          </button>
        </div>
      </Fragment>
    );
  } else if (profile) {
    pageResponse = (
      <Fragment>
        <div className="avatar">
          <div className="mb-8 rounded-full w-48 h-48 ring ring-primary ring-offset-base-100 ring-offset-2">
            <img
              className="object-cover h-48 w-48 rounded-full"
              src={profile.image_url}
              alt=""
            />
          </div>
        </div>
        <h2 className="card-title">{profile.name}</h2>
        <h2>{profile.email}</h2>
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
        {profile.intro && <p>"{profile.intro}"</p>}
        <p className="m-4">
          Member since {new Date(profile.created_at).toDateString()}
        </p>
        <button
          className="btn btn-outline m-2"
          role="button"
          aria-pressed="true"
          onClick={initialEdit}
        >
          <AiFillEdit className="inline-block mr-2" />
          Edit Profile
        </button>

        <button
          className="btn btn-active m-2"
          role="button"
          aria-pressed="true"
        >
          <Link to="/logout">Sign Out</Link>
        </button>
      </Fragment>
    );
  }

  return (
    <div className="flex flex-col items-center p-10">
      {pageResponse}
      {error && <Error error={error}></Error>}
    </div>
  );
};
export default Profile;
