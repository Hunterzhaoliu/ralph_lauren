const keys = require("../config/keys");

const mongoose = require("mongoose");

// Load User model
const UserCollection = mongoose.model("users");

module.exports = app => {
  app.post("/api/register", async (request, response) => {
    const lowerCaseEmail = request.body.email.toLowerCase();
    const score = request.body.score;

    console.log("lowerCaseEmail = ", lowerCaseEmail);
    console.log("score = ", score);

    UserCollection.findOne({ email: lowerCaseEmail }).then(user => {
      if (user) {
        return response.json({ email: "Email already exists." });
      } else {
        console.log("new user");
        const newUser = new UserCollection({
          email: lowerCaseEmail,
          score: score
        });
        response.send("done");
      }
    });
  });
};
