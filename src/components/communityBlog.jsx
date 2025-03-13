import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './styles/communityBlog.css';
import { getDatabase, ref, onValue, set, push } from 'firebase/database';

function CommunityBlog() {
  const [searchQuery, setSearchQuery] = useState('');
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();
  const db = getDatabase();

  useEffect(() => {
    const postsRef = ref(db, 'posts');
    
    const unsubscribe = onValue(postsRef, (snapshot) => {
      setIsLoading(true);
      const postsData = snapshot.val();
      
      if (postsData) {
        const postsArray = Object.keys(postsData).map(key => ({
          id: key,
          ...postsData[key]
        }));
        
        const sortedPosts = sortPostsByDate(postsArray);
        setPosts(sortedPosts);
      } else {
        setPosts([]);
      }
      
      setIsLoading(false);
    });
    
    return () => unsubscribe();
  }, [db]);

  useEffect(() => {
    if (location.state && location.state.newPost) {
      window.history.replaceState({}, document.title, location.pathname);
    }
  }, [location]);

  function sortPostsByDate(postsArray) {
    return [...postsArray].sort((a, b) => {
      if (a.createdAt && b.createdAt) {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      
      let dateA = new Date(a.date);
      let dateB = new Date(b.date);
      
      if (dateA.getTime() === dateB.getTime()) {
        return b.id.localeCompare(a.id);
      }
      
      return dateB - dateA;
    });
  }

  function handleSearch(query) {
    if (query.trim() === '') {
      return posts;
    }
    return posts.filter(
      function(post) {
        const lowerCaseQuery = query.toLowerCase();
        return (
          post.title.toLowerCase().includes(lowerCaseQuery) ||
          post.content.toLowerCase().includes(lowerCaseQuery)
        );
      }
    );
  }
  
  const displayedPosts = handleSearch(searchQuery);

  function handleSearchInputChange(event) {
    setSearchQuery(event.target.value);
  }

  function renderPosts() {
    if (isLoading) {
      return <p>Loading posts...</p>;
    }
    
    if (displayedPosts.length > 0) {
      return displayedPosts.map(function(post, index) {
        return (
          <div className="post" key={post.id || index}>
            <div className="card" role="article">
              <div className="card-body">
                <div className="post-header">
                  <h2>{post.title}</h2>
                  <div className="post-meta">
                    <p>
                      <small>Posted by: {post.authorName || 'Anonymous'}</small>
                    </p>
                    <p>
                      <small>Date: {post.date}</small>
                    </p>
                  </div>
                </div>
                <p className="post-content">{post.content}</p>
              </div>
            </div>
          </div>
        );
      });
    } else {
      if (searchQuery) {
        return <p>No posts match your search.</p>;
      } else {
        return <p>No posts yet. Be the first to add a post!</p>;
      }
    }
  }

  return (
    <div className="app-container">
      <main className="main-content" role="main">
        <h1>Community Updates</h1>

        <section className="input-section">
          <form
            className="search-container"
            role="search"
            onSubmit={(e) => e.preventDefault()}
          >
            <label htmlFor="search-input" className="visually-hidden">
              Search posts
            </label>
            <button type="submit" className="search-button" aria-label="Search" disabled>
              <span className="fas fa-search search-icon" aria-hidden="true"></span>
            </button>
            <input
              type="text"
              className="search-input"
              id="search-input"
              placeholder="Search Post"
              value={searchQuery}
              onChange={handleSearchInputChange}
            />
          </form>
        </section>

        <section className="add-post-section">
          <Link to="/add-post" className="add-post-button">
            Add New Post
          </Link>
        </section>

        <section className="posts-section">
          <div className="container">
            {renderPosts()}
          </div>
        </section>
      </main>
    </div>
  );
}

export default CommunityBlog;