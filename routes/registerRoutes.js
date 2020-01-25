const keys = require("../config/keys");

// Load input validation
const validateRegisterInput = require("../validation/register");

const mongoose = require("mongoose");
// Load User model
const UserCollection = mongoose.model("users");

module.exports = app => {
  app.post("/register", async (request, response) => {
    const { registerErrors, isValidRegister } = validateRegisterInput(
      request.body
    );

    // Check validation
    if (!isValidRegister) {
      return response.json(registerErrors);
    }

    const lowerCaseEmail = request.body.email.toLowerCase();

    UserCollection.findOne({ email: lowerCaseEmail }).then(user => {
      if (user) {
        return response.json({ email: "Email already exists." });
      } else {
        const newUser = new UserCollection({
          email: lowerCaseEmail,
          password: request.body.password
        });
      }
    });
  });
};
