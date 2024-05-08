const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: [true, 'Please enter post title'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please enter post description'],
      trim: true,
    },
    image: {
      type: String,
      required: [true, 'Please insert post image URL'],
      default: '',
    },
    likes: {
      type: Number,
      default: 0,
    },
    likedBy: {
      type: [
        {
          user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
          },
        },
      ],
      default: [],
    },
    comments: {
      type: [
        {
          user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
          },
          comment: {
            type: String,
            trim: true,
          },
        },
      ],
      default: [],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
