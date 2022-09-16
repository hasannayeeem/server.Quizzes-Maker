const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const Question = require("../models/questionModel");
const Quiz = require("../models/quizModel");



const createQuizQuestion = asyncHandler(async (req, res) => {
    const { question, options, answer } = req.body;
  
    const buildQuiz = await new Question({
      question,
      options,
      answer
    });
  
    const createQuiz = await buildQuiz.save();
  
    const allQuiz = await Quiz.find({});
  
    const quiz = allQuiz[allQuiz.length - 1];
    quiz.questions.push(createQuiz);
    await quiz.save();
  
    return res.status(200).json({
      createQuiz,
      message: "quiz created successfully",
    });
  });

  module.exports = {
    createQuizQuestion,
  }