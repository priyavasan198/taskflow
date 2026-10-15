import React from 'react';
import './Header.css'; 

const Header = ({ username = "Student", activeTab, setActiveTab, onLogout }) => {
  return (
    <header className="taskflow-header">
      <div className="header-logo-container">
        <span className="header-icon">⚡</span>
        <h1 className="header-title">TaskFlow</h1>
      </div>
      
      <nav className="header-nav">
        <ul className="nav-links">
          <li 
            className={`nav-item ${activeTab === 'Dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('Dashboard')}
          >
            Dashboard
          </li>
          
          <li 
            className={`nav-item ${activeTab === 'Analytics' ? 'active' : ''}`}
            onClick={() => setActiveTab('Analytics')}
          >
            Analytics
          </li>
        </ul>
      </nav>

      <div className="header-user-profile">
        <span className="welcome-text">Welcome back, <strong>{username}</strong>!</span>
        <div className="avatar">
          {username.charAt(0).toUpperCase()}
        </div>
        
        <button 
          onClick={onLogout}
          className="logout-btn"
          style={{ background: 'transparent', border: '1px solid #ff5252', color: '#ff5252', padding: '0.35rem 0.75rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem', marginLeft: '0.5rem', transition: 'all 0.2s' }}
          onMouseEnter={(e) => { e.target.style.backgroundColor = '#ff5252'; e.target.style.color = '#fff'; }}
          onMouseLeave={(e) => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = '#ff5252'; }}
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
