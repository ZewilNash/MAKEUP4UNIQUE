const express = require("express");

const router = express.Router();


const {bookMakeupSession,getSessions} = require("../controllers/auth");



router.route("/book_session").post(bookMakeupSession);
router.route("/get_sessions/:id").get(getSessions);



module.exports = router;