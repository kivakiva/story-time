const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../../app");

chai.should();
chai.use(chaiHttp);

describe("UsersRouter login function", () => {
  it("It should log in user", (done) => {
    chai
      .request(server)
      .post("/api/users/login")
      .send({ email: "ruta@example.com", password: "password" })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("message").eql("Login successful");
        res.body.should.have.property("cookies").deep.eql({ userID: 1 });
        done();
      });
  });

  it("It should return error message if user email is missing", (done) => {
    chai
      .request(server)
      .post("/api/users/login")
      .send({ password: "password" })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a("object");
        res.body.should.have
          .property("message")
          .eql("Missing required data (email, password)");
        done();
      });
  });

  it("It should return error message if user password is missing", (done) => {
    chai
      .request(server)
      .post("/api/users/login")
      .send({ email: "ruta@example.com" })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a("object");
        res.body.should.have
          .property("message")
          .eql("Missing required data (email, password)");
        done();
      });
  });

  it("It should return error message if user does not exist", (done) => {
    chai
      .request(server)
      .post("/api/users/login")
      .send({ email: "nonexistantuser@example.com", password: "password" })
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a("object");
        res.body.should.have.property("message").eql("User not found");
        done();
      });
  });

  it("It should return error message if wrong password is provided", (done) => {
    chai
      .request(server)
      .post("/api/users/login")
      .send({ email: "ruta@example.com", password: "wrongpassword" })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a("object");
        res.body.should.have.property("message").eql("Wrong password");
        done();
      });
  });
});
