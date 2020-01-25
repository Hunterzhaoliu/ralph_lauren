const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: String,
    score: Number
  },
  {
    // allows for request.user.save()
    usePushEach: true
  }
);

mongoose.model("users", userSchema);
