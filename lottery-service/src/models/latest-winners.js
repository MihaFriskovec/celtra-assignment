const mongoose = require('mongoose')

const { Schema } = mongoose

const latestWinnersSchema = new Schema(
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

module.exports = latestWinnersSchema
