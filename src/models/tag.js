import { model, Schema } from "mongoose";

const TagSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
      minLength: 2,
      maxLength: 30,
      trim: true,
      match: /^[^\s]+$/, 
    },
    description: {
      type: String,
      maxLength: 200,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

TagSchema.pre("findOneAndDelete", async function (next) {
  const doc = await this.model.findOne(this.getFilter());
  if (doc) {
    await model("Article").updateMany(
      { tags: doc._id },
      { $pull: { tags: doc._id } }
    );
  }
  next();
});

export const TagModel = model("Tag", TagSchema);