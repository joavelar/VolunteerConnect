const { createVolunteer, getVolunteerByUID } = require("../models/volModel");
const { checkEmailExistsInOrganizations } = require("../utils/emailUtils");

const createVolunteerProfile = (req, res) => {
  const { uid, name, email, phone } = req.user; // Extracted from Firebase token

  // Step 1: Check if email exists in volunteers
  checkEmailExistsInOrganizations(email)
    .then((emailExistsInVols) => {
      if (emailExistsInVols) {
        return res.status(400).json({
          message:
            "This email is already associated with a organization account.",
        });
      }

      getVolunteerByUID(uid, (err, volunteer) => {
        if (err)
          return res
            .status(500)
            .json({ message: "Database error", error: err });

        if (volunteer) {
          res.json({
            message: "Volunteer profile fetched successfully!",
            volunteer,
          });
        } else {
          createVolunteer(uid, name, email, phone, (err, newVolunteer) => {
            if (err)
              return res
                .status(500)
                .json({ message: "Failed to create volunteer", error: err });
            res.json({
              message: "Volunteer profile created successfully!",
              volunteer: newVolunteer,
            });
          });
        }
      });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "Email check failed", error: err.message });
    });
};

module.exports = { createVolunteerProfile };
