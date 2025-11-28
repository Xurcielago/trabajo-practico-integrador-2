import { model, Schema } from "mongoose";

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      minLength: 3,
      maxLength: 20,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      match: /.+\@.+\..+/,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    profile: {
      firstName: {
        type: String,
        minLength: 2,
        maxLength: 50,
        required: true,
      },
      lastName: {
        type: String,
        minLength: 2,
        maxLength: 50,
        required: true,
      },
      biography: {
        type: String,
        maxLength: 500,
      },
      avatarUrl: {
        type: String,
        match: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i,
      },
      birthDate: {
        type: Date,
      },
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

UserSchema.pre(/^find/, function (next) {
  this.where({ deletedAt: null });
  next();
});

UserSchema.virtual("articles", {
  ref: "Article",
  localField: "_id",
  foreignField: "author",
});

UserSchema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "author",
});

export const UserModel = model("User", UserSchema);