import Read from "./myreads/Read";

const Reads = (props) => {
  const testReads = [
    {
      id: 1,
      title: "moby dick",
      listener: "donny phan",
      status: "pending",
    },
    {
      id: 2,
      title: "harry potter",
      listener: "ruta reiso",
      status: "pending",
    },
    {
      id: 3,
      title: "the very hungry caterpillar",
      listener: "adrian kiva",
      status: "pending",
    },
  ];

  const parsedReads = testReads.map((read) => {
    return <Read key={read.id} {...read} />;
  });

  return (
    <div>
      <div>public reading requests :</div>
      {parsedReads}
    </div>
  );
};
export default Reads;
