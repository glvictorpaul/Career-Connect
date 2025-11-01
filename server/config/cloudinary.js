const cloudinary = require("cloudinary").v2;

// Configure Cloudinary with environment variables
cloudinary.config({
  cloud_name: "dj0pydhla",
  api_key: "211162944598199",
  api_secret: "O-u33XKphDdIx1cOf5lEyDxSzH8",
});

module.exports = cloudinary;
