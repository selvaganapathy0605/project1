import CommunityPost from "../models/communityPost.js";
import Notification from "../models/notification.js";
import User from "../models/user.js";

export const createPost = async (req, res) => {
  try {
    const { title, body, tags } = req.body;
    const post = new CommunityPost({
      author: req.user._id,
      title,
      body,
      tags,
    });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getPosts = async (req, res) => {
  try {
    const posts = await CommunityPost.find()
      .populate("author", "name")
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const likePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await CommunityPost.findById(postId).populate("author", "name");
    if (!post) return res.status(404).json({ message: "Not found" });

    const idx = post.likes.findIndex(
      (id) => id.toString() === req.user._id.toString()
    );

    let action = "";
    if (idx >= 0) {
      post.likes.splice(idx, 1);
      action = "unliked";
    } else {
      post.likes.push(req.user._id);
      action = "liked";

      
      const liker = await User.findById(req.user._id).select("name");

      
      if (post.author._id.toString() !== req.user._id.toString()) {
        await Notification.create({
          userId: post.author._id,
          message: `${liker.name} liked your post "${post.title}"`,
          type: "like",
        });
      }
    }

    await post.save();
    res.json({ post, action });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
