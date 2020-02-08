const mongoose = require('mongoose')

const { Schema } = mongoose

const latestWinnersSchema = new Schema(
  {
    users: [],
    winningNumber: Number
  },
  {
    timestamps: true
  }
)

module.exports = latestWinnersSchema
