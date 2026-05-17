import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email"],
    },

    // normal auth password
    password: {
      type: String,

      // not required for google users
      required: function () {
        return !this.googleId;
      },

      minlength: 6,

      select: false,

      match: [
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/,

        "Password must contain uppercase, lowercase, number and special character",
      ],
    },

    // google auth
    googleId: {
      type: String,
      default: null,
    },

    // optional avatar
    avatar: {
      type: String,
      default: "",
    },
  },

  {
    timestamps: true,
  },
);

// ======================================
// HASH PASSWORD BEFORE SAVE
// ======================================
userSchema.pre("save", async function (next) {
  // skip hashing if password not modified
  if (!this.isModified("password")) {
    return next();
  }

  // skip hashing for google login
  if (!this.password) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 10);

  next();
});

export default mongoose.model("User", userSchema);
