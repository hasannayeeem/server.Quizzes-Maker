const mongoose = require("mongoose");
const Quiz = require("../models/quizModel");
const asyncHandler = require("express-async-handler");

const createQuizDemo = asyncHandler(async (req, res) => {
    const {
      quizName,
      image,
      description,
      quizType,
      retakeCount,
      allQTime,
    } = req.body;
  
    const buildQuiz = await new Quiz({
        quizName,
        image,
        description,
        quizType,
        retakeCount,
        allQTime,
    });
  
    const createQuiz = await buildQuiz.save();
  
    return res.status(200).json({
      createQuiz,
      message: "successfully created quiz Demo",
    });
  });


  const getAllQuiz = asyncHandler(async (req, res) => {
    const allQuiz = await Quiz.find({});
  
    if (!allQuiz) {
    } else {
      return res.status(200).json({
        allQuiz,
      });
    }
  });

  const getQuizByUserEmail = asyncHandler(async (req, res) => {
    const email = req.query.email;
    const myQuizzes = await Quiz.find({});
    const quizzes = myQuizzes.map((quizzes => (quizzes.users.filter((user => (user.userEmail === email))))))
    if (!quizzes) {
    } else {
      return res.status(200).json({
        quizzes,
      });
    }
  });

  const getQuizType = asyncHandler(async (req, res) => {
    const { quiz } = req.body;
  
    if (quiz.toLowerCase() === "all") {
      const allQuiz = await Quiz.find();
      return res.status(200).json({
        allQuiz,
      });
    } else {
      const allQuiz = await Quiz.find({quizType : quiz});
      return res.status(200).json({
        allQuiz,
      });
    }
  });
  
  const getSingleQuiz = asyncHandler(async (req, res) => {
    const singleQuiz = await Quiz.findById(req.params.id);
  
    if (!singleQuiz) {
    } else {
      return res.status(200).json({
        singleQuiz,
      });
    }
  });


  const submitQuiz = asyncHandler(async (req, res) => {
    const user = {
      userId: req.body.userId,
      userName: req.body.userName,
      userEmail: req.body.email,
      marks: req.body.mark,
      paid: req.body.paid,
    };
  
    const findQuiz = await Quiz.findById(req.params.quiz_id);
    findQuiz.users.push(user);
    const saveSubmit = await findQuiz.save();
  
    return res.status(200).json({
      saveSubmit: saveSubmit,
      message: "Successfully Quiz Submitted ",
    });
  });


  const deleteQuiz = asyncHandler(async (req, res) => {
    const deleteQuiz = await Quiz.findByIdAndDelete(req.params.id);
    const allQuiz = await Quiz.find({});
    if (!deleteQuiz) {
      res.status(400);
      throw new Error("Something Went Wrong!");
    } else {
      return res.status(200).json({
        deleteQuiz,
        allQuiz,
        message: "deleted successfully",
      });
    }
  });

  module.exports = {
    createQuizDemo,
    getAllQuiz,
    getQuizByUserEmail,
    getQuizType,
    getSingleQuiz,
    submitQuiz,
    deleteQuiz,
  };