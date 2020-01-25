const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: String
  },
  {
    // allows for request.user.save()
    usePushEach: true
  }
);

mongoose.model("users", userSchema);
