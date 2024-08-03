const express = require("express");
const verifyToken = require("../utils/verifyUser");
const {
  createContact,
  getContact,
  deleteContact,
} = require("../controllers/contact-controller");
const router = express.Router();

router.post("/create", verifyToken, createContact);
router.get("/getcontact", verifyToken, getContact);
router.delete("/deletecontact/:contactId", verifyToken, deleteContact);

module.exports = router;
