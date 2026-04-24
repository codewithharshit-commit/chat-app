import mongoose from "mongoose";

const useSchema = new mongoose.Schema({
  email: {
    type: "String",
    unique: true,
    require: true,
  },
  fullName: {
    type: "String",
    require: true,
  },
  password: {
    type: "String",
    require: true,
    unique: true,
    minLength: 6,
  },
  profilePic: {
    type: "String",
    default: "",
  },
});

const User = mongoose.model("User", useSchema);

export default User;
