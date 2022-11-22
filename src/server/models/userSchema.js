
const mongoose = require("mongoose")

// any of the fiels can be made mandetory by adding "required: true"

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required:true,
  },
  title: {
    type: String,
  },
  cluster: {
    type: String,
  },
  unit: {
    type: String,
  },
  team: {
    type: String,
  },
  admin: {
    type: Boolean,
  },
  savedKudos: {
    type: Object,
    default: {},
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
  updatedAt: {
    type: Date,
    default: () => Date.now(),
  },
  pronouns: {
    type: String,
  },
  photo:{
    type: Buffer,
  }
})

userSchema.pre("save", function (next) {
  this.updatedAt = Date.now()
  next()
})

module.exports = mongoose.model("Users", userSchema)
