const { model, Schema, Types } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcryptjs = require('bcryptjs');
const HttpError = require('./http-error');
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  image: {
    type: String,
    required: true,
  },
  places: {
    type: Types.ObjectId,
    ref: 'Place',
  },
});

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcryptjs.hash(user.password, 8);
  }
  next();
});

userSchema.statics.findByEmailAndPassword = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new HttpError("This Email Is Not Valid", 400);
  }
  const isMatch = await bcryptjs.compare(password, user.password);
  if (!isMatch) {
    throw new HttpError("Password Is Incorrect", 403);
  }
  return user;
};

userSchema.plugin(uniqueValidator);
const User = model('User', userSchema);
module.exports = User;
