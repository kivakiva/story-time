import Listen from "./myreads/MyListen";

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

  const { myListens } = props;
  const parsedListens = myListens.map((listen) => {
    return <Listen key={listen.id} {...listen} />;
  });

  return (
    <div className="m-2 flex items-center justify-evenly bg-base-200 mt-2 border border-x-base-200 flex-wrap">
      <button className="btn btn-active my-6">Create read request</button>
      {parsedListens}
    </div>
  );
};
export default Listens;
