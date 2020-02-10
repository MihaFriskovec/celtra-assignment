const mongoose = require('mongoose')

const { Schema } = mongoose

const HistroySchema = new Schema(
  {
    lotteryName: {
      type: String,
      required: true
    },
    users: [String],
    winningNumber: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Histroy', HistroySchema)
