import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './styles/styles.css';
import { auth, db } from '../firebase';
import { ref, onValue, remove } from 'firebase/database';


// MyPosts component
function MyPosts() {
    const [posts, setPosts] = useState([]); // State to store user's posts
    const [loading, setLoading] = useState(true); // State to manage loading state
    const currentUser = auth.currentUser; // Get the current authenticated user


    // Fetch user's posts from Firebase
    useEffect(() => {
        if (!currentUser) return;

        // Reference to the posts node
        const postsRef = ref(db, 'posts');

        // Set up real-time listener
        const unsubscribe = onValue(postsRef, (snapshot) => {
            const postsData = snapshot.val();
            if (postsData) {
                // Convert posts object to array and filter for current user's posts
                const postsArray = Object.entries(postsData)
                    .map(([id, post]) => ({
                        id,
                        ...post
                    }))
                    .filter(post => post.authorId === currentUser.uid)
                    // Sort by date, most recent first
                    .sort((a, b) => new Date(b.date) - new Date(a.date));

                setPosts(postsArray);
            } else {
                setPosts([]);
            }
            setLoading(false);
        });

        // Cleanup listener on unmount
        return () => unsubscribe();
    }, [currentUser]);

    // Handle post deletion
    const handleDelete = async (postId) => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            try {
                const postRef = ref(db, `posts/${postId}`);
                await remove(postRef);
                // No need to manually update state as the realtime listener will handle it
            } catch (error) {
                console.error('Error deleting post:', error);
                alert('Failed to delete post. Please try again.');
            }
        }
    };

    if (loading) {
        return (
            <div className="my-posts-container">
                <h1>My Posts</h1>
                <div className="loading">Loading your posts...</div>
            </div>
        );
    }

    if (posts.length === 0) {
        return (
            <div className="my-posts-container">
                <h1>My Posts</h1>
                <div className="no-posts-content">
                    <div className="no-posts-icon">
                        <i className="fas fa-pencil-alt"></i>
                    </div>
                    <p>You haven't created any posts yet</p>
                    <p className="sub-text">Share updates and connect with your community</p>
                    <Link to="/add-post" className="create-post-button">
                        Create Your First Post
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="my-posts-container">
            <div className="posts-header content">
                <h1>My Posts</h1>
                <Link to="/add-post" className="new-post-button">
                    <i className="fas fa-plus"></i> New Post
                </Link>
            </div>

            <div className="posts-grid">
                {posts.map((post) => (
                    <div key={post.id} className="post-card">
                        <div className="post-header">
                            <h2>{post.title}</h2>
                            <div className="post-meta">
                                <span className="post-date">
                                    <i className="far fa-calendar"></i>
                                    {post.date}
                                </span>
                            </div>
                        </div>
                        <p className="post-content">{post.content}</p>
                        <div className="post-actions">

                            <button
                                className="delete-button"
                                onClick={() => handleDelete(post.id)}
                            >
                                <i className="fas fa-trash"></i> Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MyPosts; 