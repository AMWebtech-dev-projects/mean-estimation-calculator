const express = require("express");
const router = express.Router();
const Users = require("../controllers/usersController");
router.post("/saveUserInfo", Users.saveUserInfo);
router.post("/emailAlreadyExists", Users.emailAlreadyExists);
router.post('/authentication', Users.authentication);
router.get('/logout', Users.logout);
router.post("/doSignIn", Users.doSignIn);
router.post('/deleteUser', Users.deleteUser);
router.get("/getUsersList", Users.getUsersList);
router.post("/usersListWithPagination", Users.usersListWithPagination);

module.exports = router;