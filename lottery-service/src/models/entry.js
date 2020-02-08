const mongoose = require('mongoose')

const { Schema } = mongoose

const entrySchema = new Schema(
  {
    user: {
      type: String,
      required: true
    },
    selectedNumber: {
      type: Number,
      required: true,
      min: 1,
      max: 30
    }
  },
  {
    timestamps: true
  }
)

module.exports = entrySchema
