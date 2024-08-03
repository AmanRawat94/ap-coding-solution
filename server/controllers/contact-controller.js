const Contact = require("../models/contact-model");
const errorHandler = require("../utils/error");

const createContact = async (req, res, next) => {
  try {
    const { email, content } = req.body;

    if (!email || !content || email === "" || content === "") {
      next(errorHandler(400, "All fields are required"));
    }

    const newContact = new Contact({
      email,
      content,
    });

    await newContact.save();

    res.status(200).json(newContact);
  } catch (error) {
    next(error);
  }
};

const getContact = async (req, res, next) => {
  try {
    const contacts = await Contact.find().sort({
      createdAt: -1,
    });
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(
      errorHandler(403, "You are not allowed to delete this contact")
    );
  }
  try {
    await Contact.findByIdAndDelete(req.params.contactId);
    res.status(200).json("Contact has been deleted");
  } catch (error) {
    next(error);
  }
};

module.exports = { createContact, getContact, deleteContact };
