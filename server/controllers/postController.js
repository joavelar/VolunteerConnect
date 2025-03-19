const postModel = require('../models/postModel'); // Import the post model

const createPost = async (req, res) => {
  const { post_title, post_location, post_content, post_date, post_time, post_image_1 } = req.body;
  const firebase_uid = req.user.uid; // The firebase_uid (UUID) from the authenticated user

  try {
    // Get the org_id based on firebase_uid
    const organization = await postModel.getOrganizationByUID(firebase_uid);
    if (!organization) {
      return res.status(404).json({ message: 'Organization not found' });
    }

    const org_id = organization.org_id; // Get the org_id (integer)

    // Now create the post with the correct org_id
    const postId = await postModel.createPost(org_id, post_title, post_location, post_content, post_date, post_time, post_image_1);

    res.status(201).json({
      message: 'Post created successfully',
      post_id: postId, // Return the ID of the newly created post
    });
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ message: 'Error creating post', error: error.message });
  }
};

// Get all posts
const getPosts = async (req, res) => {
  try {
    const posts = await postModel.getPosts();
    res.status(200).json({ posts });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts', error: error.message });
  }
};

//delete post
const deletePost = async (req, res) => {
  const { post_id } = req.params;
  const firebase_uid = req.user.uid;

  try {
    const organization = await postModel.getOrganizationByUID(firebase_uid);

    if (!organization) {
      return res.status(404).json({ message: 'Organization not found' });
    }

    //attempt to delete post
    const result = await postModel.deletePost(post_id, organization.org_id);

    if (!result.success) {
      return res.status(404).json({ message: result.message });
    }

    res.status(200).json({ message: 'Post deleted successfully' });

  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ message: 'An unexpected error occurred', error: error.message });
  }
};

module.exports = { createPost, getPosts, deletePost };
