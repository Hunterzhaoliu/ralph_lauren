const keys = require("../config/keys");

const mongoose = require("mongoose");

// Load User model
const UserCollection = mongoose.model("users");

module.exports = app => {
  app.post("/register", async (request, response) => {
    const lowerCaseEmail = request.body.email.toLowerCase();
    const score = request.body.score;

    UserCollection.findOne({ email: lowerCaseEmail }).then(user => {
      if (user) {
        return response.json({ email: "Email already exists." });
      } else {
        const newUser = new UserCollection({
          email: lowerCaseEmail,
          score: score
        });
      }
    });
  });
};
