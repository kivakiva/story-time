const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../../app");

chai.should();
chai.use(chaiHttp);

describe("UsersRouter POST '/logout'", () => {
  it("It should log out user", (done) => {
    chai
      .request(server)
      .post("/api/users/logout")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("message").eql("User logged out!");
        done();
      });
  });
});
