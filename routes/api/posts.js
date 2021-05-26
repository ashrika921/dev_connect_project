const express = require("express");
const router = express.Router();
const Post = require("../../models/Post");
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const User = require("../../models/User");

//@route    POST /api/posts
//@desc     Create a post
//@access   Private
router.post(
  "/",
  auth,
  [check("text", "Text is required").not().isEmpty()],
  async (req, res) => {
    //console.log("heekfweeio");

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(req.body);
      console.log(errors.array());
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findOne({ _id: req.user.id }).select("-password");

      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });
      // const post = new Post(newPost);
      await newPost.save();
      return res.json(newPost);
    } catch (err) {
      console.log(err.message);
      return res.status(500).send("Server Error");
    }
  }
);

//@route    GET /api/posts
//@desc     Get all posts
//@access   Private
router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    return res.json(posts);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send("Server Error");
  }
});

//@route    GET /api/posts/:post_id
//@desc     Get post by id
//@access   Private
router.get("/:post_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    if (!post) {
      return res.status(404).json({ msg: "No post found" });
    }
    return res.json(post);
  } catch (err) {
    console.log(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "No post found" });
    }

    return res.status(500).send("Server Error");
  }
});

//@route    DELETE /api/posts/:post_id
//@desc     Delete post by id
//@access   Private
router.delete("/:post_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    if (!post) {
      return res.status(404).json({ msg: "No post found " });
    }
    //check user
    if (post.user.toString() !== req.user.id)
      return res.status(401).json({ msg: "User not Authorized" });
    await post.remove();
    return res.json({ msg: "Post Deleted" });
  } catch (err) {
    console.log(err.message);
    if (err.kind === "ObjectId")
      return res.status("404").json({ msg: "No post found" });
    return res.status(500).send("server error");
  }
}); // await Post.findByIdAndRemove(req.params.post_id);

//@route    PUT /api/posts/like/:id
//@desc     Like a post
//@access   Private

router.put("/like/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: "No post found " });
    }
    //check if post is already liked
    if (
      post.likes.filter((like) => {
        return like.user.toString() === req.user.id;
      }).length > 0
    ) {
      return res.status(400).json({ msg: "Post is already liked" });
    }
    post.likes.unshift({ user: req.user.id });
    await post.save();
    return res.json(post.likes);
  } catch (err) {
    console.log(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "No post found " });
    }
    return res.status(500).send("Server Error");
  }
});

//@route    PUT /api/posts/unlike/:id
//@desc     Unlike a post
//@access   Private

router.put("/unlike/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: "No post found " });
    }
    //check if post is not liked
    if (
      post.likes.filter((like) => {
        return like.user.toString() === req.user.id;
      }).length == 0
    ) {
      return res.status(400).json({ msg: "Post is not liked by the user" });
    }

    const removeIndex = post.likes
      .map((like) => like.user._id.toString())
      .indexOf(req.user.id);
    post.likes.splice(removeIndex, 1);

    await post.save();
    return res.json(post.likes);
  } catch (err) {
    console.log(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "No post found " });
    }
    return res.status(500).send("Server Error");
  }
});

//@route    POST /api/posts/comment:id
//@desc     post a comment
//@access   Private
router.post(
  "/comment/:id",
  auth,
  [check("text", "Text is required").not().isEmpty()],
  async (req, res) => {
    // console.log("heekfweeio");

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findOne({ _id: req.user.id }).select("-password");
      const post = await Post.findById(req.params.id);
      //  console.log(user);
      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      };
      post.comments.unshift(newComment);
      // const post = new Post(newPost);
      await post.save();
      return res.json(post.comments);
    } catch (err) {
      console.log(err.message);
      return res.status(500).send("Server Error");
    }
  }
);

//@route    DELETE /api/posts/comment/:id/:comment_id
//@desc     Delete comment by id
//@access   Private
router.delete("/comment/:id/:comment_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: "No post found " });
    }
    //Pull out a comment
    const comment = post.comments.find(
      (comment) => comment._id.toString() === req.params.comment_id
    );
    //If comment exists;
    if (!comment) {
      return res.status(404).json({ msg: "Comment does not exist" });
    }
    //check if comment belong to user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }
    //remove
    const removeIndex = post.comments
      .map((comment) => comment.user._id.toString())
      .indexOf(req.user.comment_id);
    post.comments.splice(removeIndex, 1);

    await post.save();
    return res.json(post.comments);
  } catch (err) {
    console.log(err.message);
    if (err.kind === "ObjectId")
      return res.status("404").json({ msg: "No post found" });
    return res.status(500).send("server error");
  }
});

module.exports = router;
