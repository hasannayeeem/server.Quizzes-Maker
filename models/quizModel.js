const mongoose = require("mongoose");

const quizModel = new mongoose.Schema(
  {
    quizName: {
      type: String,
      require: true,
    },
    image: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    quizType: {
      type: String,
      require: true,
    },
    typeOfQuizTime: {
      type: String,
    },
    allQTime: {
      type: String,
    },
    perQTime: {
      type: String,
    },
    retakeCount: {
        type: Number,
        require: true,
      },
    questions: [
      {
        id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "question",
        },
        question: {
          type: String,
          require: true,
        },
        options: [
          {
            id: {
              type: Number,
              required: true,
            },
            option: {
              type: String,
              required: true,
            },
          },
        ],
        answer: [
          {
            type: Number,
          },
        ],
      },
    ],
    users: [
      {
        userId: {
          type: String,
        },
        userName: {
          type: String,
        },
        userEmail: {
          type: String,
        },
        marks: {
          type: Number,
        },
        paid: {
          type: Boolean,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("quiz", quizModel);
