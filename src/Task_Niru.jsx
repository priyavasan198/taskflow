//Task_Niru.jsx                        import React from 'react';
import './Task_Niru.css';

const TaskNiru = ({ tasks, searchQuery, setSearchQuery, filterType, setFilterType }) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  return (
    <div className="stats-dashboard-container">
      {/* Dynamic Statistics Panel */}
      <div className="stats-panel">
        <div className="stat-box">
          <span className="stat-label">Total Tasks</span>
          <span className="stat-value">{totalTasks}</span>
        </div>
        <div className="stat-box pending">
          <span className="stat-label">Pending</span>
          <span className="stat-value">{pendingTasks}</span>
        </div>
        <div className="stat-box completed">
          <span className="stat-label">Completed</span>
          <span className="stat-value">{completedTasks}</span>
        </div>
      </div>

      {/* Control Search & Filters Panel */}
      <div className="controls-panel">
        <input 
          type="text" 
          className="search-bar" 
          placeholder="🔍 Search tasks by title..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        
        <div className="filter-buttons-group">
          {['All', 'Pending', 'Completed'].map((type) => (
            <button
              key={type}
              className={filter-btn ${filterType === type ? 'active' : ''}}
              onClick={() => setFilterType(type)}
            >
              {type}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskNiru;