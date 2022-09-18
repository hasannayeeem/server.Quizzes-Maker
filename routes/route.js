const express = require('express');
// verify jwt middleware
// const checkLogin = require('../middlewares/checkLogin.js');


// user controllers
const {
	// postUser,
	getAllUser,
	singleUser,
	updateUser,
	deleteUser,
	emailPost,
	vipFinder,
	getAuthEngineer,
	singleUserByEmail,
} = require('../controllers/userController');

// quizController 
const {
	createQuizDemo,
	getAllQuiz,
	getSingleQuiz,
	submitQuiz,
	deleteQuiz,
	getQuizType,
	getQuizByUserEmail
  } = require("../controllers/quizController");

//   questionController
const {
	createQuizQuestion,
  } = require("../controllers/questionController");

//   payment controller 
const {
	createPayment, 
	getAllPayment,
	getSinglePayment,
	updatePayment,
	singlePaymentByEmail,
	deletePayment,
} = require('../controllers/paymentController');


const router = express.Router()

// user routes here
// router.post('/user', postUser)
router.get('/user', getAllUser)
router.get('/user/:id', singleUser)
// in this put method need the quer param as email
router.put('/user', updateUser)
router.delete('/user/:id', deleteUser)
router.post('/user', emailPost)
router.get('/vipUser', vipFinder)
router.get('/authEngineer/:email', getAuthEngineer)
router.get('/singleUserByEmail/:email', singleUserByEmail);

// quiz routes 

router.post("/createQuizDemo", createQuizDemo);
router.post("/submit-quiz/:quiz_id", submitQuiz);
router.post("/filter-quiz-type", getQuizType);
router.get("/get-all-quiz", getAllQuiz);
router.get("/get-my-quizzes", getQuizByUserEmail);
router.get("/get-single-quiz/:id", getSingleQuiz);
router.delete("/delete-quiz/:id", deleteQuiz);

// question routes 

router.post("/createQuestionDemo", createQuizQuestion);

// payment routes 
router.post('/createPayment', createPayment);
router.get('/getAllPayment', getAllPayment);
router.get('/getSinglePayment', getSinglePayment);
router.put('/updatePayment', updatePayment);
router.get('/singlePaymentByEmail/:email', singlePaymentByEmail);
router.delete('/deletePayment/:id', deletePayment);


module.exports = router;