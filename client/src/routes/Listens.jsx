import Listen from "./myreads/Listen";

const Listens = (props) => {
  const testListens = [
    {
      id: 1,
      title: "anna karenina",
      reader: "donny phan",
      status: "active",
    },
    {
      id: 2,
      title: "the understory",
      reader: "ruta reiso",
      status: "active",
    },
    {
      id: 3,
      title: "do not say we have nothing",
      reader: "adrian kiva",
      status: "pending",
    },
  ];

  const parsedListens = testListens.map((listen) => {
    return <Listen key={listen.id} {...listen} />;
  });

  return <div>{parsedListens}</div>;
};
export default Listens;
