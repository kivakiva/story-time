const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../../app");

chai.should();
chai.use(chaiHttp);

describe("UsersRouter GET '/'", () => {
  it("It should return all users for admin", (done) => {
    let agent = chai.request.agent(server);
    agent
      .get("/api/users/devlog/10")
      .then((re) => {
        return agent.get("/api/users");
      })
      .then((res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("message").eql("Users");
        res.body.users.length.should.equal(10);
        res.body.users[0].should.have.property("name");
        res.body.users[0].should.have.property("email");
        res.body.users[0].should.have.property("phone");
        res.body.users[0].should.have.property("image_url");
        res.body.users[0].should.have.property("intro");
        done();
      })
      .catch((err) => {
        console.log("err", err);
      });
  });

  it("It should return error message if user is not logged in", (done) => {
    chai
      .request(server)
      .get("/api/users")
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a("object");
        res.body.should.have.property("message").eql("Must be logged in!");
        done();
      });
  });

  it("It should return error message if user is not admin", (done) => {
    let agent = chai.request.agent(server);
    agent
      .get("/api/users/devlog/1")
      .then((re) => {
        return agent.get("/api/users");
      })
      .then((res) => {
        res.should.have.status(403);
        res.body.should.be.a("object");
        res.body.should.have.property("message").eql("Forbidden");
        done();
      })
      .catch((err) => {
        console.log("err", err);
      });
  });
});
