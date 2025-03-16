import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './styles/styles.css';
import { getDatabase, ref, onValue, update, get, child } from 'firebase/database';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

function CommunityBlog() {
  const [searchQuery, setSearchQuery] = useState('');
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [sortMethod, setSortMethod] = useState('date'); // Changed default sort to 'date'

  const location = useLocation();
  const db = getDatabase();
  const auth = getAuth();

  useEffect(function() {
    const unsubscribe = onAuthStateChanged(auth, function(currentUser) {
      setUser(currentUser);
    });

    return function() {
      unsubscribe();
    };
  }, [auth]);

  useEffect(function() {
    const postsRef = ref(db, 'posts');
    
    const unsubscribe = onValue(postsRef, function(snapshot) {
      setIsLoading(true);
      const postsData = snapshot.val();
      
      if (postsData) {
        const postsArray = Object.keys(postsData).map(function(key) {
          const postVotes = postsData[key].votes || {};
          
          return {
            id: key,
            ...postsData[key],
            votes: postVotes,
            voteScore: calculateVoteScore(postVotes)
          };
        });
        
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

  useEffect(function() {
    if (location.state && location.state.newPost) {
      window.history.replaceState({}, document.title, location.pathname);
    }
  }, [location]);

  useEffect(function() {
    // Re-sort posts when sort method changes
    if (posts.length > 0) {
      const sortedPosts = sortPosts([...posts]);
      setPosts(sortedPosts);
    }
  }, [sortMethod]);

  function calculateVoteScore(votes) {
    if (!votes) return 0;
    
    let score = 0;
    Object.values(votes).forEach(function(vote) {
      score += vote; // +1 for upvotes, -1 for downvotes
    });
    
    return score;
  }

  function sortPosts(postsArray) {
    if (sortMethod === 'top') {
      // Sort by most votes
      return [...postsArray].sort(function(a, b) {
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
    } else {
      // Default - sort by date
      return sortPostsByDate(postsArray);
    }
  }

  function handleSortChange(event) {
    setSortMethod(event.target.value);
  }

  function handleVote(postId, voteValue) {
    if (!user) {
      alert("You must be logged in to vote on posts.");
      return;
    }

    const postRef = ref(db, `posts/${postId}`);
    const userId = user.uid;

    // Get current post data
    get(child(ref(db), `posts/${postId}`)).then(function(snapshot) {
      if (snapshot.exists()) {
        const post = snapshot.val();
        const votes = post.votes || {};
        
        // Check if user has already voted
        let previousVote = votes[userId];
        if (previousVote === undefined) {
          previousVote = 0;
        }
        
        // If clicking the same vote type again, remove the vote
        if (previousVote === voteValue) {
          // Remove vote
          const updatedVotes = { ...votes };
          delete updatedVotes[userId];
          
          update(postRef, { votes: updatedVotes });
        } else {
          // Add or change vote
          const newVotes = { ...votes };
          newVotes[userId] = voteValue;
          update(postRef, { votes: newVotes });
        }
      }
    }).catch(function(error) {
      console.error("Error handling vote:", error);
    });
  }

  function sortPostsByDate(postsArray) {
    return [...postsArray].sort(function(a, b) {
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

  function getUserVote(post) {
    if (!user || !post.votes) return 0;
    
    let userVote = post.votes[user.uid];
    if (userVote === undefined) {
      userVote = 0;
    }
    
    return userVote;
  }

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

  function renderPosts() {
    if (isLoading) {
      return <p>Loading posts...</p>;
    }
    
    if (displayedPosts.length > 0) {
      return displayedPosts.map(function(post, index) {
        let postId = post.id;
        if (!postId) {
          postId = index;
        }
        
        let authorName = post.authorName;
        if (!authorName) {
          authorName = 'Anonymous';
        }
        
        let voteScore = post.voteScore;
        if (voteScore === undefined) {
          voteScore = 0;
        }
        
        return (
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

  function handleFormSubmit(e) {
    e.preventDefault();
  }

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
    <div className="app-container">
      <main className="content">
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
      </main>
    </div>
  );
}

export default CommunityBlog;