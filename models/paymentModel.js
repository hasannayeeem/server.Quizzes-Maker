const mongoose = require("mongoose");

const paymentModel = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    transactionId: {
      type: String,
    },
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    amount: {
      type: String,
    },
    refund: {
      type: String,
      default: 'false',
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("payment", paymentModel);