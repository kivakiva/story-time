const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../../app");
const UsersModel = require("../../../models/UsersModel");

chai.should();
chai.use(chaiHttp);

describe("UsersRouter PUT '/:id'", () => {
  let userID;
  before((done) => {
    // create new user
    UsersModel.create({
      name: "Lorem Ipsum",
      email: "lorem@example.com",
      password: "password",
    }).then((user) => {
      userID = user.id;
      done();
    });
  });

  it("It should update user info", (done) => {
    let agent = chai.request.agent(server);
    agent
      .get(`/api/users/devlog/${userID}`)
      .then((re) => {
        return agent.put(`/api/users/${userID}`).send({
          name: "User11",
          email: "user11@example.com",
          intro: "Lorem Ipsum",
        });
      })
      .then((res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("name").eql("User11");
        res.body.should.have.property("email").eql("user11@example.com");
        res.body.should.have.property("intro").eql("Lorem Ipsum");
        done();
      })
      .catch((err) => {
        console.log("err", err);
      });
  });

  it("It should return error message if user is not logged in", (done) => {
    chai
      .request(server)
      .put(`/api/users/${userID}`)
      .send({
        name: "User11",
        email: "user11@example.com",
        intro: "Lorem Ipsum",
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a("object");
        res.body.should.have.property("message").eql("Must be logged in!");
        done();
      });
  });

  it("It should return error message if user is trying to update another user's profile", (done) => {
    let agent = chai.request.agent(server);
    agent
      .get(`/api/users/devlog/${userID}`)
      .then((re) => {
        return agent.put(`/api/users/2`).send({
          name: "User11",
          email: "user11@example.com",
          intro: "Lorem Ipsum",
        });
      })
      .then((res) => {
        res.should.have.status(400);
        res.body.should.be.a("object");
        res.body.should.have
          .property("message")
          .eql("User not authorized to update another user's profile");
        done();
      })
      .catch((err) => {
        console.log("err", err);
      });
  });

  after((done) => {
    // delete created user from test db
    UsersModel.destroy(userID).then(() => done());
  });
});
