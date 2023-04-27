import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  //ссылаемся на другую схему
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
},
{timestamps: true}, //видеть историю создания поста(дата)
);

export default mongoose.model('User', UserSchema)