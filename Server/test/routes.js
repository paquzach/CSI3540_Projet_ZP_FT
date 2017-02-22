var expect = require("chai").expect;
var request = require("request");

//Ce test est seulement pour la requete de la page home
describe("Route of homepage", function() {
  var url = "http://localhost:8282/home.html";
  it("returns status of 200", function(done) {
    request(url, function(error, response, body){
      expect(response.statusCode).to.equal(200);
      done();
    });
  });
});