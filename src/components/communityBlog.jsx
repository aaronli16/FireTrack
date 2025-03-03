import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './styles/communityBlog.css';

function CommunityBlog() {
  // State variables
  const [searchQuery, setSearchQuery] = useState('');
  const [posts, setPosts] = useState([]);
  const [hasAddedNewPost, setHasAddedNewPost] = useState(false);
  
  // Get location from react-router to check for new posts
  const location = useLocation();
  
  // Session storage key - used to save/retrieve posts between page navigations
  const sessionStorageKey = 'sessionCommunityBlogPosts';

  // Default posts that will be shown on page refresh or first visit
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

  // Function to sort posts by date (newest first)
  function sortPostsByDate(postsArray) {
    return [...postsArray].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB - dateA; // Descending order (newest first)
    });
  }

  // Load posts on initial page load
  useEffect(() => {
    // Check if this is a page refresh by checking sessionStorage
    const sessionPosts = sessionStorage.getItem(sessionStorageKey);
    
    if (sessionPosts) {
      // If we have posts in session storage, use them (keeps posts between page navigations)
      setPosts(JSON.parse(sessionPosts));
    } else {
      // First visit or page was refreshed - use default posts
      const sortedDefaultPosts = sortPostsByDate(defaultPosts);
      setPosts(sortedDefaultPosts);
      // Save default posts to session storage
      sessionStorage.setItem(sessionStorageKey, JSON.stringify(sortedDefaultPosts));
    }
    
    // Set up the beforeunload event listener to detect page refresh
    function handleBeforeUnload() {
      // Clear session storage when page is refreshed or closed
      sessionStorage.removeItem(sessionStorageKey);
    }
    
    // Add the event listener for page refresh
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    // Clean up the event listener when component unmounts
    return function cleanup() {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  // Check for new posts from the Add Post page
  useEffect(() => {
    // If we have a new post in the location state and haven't processed it yet
    if (location.state && location.state.newPost && !hasAddedNewPost) {
      const newPost = location.state.newPost;
      
      // Add the new post to our posts array
      setPosts(function(currentPosts) {
        // Check if this exact post already exists (prevent duplicates)
        const isDuplicate = currentPosts.some(
          function(post) {
            return (
              post.title === newPost.title &&
              post.date === newPost.date &&
              post.content === newPost.content
            );
          }
        );
        
        // If it's not a duplicate, add it
        if (!isDuplicate) {
          // Mark that we've added the post so we don't add it again
          setHasAddedNewPost(true);
          
          // Create updated posts array with new post at beginning
          const updatedPosts = sortPostsByDate([newPost, ...currentPosts]);
          
          // Save to sessionStorage so it persists between page navigations
          sessionStorage.setItem(sessionStorageKey, JSON.stringify(updatedPosts));
          
          return updatedPosts;
        }
        
        // If duplicate, just return current posts unchanged
        return currentPosts;
      });
      
      // Clear the location state so we don't re-add on re-renders
      window.history.replaceState({}, document.title, location.pathname);
    }
  }, [location, hasAddedNewPost]); // Run when location or hasAddedNewPost changes

  // Filter posts based on search query
  function handleSearch(query) {
    if (query.trim() === '') {
      // If search is empty, return all posts
      return posts;
    }
    
    // Filter posts that match the search query in title or content
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

  // Get posts filtered by search query
  const displayedPosts = handleSearch(searchQuery);

  // Handle search input changes
  function handleSearchInputChange(event) {
    setSearchQuery(event.target.value);
  }

  // Function to render the posts
  function renderPosts() {
    if (displayedPosts.length > 0) {
      // If we have posts to display, map through them
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
      // If no posts match the search, show message
      return <p>No posts match your search.</p>;
    }
  }

  return (
    <div className="app-container">
      <main className="main-content" role="main">
        <h1>Community Updates</h1>

        {/* Search Section */}
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

        {/* Add Post Button Section */}
        <section className="add-post-section">
          <Link to="/add-post" className="add-post-button">
            Add New Post
          </Link>
        </section>

        {/* Posts Section */}
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