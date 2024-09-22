import express from "express";
import connecDatabases from "./src/database/db.js";
import cors from "cors";
import UserModel from "./src/models/user.js";
import PostModel from "./src/models/post.js";
import CmtModel from "./src/models/comment.js";

const app = express();
const PORT = 3003;

//initialize database
connecDatabases();
//define middleware
app.use(cors());
app.use(express.json());
//define router
app.get("/", (req, res) => {
  res.status(200).json({ Message: "Connect successfully! " });
});
//end point for registering new account
app.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("Email and Password is required!");
    }
    // const userExist = UserModel.findOne({ email });
    // if (userExist) {
    //   throw new Error("Email already exists!");
    // }
    const newUser = {
      email,
      password,
    };
    const user = new UserModel(newUser);
    await user.save();

    res.status(201).json({ Message: "Created successfully!", user });
  } catch (error) {
    res.status(400).json({ Message: error.message });
  }
});

//end point for creating post
app.post("/posting", async (req, res) => {
  try {
    const { content, userId } = req.body;
    if (!content || !userId) {
      throw new Error("Can not leave these fields blank!");
    }
    const newPost = {
      content,
      userId,
    };
    const post = new PostModel(newPost);
    await post.save();

    res.status(201).json({ Message: "Post created successfully!", post });
  } catch (error) {
    res.status(400).json({ Message: error.message });
  }
});

//endpoint for edit post
app.put("/posting/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, content } = req.body;

    if (!userId || !content) {
      throw new Error("Can't leave these fields blank!");
    }

    const updatedPost = await PostModel.findByIdAndUpdate(
      id,
      { userId, content },
      { new: true }
    );
    if (!updatedPost) {
      return res.status(400).json({ Message: "Post not found!" });
    }
    res
      .status(200)
      .json({ Message: "Post edited successfully!", post: updatedPost });
  } catch (error) {
    res.status(400).json({ Message: error.message });
  }
});

//endpoint for comment
app.post("/comment", async (req, res) => {
  try {
    const { content, userId, postId } = req.body;
    if (!content || !userId || !postId) {
      throw new Error("Can not leave these fields blank!");
    }
    const newCmt = {
      content,
      userId,
      postId,
    };
    const cmt = new CmtModel(newCmt);
    await cmt.save();

    res.status(201).json({ Message: "Comment created successfully!", cmt });
  } catch (error) {
    res.status(400).json({ Message: error.message });
  }
});

//endpoint for edit comment
app.put("/comment/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, content, postId } = req.body;

    if (!userId || !content || !postId) {
      throw new Error("Can't leave these fields blank!");
    }

    const updatedCmt = await CmtModel.findByIdAndUpdate(
      id,
      { userId, content, postId },
      { new: true }
    );
    if (!updatedCmt) {
      return res.status(400).json({ Message: "Comment not found!" });
    }
    res
      .status(200)
      .json({ Message: "Comment edited successfully!", post: updatedCmt });
  } catch (error) {
    res.status(400).json({ Message: error.message });
  }
});

//end point to fetch all comments
app.get("/comment/:postId", async (req, res) => {
  try {
    const { postId } = req.params;
    const comments = await CmtModel.find({ postId });

    if (comments.length === 0) {
      return res.status(400).json({ Message: "No comments on this post!" });
    }
    res
      .status(200)
      .json({ Message: "Comments fetched successfully!", comments });
  } catch (error) {
    res.status(400).json({ Message: error.message });
  }
});
//handle error
//runserver
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
