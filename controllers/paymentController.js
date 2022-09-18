const Payment = require("../models/paymentModel");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const createPayment = asyncHandler(async (req, res) => {
  const { transactionId, name, email, amount, refund } =
    req.body.paymentDetails;
  const findUser = await User.findOne({ email: email });
  findUser.isPaid = true;
  const updateUser = await findUser.save();
  const savePayment = await new Payment({
    userId: updateUser?._id,
    transactionId,
    name,
    email,
    refund,
    amount,
  });
  const pay = await savePayment.save();
  return res.status(200).json({
    pay: pay,
    message: "payment successfully",
  });
});

// getting all Payment data
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

// getting single Payment data by id
const getSinglePayment = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Payment.findById(id);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: "There was a server side error!" });
  }
};

// updating a single payment data $set needs to be update
const updatePayment = async (req, res) => {
  try {
    const email = req.query.email;
    const paymentData = req.body;
    
    await Payment.updateOne(
      { email: email },
      {
        $set: paymentData,
      }
    );
	const findUser = await User.findOne({ email: email });
	if(paymentData.refund === 'true'){
		findUser.isPaid = false;
    	await findUser.save();
	}
    
    res.status(200).json({
      message: "Payment data was updated successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// get single payment by email
const singlePaymentByEmail = async (req, res) => {
  try {
    const email = req.params.email;
    const data = await Payment.findOne({ email: email });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: "There was a server side error!" });
  }
};

// deleting single Payment data by id
const deletePayment = async (req, res) => {
  try {
    const id = req.params.id;
    await Payment.deleteOne({ _id: id });
    res.status(200).json({
      message: "Payment data was deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ message: "There was a server side error!" });
  }
};

module.exports = {
  createPayment,
  getAllPayment,
  getSinglePayment,
  updatePayment,
  singlePaymentByEmail,
  deletePayment,
};
