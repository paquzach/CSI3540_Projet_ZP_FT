var expect = require("chai").expect;
var request = require("request");

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
});