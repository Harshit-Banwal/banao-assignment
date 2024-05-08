const Post = require('../models/Post');
const { validateObjectId } = require('../utils/validation');

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res
      .status(200)
      .json({ status: true, msg: 'Posts found successfully..', posts });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: false, msg: 'Internal Server Error' });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find({ user: req.user.id });
    res
      .status(200)
      .json({ status: true, msg: 'Posts found successfully..', posts });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: false, msg: 'Internal Server Error' });
  }
};

exports.createPost = async (req, res) => {
  try {
    const { title, description, image } = req.body;

    if (!title) {
      return res
        .status(400)
        .json({ status: false, msg: 'Title of Post not found' });
    }
    if (!description) {
      return res
        .status(400)
        .json({ status: false, msg: 'Description of Post not found' });
    }
    if (!image) {
      return res
        .status(400)
        .json({ status: false, msg: 'Image of Post not found' });
    }

    const post = await Post.create({
      user: req.user.id,
      title,
      description,
      image,
    });
    res
      .status(200)
      .json({ status: true, msg: 'post created successfully..', post });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ status: false, msg: 'Internal Server Error' });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const { title, description, image } = req.body;
    if (!title) {
      return res
        .status(400)
        .json({ status: false, msg: 'Title of post not found' });
    }
    if (!description) {
      return res
        .status(400)
        .json({ status: false, msg: 'Description of post not found' });
    }
    if (!image) {
      return res
        .status(400)
        .json({ status: false, msg: 'Image of post not found' });
    }

    if (!validateObjectId(req.params.postId)) {
      return res.status(400).json({ status: false, msg: 'Post id not valid' });
    }

    let post = await Post.findById(req.params.postId);
    if (!post) {
      return res
        .status(400)
        .json({ status: false, msg: 'Post with given id not found' });
    }

    if (post.user != req.user.id) {
      return res
        .status(403)
        .json({ status: false, msg: "You can't update post of another user" });
    }
    post = await Post.findByIdAndUpdate(
      req.params.postId,
      { title, description, image },
      { new: true }
    );
    res
      .status(200)
      .json({ status: true, msg: 'Post updated successfully..', post });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ status: false, msg: 'Internal Server Error' });
  }
};

exports.likeAPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);

    if (!post) {
      return res
        .status(400)
        .json({ status: false, msg: 'Post with given id not found' });
    }

    const alreadyLiked = post.likedBy.some((like) =>
      like.user.equals(req.user.id)
    );

    if (alreadyLiked) {
      return res
        .status(400)
        .json({ error: 'You have already liked this post' });
    }

    post.likedBy.push({ user: req.user.id });
    post.likes += 1;

    await post.save();

    res
      .status(200)
      .json({ status: true, msg: 'Post Liked successfully..', post });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: false, msg: 'Internal Server Error' });
  }
};

exports.commentOnPost = async (req, res) => {
  try {
    const { comment } = req.body;

    const post = await Post.findById(req.params.postId);

    if (!post) {
      return res
        .status(400)
        .json({ status: false, msg: 'Post with given id not found' });
    }

    post.comments.push({ user: req.user.id, comment });

    await post.save();

    res
      .status(200)
      .json({ status: true, msg: 'Comment added successfully..', post });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: false, msg: 'Internal Server Error' });
  }
};

exports.deletePost = async (req, res) => {
  try {
    if (!validateObjectId(req.params.postId)) {
      return res.status(400).json({ status: false, msg: 'Post id not valid' });
    }

    let post = await Post.findById(req.params.postId);
    if (!post) {
      return res
        .status(400)
        .json({ status: false, msg: 'Post with given id not found' });
    }

    if (post.user != req.user.id) {
      return res
        .status(403)
        .json({ status: false, msg: "You can't delete post of another user" });
    }

    await Post.findByIdAndDelete(req.params.postId);
    res.status(200).json({ status: true, msg: 'Post deleted successfully..' });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ status: false, msg: 'Internal Server Error' });
  }
};
