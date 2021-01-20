module.exports = {
  id: "administrator",
  properties: {
    name: { type: "string" },
    email: { type: "string" },
    phone_number: { type: "string" },
  },
  required: ["name", "email", "phone_number"],
}
