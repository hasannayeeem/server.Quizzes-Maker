const Payment = require('../models/paymentModel');
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const createPayment = asyncHandler(async (req, res) => {
  const { transactionId, name, email, amount } = req.body.paymentDetails;
  const findUser = await User.findOne({'email': email });
  findUser.isPaid = true;
  const updateUser = await findUser.save();
  const savePayment = await new Payment({
    userId: updateUser?._id,
    transactionId,
    name,
    email,
    amount,
  });
  const pay = await savePayment.save();
  return res.status(200).json({
    pay: pay,
    message: "payment successfully",
  });
});

const getAllPayment = asyncHandler(async (req, res) => {
  const allPay = await Payment.find({});
  if (!allPay) {
    res.status(400);
    throw new Error("Something Went Wrong");
  } else {
    return res.status(200).json({
      allPay: allPay,
    });
  }
});

module.exports = { createPayment, getAllPayment };
