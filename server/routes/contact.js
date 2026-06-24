const express = require("express");
const router = express.Router();
const {
  createContact,
  getAllContacts,
  getContactById,
  deleteContact,
  updateContactStatus,
  countContacts
} = require("../controllers/contactController");

router.post("/", createContact);
router.get("/", getAllContacts);
router.get("/count", countContacts);
router.get("/:id", getContactById);
router.delete("/:id", deleteContact);
router.patch("/:id/read", updateContactStatus);


module.exports = router;