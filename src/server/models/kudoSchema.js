const mongoose = require("mongoose")

//Change to and from parameters to ObjectID when implementing connections!!!
const kudoSchema = new mongoose.Schema(
  {
    to: {
      type: String,
      required: true,
    },
    from: {
      type: String,
      required: true,
    },
    kudosType: {
      type: Number,
    },
    kudosMessage: {
      type: String,
    },
    kudosLikes: {
      type: Object,
      default: {},
    },
    kudoGif: {
      type: String,
      default: "",
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
  },
  { minimize: false }
)

kudoSchema.pre("save", function (next) {
  this.updatedAt = Date.now()
  next()
})

module.exports = mongoose.model("Kudos", kudoSchema)
