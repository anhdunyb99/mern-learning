const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  email: {
    type: String,
  },
  fullName: {
    type: String,
  },
  role: {
    type: String,
    default: "STUDENT",
  },
  avatar: {
    type: String,
  },
  /* courses:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"course"
        }
    ], */
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("users", UserSchema);
