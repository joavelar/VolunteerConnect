const savedModel = require('../models/savedModel');


const createSavedPost = async (req, res) => {
    const { post_id } = req.body;
    const firebase_uid = req.user.uid;
  
    try {
      const volunteer = await savedModel.getVolunteerByUID(firebase_uid);
      
      if (!volunteer) {
        return res.status(404).json({ message: "Volunteer not found" });
      }
  
      const result = await savedModel.createSavedPost(volunteer.vol_id, post_id);
  
      if (!result.success) {
        return res.status(400).json({ message: result.message });
      }
  
      res.status(201).json({ message: result.message, saved_id: result.saved_id });
  
    } catch (error) {
      console.error("Error saving post:", error);
      res.status(500).json({ message: "An unexpected error occurred", error: error.message });
    }
  };

const deleteSavedPost = async (req, res) => {
  const { post_id } = req.body;
  const firebase_uid = req.user.uid;

  try {
    const volunteer = await savedModel.getVolunteerByUID(firebase_uid);
    
    if (!volunteer) {
      return res.status(404).json({ message: "Volunteer not found" });
    }

    const result = await savedModel.deleteSavedPost(volunteer.vol_id, post_id);

    if (!result.success) {
      return res.status(404).json({ message: result.message });
    }

    res.status(200).json({ message: result.message });

  } catch (error) {
    console.error("Error deleting saved post:", error);
    res.status(500).json({ message: "An unexpected error occurred", error: error.message });
  }
}

const getSavedPost = async (req, res) => {
  const firebase_uid = req.user.uid;

  try {
    const volunteer = await savedModel.getVolunteerByUID(firebase_uid);

    if (!volunteer) {
      return res.status(404).json({ message: "Volunteer not found" });
    }

    const savedPosts = await savedModel.getSavedPostsByVolunteer (volunteer.vol_id);
    res.status(200).json(savedPosts);
  } catch (error) {
    console.error("Error fetching saved posts:", error);
    res.status(500).json({ message: "An unexcpected errored", error: error.message });
  }
};

module.exports = { createSavedPost, deleteSavedPost, getSavedPost };