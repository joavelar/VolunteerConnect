const commentModel = require('../models/commentModel');
const postModel = require('../models/postModel')

const createOrgComment = async (req, res) => {
  const { post_id } = req.params;
  const { comment_text, comment_date } = req.body;
  const firebase_uid = req.user.uid; // The firebase_uid (UUID) from the authenticated user

  try {
    // Get the org_id based on firebase_uid
    const organization = await postModel.getOrganizationByUID(firebase_uid);
    if (!organization) {
      return res.status(404).json({ message: 'Organization not found' });
    }

    const org_id = organization.org_id; // Get the org_id (integer)

    //check if the post exists
    const postExists = await postModel.getPostById(post_id);
    if (!postExists) {
        return res.status(404).json({ message: 'Post not found' })
    }

    // Now create the comment with the correct org_id
    const commentId = await commentModel.createOrgComment(post_id, org_id, comment_text, comment_date);

    res.status(201).json({
      message: 'Comment created successfully',
      comment_id: commentId, // Return the ID of the newly created post
    });
  } catch (error) {
    console.error('Error creating comment:', error);
    res.status(500).json({ message: 'Error creating comment', error: error.message });
  }
};

const createVolComment = async (req, res) => {
    const { post_id } = req.params;
    const { comment_text, comment_date } = req.body;
    const firebase_uid = req.user.uid; // The firebase_uid (UUID) from the authenticated user
  
    try {
      // Get the VOL_id based on firebase_uid
      const volunteer = await commentModel.getVolunteerByUID(firebase_uid);
      if (!volunteer) {
        return res.status(404).json({ message: 'volunteer not found' });
      }
  
      const vol_id = volunteer.vol_id; // Get the vol_id (integer)
      console.log('Volunteer ID:', vol_id);

      //check if the post exists
      const postExists = await postModel.getPostById(post_id);
      if (!postExists) {
          return res.status(404).json({ message: 'Post not found' })
      }
      
      console.log('Post exists:', postExists);

      // Now create the comment with the correct vol_id
      const commentId = await commentModel.createVolComment(post_id, vol_id, comment_text, comment_date);
  
      res.status(201).json({
        message: 'Comment created successfully',
        comment_id: commentId, // Return the ID of the newly created post
      });
    } catch (error) {
      console.error('Error creating comment:', error);
      res.status(500).json({ message: 'Error creating comment', error: error.message });
    }
  };


  const getCommentsByPost = async (req, res) => {
    const { post_id } = req.params;
  
    try {
        //check if the post exists
        const postExists = await postModel.getPostById(post_id);
        if (!postExists) {
            return res.status(404).json({ message: 'Post not found' })
        }

        const comments = await commentModel.getCommentsByPost(post_id);

        res.status(200).json({ comments });
    } catch (error) {
        console.error('Error fecthing comments:', error);
        res.status(500).json({ message: 'Error fetching comments', error: error.message })
    }
  };

module.exports = { createOrgComment, createVolComment, getCommentsByPost };