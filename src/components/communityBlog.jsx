import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './styles/styles.css';
import { getDatabase, ref, onValue, update, get, child, remove } from 'firebase/database';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

function CommunityBlog() {
  const [searchQuery, setSearchQuery] = useState('');
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [sortMethod, setSortMethod] = useState('date');

  const location = useLocation();
  const db = getDatabase();
  const auth = getAuth();

  // Track user authentication state
  useEffect(function() {
    const unsubscribe = onAuthStateChanged(auth, function(currentUser) {
      setUser(currentUser);
    });

    return function() {
      unsubscribe();
    };
  }, [auth]);

  // Fetch posts from Firebase database
  useEffect(function() {
    const postsRef = ref(db, 'posts');
    
    const unsubscribe = onValue(postsRef, function(snapshot) {
      setIsLoading(true);
      const postsData = snapshot.val();
      
      if (postsData) {
        const postsArray = [];
        const keys = Object.keys(postsData);
        
        for (let i = 0; i < keys.length; i++) {
          const key = keys[i];
          const postVotes = postsData[key].votes || {};
          
          postsArray.push({
            id: key,
            ...postsData[key],
            votes: postVotes,
            voteScore: calculateVoteScore(postVotes)
          });
        }
        
        const sortedPosts = sortPosts(postsArray);
        setPosts(sortedPosts);
      } else {
        setPosts([]);
      }
      
      setIsLoading(false);
    });
    
    return function() {
      unsubscribe();
    };
  }, [db]);

  // Clear navigation state after a new post is added
  useEffect(function() {
    if (location.state && location.state.newPost) {
      window.history.replaceState({}, '', location.pathname);
    }
  }, [location]);

  // Resort posts when sort method changes
  useEffect(function() {
    if (posts.length > 0) {
      const sortedPosts = sortPosts([...posts]);
      setPosts(sortedPosts);
    }
  }, [sortMethod]);

  // Calculate total vote score for a post
  function calculateVoteScore(votes) {
    if (!votes) return 0;
    
    let score = 0;
    const voteValues = Object.values(votes);
    
    for (let i = 0; i < voteValues.length; i++) {
      score += voteValues[i];
    }
    
    return score;
  }

  // Sort posts based on selected method (top or date)
  function sortPosts(postsArray) {
    if (sortMethod === 'top') {
      const result = [...postsArray];
      result.sort(function(a, b) {
        let scoreA = a.voteScore;
        if (scoreA === undefined) {
          scoreA = 0;
        }
        
        let scoreB = b.voteScore;
        if (scoreB === undefined) {
          scoreB = 0;
        }
        
        return scoreB - scoreA;
      });
      return result;
    } else {
      return sortPostsByDate(postsArray);
    }
  }

  // Handle sort method change
  function handleSortChange(event) {
    setSortMethod(event.target.value);
  }

  // Delete post from the database
  function deletePost(postId) {
    const postRef = ref(db, "posts/" + postId);
    remove(postRef)
      .then(() => {
        console.log("Post deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting post:", error);
      });
  }

  // Process user votes on posts
  function handleVote(postId, voteValue) {
    if (!user) {
      alert("You must be logged in to vote on posts.");
      return;
    }

    const postRef = ref(db, "posts/" + postId);
    const userId = user.uid;

    // Get current post data - Used a little bit of AI for help
    get(child(ref(db), "posts/" + postId)).then(function(snapshot) {
      if (snapshot.exists()) {
        const post = snapshot.val();
        const votes = post.votes || {};
        
        let previousVote = votes[userId];
        if (previousVote === undefined) {
          previousVote = 0;
        }
        
        if (previousVote === voteValue) {
          const updatedVotes = { ...votes };
          delete updatedVotes[userId];
          
          update(postRef, { votes: updatedVotes });
          
          // Check if post needs to be deleted after vote is removed
          const newScore = calculateVoteScore(updatedVotes);
          if (newScore < -10) {
            deletePost(postId);
          }
        } else {
          const newVotes = { ...votes };
          newVotes[userId] = voteValue;
          update(postRef, { votes: newVotes });
        
          const newScore = calculateVoteScore(newVotes);
          if (newScore < -10) {
            deletePost(postId);
          }
        }
      }
    }).catch(function(error) {
      console.error("Error handling vote:", error);
    });
  }

  // Sort posts by creation date
  function sortPostsByDate(postsArray) {
    const result = [...postsArray];
    result.sort(function(a, b) {
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
    return result;
  }

  // Filter posts based on search query
  function handleSearch(query) {
    if (query.trim() === '') {
      return posts;
    }
    
    const filteredPosts = [];
    const lowerCaseQuery = query.toLowerCase();
    
    for (let i = 0; i < posts.length; i++) {
      const post = posts[i];
      if (
        post.title.toLowerCase().includes(lowerCaseQuery) ||
        post.content.toLowerCase().includes(lowerCaseQuery)
      ) {
        filteredPosts.push(post);
      }
    }
    
    return filteredPosts;
  }
  
  const displayedPosts = handleSearch(searchQuery);

  // Update search query state on input change
  function handleSearchInputChange(event) {
    setSearchQuery(event.target.value);
  }

  // Get the current user's vote on a post
  function getUserVote(post) {
    if (!user || !post.votes) {
      return 0;
    }
    
    let userVote = post.votes[user.uid];
    if (userVote === undefined) {
      userVote = 0;
    }
    
    return userVote;
  }

  // Render upvote/downvote button
  function renderVoteButton(post, voteValue, buttonLabel) {
    const userVote = getUserVote(post);
    let buttonClass = 'vote-button ';
    
    if (voteValue === 1) {
      buttonClass += 'upvote ';
      if (userVote === 1) {
        buttonClass += 'active';
      }
    } else {
      buttonClass += 'downvote ';
      if (userVote === -1) {
        buttonClass += 'active';
      }
    }

    function handleClick() {
      handleVote(post.id, voteValue);
    }

    let buttonSymbol;
    if (voteValue === 1) {
      buttonSymbol = '▲';
    } else {
      buttonSymbol = '▼';
    }
    
    return (
      <button 
        onClick={handleClick}
        className={buttonClass}
        aria-label={buttonLabel}
        title={buttonLabel}
      >
        {buttonSymbol}
      </button>
    );
  }

  // Helper function to render post content preserving exact formatting - Used AI for help
  function renderPostContent(content) {
    if (!content) return null;
    return <pre className="post-content-text">{content}</pre>;
  }

  // Render all posts with search and sort applied - Used AI for help
  function renderPosts() {
    if (isLoading) {
      return <p>Loading posts...</p>;
    }
    
    if (displayedPosts.length > 0) {
      const postElements = [];
      
      for (let i = 0; i < displayedPosts.length; i++) {
        const post = displayedPosts[i];
        let postId = post.id;
        if (!postId) {
          postId = i;
        }
        
        let authorName = post.authorName;
        if (!authorName) {
          authorName = 'Anonymous';
        }
        
        let voteScore = post.voteScore;
        if (voteScore === undefined) {
          voteScore = 0;
        }
        
        postElements.push(
          <div className="post" key={postId}>
            <div className="card" role="article">
              <div className="vote-column">
                {renderVoteButton(post, 1, "Upvote")}
                <span className="vote-score">{voteScore}</span>
                {renderVoteButton(post, -1, "Downvote")}
              </div>
              <div className="card-body">
                <div className="post-header">
                  <h2>{post.title}</h2>
                  <div className="post-meta">
                    <p>
                      <small>Posted by: {authorName}</small>
                    </p>
                    <p>
                      <small>Date: {post.date}</small>
                    </p>
                  </div>
                </div>
                <div className="post-content">
                  {renderPostContent(post.content)}
                </div>
              </div>
            </div>
          </div>
        );
      }
      
      return postElements;
    } else {
      if (searchQuery) {
        return <p>No posts match your search.</p>;
      } else {
        return <p>No posts yet. Be the first to add a post!</p>;
      }
    }
  }

  // Prevent default form submission behavior
  function handleFormSubmit(e) {
    e.preventDefault();
  }

  // Render the sort dropdown control
  function renderSortControls() {
    return (
      <div className="sort-controls">
        <label htmlFor="sort-select">Sort by: </label>
        <select 
          id="sort-select" 
          value={sortMethod} 
          onChange={handleSortChange}
          className="sort-select"
        >
          <option value="top">Top Rated</option>
          <option value="date">Recent</option>
        </select>
      </div>
    );
  }

  return (
      <div className="community-content">
        <h1>Community Updates</h1>

        <section className="input-section">
          <form
            className="search-container"
            role="search"
            onSubmit={handleFormSubmit}
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
        
        <section className="controls-section">
          <div className="controls-container">
            {renderSortControls()}
            <Link to="/add-post" className="add-post-button">
              Add New Post
            </Link>
          </div>
        </section>

        <section className="posts-section">
          <div className="container">
            {renderPosts()}
          </div>
        </section>
      </div>
  );
}

export default CommunityBlog;