import { useParams } from "react-router-dom";
import TimeAgo from 'react-timeago'
import Offer from '../Offer'

const Read = (props) => {
  const params = useParams();
  //params.id will be used to query all the info via an axios call to the server

  const dataPlaceholder = [
    {
      title: "moby dick",
      author: "herman melville",
      listener: "donny phan",
      message:
        "I really miss the times I used to fall asleep while my grandmother read to me and would love to experience it again.",
      listenNumber: 3,
      status: "active",
      type: "online",
      date: "Aug 13, 2021"
    },
  ];

  const offersPlaceholders = [
    {
      id: 1,
      name: "John",
      message: "hi! I see you like Harry Potter! I'd love to read to you :)",
      rating: 4.15,
      reads: 26,
      dateOffered: "Jan 20, 2021"
    },
    {
      id: 2,
      name: "Mustafa",
      message: "hi! I just finished the first book so great timing",
      rating: 3.4,
      reads: 6,
      dateOffered: "Jan 10, 2021"
    },
    {
      id: 3,
      name: "Idris",
      message: "I like to read on evenings, open to in person or virtual",
      rating: 5,
      reads: 150,
      dateOffered: "Feb 12, 2021 5:00 a.m."
    },
  ]

  const parsedOffers = offersPlaceholders.map(offer => (<Offer key={offer.id} {...offer} />) )

  const id = params.listenId;
  const { title, date } = dataPlaceholder[0];

  return (<div>
      <div>Your request to listen to</div>
      <div>{ title }</div>
      <div> made <TimeAgo date={date} /></div>
      { parsedOffers }
    </div>)
};
export default Read;
