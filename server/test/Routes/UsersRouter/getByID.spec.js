const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../../app");

chai.should();
chai.use(chaiHttp);

describe("UsersRouter getByID function", () => {
  it("It should return full user info for logged in user", (done) => {
    let agent = chai.request.agent(server);
    agent
      .get("/api/users/devlog/1")
      .then((re) => {
        return agent.get("/api/users/1");
      })
      .then((res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("message").eql("User id:1");
        res.body.should.have.property("user");
        res.body.user.should.have.property("accepted_reads");
        res.body.user.should.have.property("accepted_listens");
        res.body.user.should.have.property("reader_rating");
        res.body.user.should.have.property("listener_rating");
        res.body.user.should.have.property("all_read_requests");
        res.body.user.should.have.property("all_request_offers");
        done();
      })
      .catch((err) => {
        console.log("err", err);
      });
  });

  it("It should return partial another user info for logged in user", (done) => {
    let agent = chai.request.agent(server);
    agent
      .get("/api/users/devlog/1")
      .then((re) => {
        return agent.get("/api/users/2");
      })
      .then((res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("message").eql("User id:2");
        res.body.should.have.property("user");
        res.body.user.should.have.property("accepted_reads");
        res.body.user.should.have.property("accepted_listens");
        res.body.user.should.have.property("reader_rating");
        res.body.user.should.have.property("listener_rating");
        res.body.user.should.not.have.property("all_read_requests");
        res.body.user.should.not.have.property("all_request_offers");
        done();
      })
      .catch((err) => {
        console.log("err", err);
      });
  });

  it("It should return error message if user does not exist", (done) => {
    let agent = chai.request.agent(server);
    agent
      .get("/api/users/devlog/1")
      .then((re) => {
        return agent.get("/api/users/20");
      })
      .then((res) => {
        res.should.have.status(404);
        res.body.should.be.a("object");
        res.body.should.have.property("message").eql("User not found");
        done();
      })
      .catch((err) => {
        console.log("err", err);
      });
  });
});
