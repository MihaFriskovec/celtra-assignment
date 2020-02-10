const mongoose = require('mongoose')

const { Schema } = mongoose

const lotterySchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    active: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
)

mongoose.model('Lottery', lotterySchema)
