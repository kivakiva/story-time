const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../../app");
const UsersModel = require("../../../models/UsersModel");

chai.should();
chai.use(chaiHttp);

describe("UsersRouter POST '/signup'", () => {
  let userID;
  it("It should create a new user", (done) => {
    chai
      .request(server)
      .post("/api/users/signup")
      .send({
        name: "Lorem Ipsum",
        email: "lorem@example.com",
        password: "password",
      })
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a("object");
        res.body.should.have.property("message").eql("User created!");
        res.body.should.have.property("user");
        res.body.user.should.have.property("name").eql("Lorem Ipsum");
        res.body.user.should.have.property("email").eql("lorem@example.com");
        res.body.user.should.have.property("password").eql("password");
        userID = res.body.user.id;
        done();
      });
  });

  it("It should not create a new user if name is missing", (done) => {
    chai
      .request(server)
      .post("/api/users/signup")
      .send({
        email: "lorem@example.com",
        password: "password",
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a("object");
        res.body.should.have
          .property("message")
          .eql("Missing required information (name, email, phone, password)!");
        done();
      });
  });

  it("It should not create a new user if email is missing", (done) => {
    chai
      .request(server)
      .post("/api/users/signup")
      .send({
        name: "Lorem Ipsum",
        password: "password",
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a("object");
        res.body.should.have
          .property("message")
          .eql("Missing required information (name, email, phone, password)!");
        done();
      });
  });

  it("It should not create a new user if password is missing", (done) => {
    chai
      .request(server)
      .post("/api/users/signup")
      .send({
        name: "Lorem Ipsum",
        email: "lorem@example.com",
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a("object");
        res.body.should.have
          .property("message")
          .eql("Missing required information (name, email, phone, password)!");
        done();
      });
  });

  after((done) => {
    // delete created user from test db
    UsersModel.destroy(userID).then(() => done());
  });
});
