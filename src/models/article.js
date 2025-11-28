import { model, Schema, Types } from "mongoose";

const ArticleSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 200,
    },
    content: {
      type: String,
      required: true,
      minLength: 50,
    },
    excerpt: {
      type: String,
      maxLength: 500,
    },
    status: {
      type: String,
      enum: ["published", "archived"],
      default: "published",
    },
    author: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    tags: [
      {
        type: Types.ObjectId,
        ref: "Tag",
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

ArticleSchema.pre("findOneAndDelete", async function (next) {
  const doc = await this.model.findOne(this.getFilter());
  if (doc) {
    await model("Comment").deleteMany({ article: doc._id });
  }
  next();
});

export const ArticleModel = model("Article", ArticleSchema);