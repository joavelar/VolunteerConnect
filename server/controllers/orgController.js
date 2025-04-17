const {
  createOrganization,
  getOrganizationByUID,
} = require("../models/orgModel");
const { checkEmailExistsInVolunteers } = require("../utils/emailUtils");

const createOrgProfile = (req, res) => {
  const { uid, name, email, phone } = req.user;

  // Step 1: Check if email exists in volunteers
  checkEmailExistsInVolunteers(email)
    .then((emailExistsInVols) => {
      if (emailExistsInVols) {
        return res
          .status(400)
          .json({
            message:
              "This email is already associated with a volunteer account.",
          });
      }

      // Step 2: Continue as normal
      getOrganizationByUID(uid, (err, organization) => {
        if (err)
          return res
            .status(500)
            .json({ message: "Database error", error: err });

        if (organization) {
          res.json({
            message: "Organization profile fetched successfully!",
            organization,
          });
        } else {
          createOrganization(
            uid,
            name,
            email,
            phone,
            (err, newOrganization) => {
              if (err)
                return res
                  .status(500)
                  .json({
                    message: "Failed to create organization",
                    error: err,
                  });
              res.json({
                message: "Organization profile created successfully!",
                organization: newOrganization,
              });
            }
          );
        }
      });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "Email check failed", error: err.message });
    });
};

module.exports = { createOrgProfile };
