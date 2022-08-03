const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    reg_no: {
      type: String,
      required: true,
      default: "",
    },
    password: {
      type: String,
      required: true,
    },
    profile_pic: {
      type: String,
      required: false,
      default: "",
    },
    // role for doctors is 3
    role: {
      type: Array,
      required: false,
      default: [3],
    },
  },

  // an option in mongoose
  // creates a createdAt and updatedAt field models containing timestamps which will get auto updated when model changes
  {
    timestamps: true,
  }
);

// // avoid duplicate users
// UserSchema.statics.isUserExisting = async function(userEmail) {

//   if (!userEmail)
//     throw new Error('Email or register number required')

//   try {
//     const userByEmail = await this.findOne({userEmail});

//     console.log(userByEmail.email, userEmail)
//     if (userByEmail) return true;
//     return false;
//   } catch (error) {
//     console.log("error in isUserExisting method", error.message);
//     return false;
//   }
// };

module.exports = mongoose.model("User", UserSchema);
