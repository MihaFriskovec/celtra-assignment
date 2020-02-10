const mongoose = require('mongoose')

const { Schema } = mongoose

const histroySchema = new Schema(
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

mongoose.model('Histroy', histroySchema)
