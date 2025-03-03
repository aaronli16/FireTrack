import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './styles/communityBlog.css';

function CommunityBlog() {
  const [searchQuery, setSearchQuery] = useState('');
  const [posts, setPosts] = useState([]);
  const [hasAddedNewPost, setHasAddedNewPost] = useState(false);

  const location = useLocation();
  
  const sessionStorageKey = 'sessionCommunityBlogPosts';

  const defaultPosts = [
    {
      title: 'New Fire-Resistant Housing Initiative Launched',
      date: '1/29/2025',
      content: 'State officials have announced funding for fire-resistant home construction in high-risk areas.',
    },
    {
      title: 'Scientists Warn of Increasing Wildfire Frequency',
      date: '1/28/2025',
      content: 'Experts say climate change is contributing to longer and more severe fire seasons across the U.S.',
    },
    {
      title: 'Community Rallies to Support Displaced Families',
      date: '1/27/2025',
      content: 'Local shelters are providing aid to families who lost their homes due to recent wildfires.',
    },
    {
      title: 'Firefighters Gain Control Over Major Wildfire',
      date: '1/26/2025',
      content: 'After days of battling intense flames, firefighters have contained 70% of the wildfire in southern Oregon.',
    },
    {
      title: 'Severe Drought Conditions Worsen',
      date: '1/25/2025',
      content: 'Water reserves are at an all-time low, with local authorities urging residents to conserve water.',
    },
    {
      title: 'Emergency! New Blaze Erupts in California!',
      date: '1/24/2025',
      content: 'A new wildfire has broken out in northern California, prompting immediate evacuation orders.',
    },
  ];

  function sortPostsByDate(postsArray) {
    return [...postsArray].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB - dateA;
    });
  }

  useEffect(() => {
    const sessionPosts = sessionStorage.getItem(sessionStorageKey);
    
    if (sessionPosts) {
      setPosts(JSON.parse(sessionPosts));
    } else {
      const sortedDefaultPosts = sortPostsByDate(defaultPosts);
      setPosts(sortedDefaultPosts);
      sessionStorage.setItem(sessionStorageKey, JSON.stringify(sortedDefaultPosts));
    }
    
    function handleBeforeUnload() {
      sessionStorage.removeItem(sessionStorageKey);
    }
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return function cleanup() {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    if (location.state && location.state.newPost && !hasAddedNewPost) {
      const newPost = location.state.newPost;
      
      setPosts(function(currentPosts) {
        const isDuplicate = currentPosts.some(
          function(post) {
            return (
              post.title === newPost.title &&
              post.date === newPost.date &&
              post.content === newPost.content
            );
          }
        );
        
        if (!isDuplicate) {
          setHasAddedNewPost(true);
          const updatedPosts = sortPostsByDate([newPost, ...currentPosts]);
          sessionStorage.setItem(sessionStorageKey, JSON.stringify(updatedPosts));
          
          return updatedPosts;
        }
        return currentPosts;
      });
      window.history.replaceState({}, document.title, location.pathname);
    }
  }, [location, hasAddedNewPost]);

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
    if (displayedPosts.length > 0) {
      return displayedPosts.map(function(post, index) {
        return (
          <div className="post" key={index}>
            <div className="card" role="article">
              <div className="card-body">
                <h2>{post.title}</h2>
                <p>
                  <small>Posted date: {post.date}</small>
                </p>
                <p>{post.content}</p>
              </div>
            </div>
          </div>
        );
      });
    } else {
      return <p>No posts match your search.</p>;
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