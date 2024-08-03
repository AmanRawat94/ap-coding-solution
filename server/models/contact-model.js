const { Schema, model } = require("mongoose");

const contactSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Contact = new model("Contact", contactSchema);

module.exports = Contact;
