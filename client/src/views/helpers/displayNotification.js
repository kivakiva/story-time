import { Store } from "react-notifications-component";
import Notification from "../shared/Notification";

const displayNotification = (message) => {
  Store.addNotification({
    content: <Notification message={`${message}`} />,
    container: "center",
    animationIn: ["animate__animated animate__fadeIn"],
    animationOut: ["animate__animated animate__fadeOut"],
    dismiss: {
      duration: 2000,
    },
    width: "300",
    touchSlidingExit: {
      swipe: {
        duration: 400,
        timingFunction: "ease-out",
        delay: 0,
      },
      fade: {
        duration: 400,
        timingFunction: "ease-out",
        delay: 0,
      },
    },
  });
};

export default displayNotification;
