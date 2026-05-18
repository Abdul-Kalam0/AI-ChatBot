import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    // ======================================
    // NAME
    // ======================================
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
    },

    // ======================================
    // EMAIL
    // ======================================
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,

      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email"],
    },

    // ======================================
    // PASSWORD (EMAIL/PASSWORD AUTH)
    // ======================================
    password: {
      type: String,

      // password required only for normal auth
      required: function () {
        return !this.googleId;
      },

      minlength: 6,

      // don't send password in queries
      select: false,

      // custom validation
      validate: {
        validator: function (value) {
          // skip validation for google users
          if (!value) return true;

          return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/.test(
            value,
          );
        },

        message:
          "Password must contain uppercase, lowercase, number and special character",
      },
    },

    // ======================================
    // GOOGLE AUTH
    // ======================================
    googleId: {
      type: String,
      default: null,
    },

    // ======================================
    // USER AVATAR
    // ======================================
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
  try {
    // skip for google users
    if (!this.password) {
      return next();
    }

    // prevent rehashing
    if (!this.isModified("password")) {
      return next();
    }

    // hash password
    this.password = await bcrypt.hash(this.password, 10);

    next();
  } catch (error) {
    next(error);
  }
});

export default mongoose.model("User", userSchema);
