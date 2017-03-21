var expect = require("chai").expect;
var request = require("request");
var chai = require('chai');
var chaiHttp = require('chai-http');

chai.use(chaiHttp);

//Ce test est seulement pour la requete de la page home
describe("Routes of website", function() {
  var url = "http://localhost:8282/home.html";
   var urlBad = "http://localhost:8282/home4.html";

  it("good URL returns status of 200", function(done) {
    request(url, function(error, response, body){
      expect(response.statusCode).to.equal(200);
      done();
    });
  });
 
  it("bad URL returns status of 404", function(done) {
    request(urlBad, function(error, response, body){
      expect(response.statusCode).to.equal(404);
      done();
    });
  });

  /*
  it('POST of userName from myAccount to myAccount', function(done) {
    chai
      .request("http://localhost:8282/myAccount.html")
      .post("")
      .send({'userName': 'Zach'})
      .end(function(err, res, body){
        expect(res.statusCode).to.equal(200);
        
        expect(res).to.be(json);
        res.body.should.be.a('object');
        res.body.should.have.property('SUCCESS');
        res.body.SUCCESS.should.be.a('object');
        res.body.SUCCESS.should.have.property('userName');
        res.body.SUCCESS.userName.should.equal('Zach');
        
        done();
      });
  });
  */

});