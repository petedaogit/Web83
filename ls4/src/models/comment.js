import mongoose from "mongoose";

const cmtSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    postId: {
      type: String,
      ref: "Post",
      required: true,
    },
    userId: {
      type: String,
      ref: "User",
      required: true,
    },
    createdAt: {
      type: String,
    },
  },
  { timestamps: true }
);

const CmtModel = mongoose.model("Cmt", cmtSchema);
export default CmtModel;
