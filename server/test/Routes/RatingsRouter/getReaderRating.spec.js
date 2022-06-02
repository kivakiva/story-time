const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../../app");

chai.should();
chai.use(chaiHttp);

describe("RatingsRouter GET '/readers/listens/:request_id'", () => {
  it("It should return reader rating", (done) => {
    let agent = chai.request.agent(server);
    agent
      .get("/api/users/devlog/1")
      .then((re) => {
        return agent.get("/api/ratings/readers/listens/1");
      })
      .then((res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("message").eql("Reader rating");
        res.body.should.have.property("reader_rating");
        res.body.reader_rating.should.have.property("id").eql(1);
        res.body.reader_rating.should.have.property("request_id").eql(1);
        res.body.reader_rating.should.have.property("rating").eql(4);
        done();
      })
      .catch((err) => {
        console.log("err", err);
      });
  });
});
