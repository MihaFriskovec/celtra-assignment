const mongoose = require('mongoose')

const { Schema } = mongoose

const LotterySchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    active: {
      type: Boolean
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Lottery', LotterySchema)
