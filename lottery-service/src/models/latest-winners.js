const mongoose = require('mongoose')

const Schema = mongoose.Schema

const latestWinnersSchema = new Schema(
  {
    userNames: [],
    winningNumber: Number
  },
  {
    timestamps: true
  }
)
