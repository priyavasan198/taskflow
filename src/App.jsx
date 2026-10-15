import React, { useState, useEffect } from 'react';
import './App.css';

// Importing team components exactly matching your file names and direct src path
import Header from './Header';
import Footer from './Footer';
import TaskNiru from './Task_Niru';   
import AddTaskForm from './Addtaskfrom'; 
import TaskList from './Task';           

function App() {
  // --- AUTHENTICATION STATE ---
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('taskflow_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // --- CORE APP TASK STATE ---
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('taskflow_tasks');
    return savedTasks ? JSON.parse(savedTasks) : [
      { id: 1, title: "Complete a MERN assignment", completed: false },
      { id: 2, title: "Prepare for a JavaScript test", completed: false },
      { id: 3, title: "Finish a seminar presentation", completed: false },
      { id: 4, title: "Practise coding for one hour", completed: true },
    ];
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('All'); 
  const [activeTab, setActiveTab] = useState('Dashboard');

  // --- LOCALSTORAGE PERSISTENCE MANAGEMENT ---
  useEffect(() => {
    localStorage.setItem('taskflow_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('taskflow_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('taskflow_user');
    }
  }, [user]);

  // --- AUTHENTICATION HANDLERS ---
  const handleLogin = (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;
    
    const displayName = email.split('@')[0];
    setUser({ name: displayName, email: email });
    setEmail('');
    setPassword('');
  };

  const handleLogout = () => {
    setUser(null);
    setActiveTab('Dashboard'); 
  };

  // --- TASK DELEGATOR PROPS ---
  const handleAddTask = (taskTitle) => {
    const newTask = { id: Date.now(), title: taskTitle, completed: false };
    setTasks([...tasks, newTask]);
  };

  const handleToggleComplete = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // --- QUERY FILTER LOGIC PROCESSING ---
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
    if (filterType === 'Pending') return matchesSearch && !task.completed;
    if (filterType === 'Completed') return matchesSearch && task.completed;
    return matchesSearch;
  });

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.completed).length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // --- CONDITIONALLY RENDER AUTH SCRIPTS ---
  if (!user) {
    return (
      <div className="taskflow-app-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#141416' }}>
        <div className="login-card" style={{ background: '#1e1e24', padding: '2.5rem', borderRadius: '12px', border: '1px solid #2d2d34', maxWidth: '400px', width: '90%', boxShadow: '0 8px 24px rgba(0,0,0,0.4)', textAlign: 'center' }}>
          <h1 style={{ margin: '0 0 0.5rem 0', background: 'linear-gradient(45deg, #00ffff, #007acc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 'bold' }}>⚡ TaskFlow</h1>
          <p style={{ color: '#8a8a93', fontSize: '0.9rem', marginBottom: '2rem' }}>Please enter your credentials to manage your tasks</p>
          
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', textAlign: 'left' }}>
            <div>
              <label style={{ display: 'block', color: '#e0e0e6', fontSize: '0.85rem', marginBottom: '0.5rem' }}>Email Address</label>
              <input 
                type="email" 
                required
                placeholder="Enter college email..." 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: '100%', boxSizing: 'border-box', padding: '0.75rem 1rem', background: '#141416', border: '1px solid #2d2d34', borderRadius: '6px', color: '#fff', outline: 'none' }}
              />
            </div>
            
            <div>
              <label style={{ display: 'block', color: '#e0e0e6', fontSize: '0.85rem', marginBottom: '0.5rem' }}>Password</label>
              <input 
                type="password" 
                required
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: '100%', boxSizing: 'border-box', padding: '0.75rem 1rem', background: '#141416', border: '1px solid #2d2d34', borderRadius: '6px', color: '#fff', outline: 'none' }}
              />
            </div>

            <button type="submit" style={{ width: '100%', background: 'linear-gradient(135deg, #007acc, #00ffff)', border: 'none', padding: '0.75rem', borderRadius: '6px', color: '#141416', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer', marginTop: '0.5rem' }}>
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="taskflow-app-container">
      <Header username={user.name} activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout} />

      <main className="dashboard-wrapper">
        {activeTab === 'Dashboard' ? (
          <>
            <TaskNiru 
              tasks={tasks} 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              filterType={filterType}
              setFilterType={setFilterType}
            />

            <AddTaskForm onAddTask={handleAddTask} />

            <TaskList 
              tasks={filteredTasks} 
              onToggleComplete={handleToggleComplete} 
              onDeleteTask={handleDeleteTask} 
            />
          </>
        ) : (
          <div className="analytics-view" style={{ color: '#fff', backgroundColor: '#1e1e24', padding: '2rem', borderRadius: '12px', border: '1px solid #2d2d34' }}>
            <h2 style={{ margin: '0 0 1.5rem 0', background: 'linear-gradient(45deg, #00ffff, #007acc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: '1.6rem' }}>Performance Analytics</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <p style={{ margin: '0 0 0.75rem 0', color: '#8a8a93' }}>Task Completion Rate</p>
                <div style={{ width: '100%', height: '26px', backgroundColor: '#141416', borderRadius: '13px', overflow: 'hidden', border: '1px solid #2d2d34' }}>
                  <div style={{ width: `${completionRate}%`, height: '100%', background: 'linear-gradient(90deg, #007acc, #00e676)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', color: '#141416', fontWeight: 'bold' }}>
                    {completionRate}%
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '0.5rem' }}>
                <div style={{ background: '#141416', padding: '1.25rem', borderRadius: '8px', border: '1px solid #2d2d34', textAlign: 'center' }}>
                  <span style={{ display: 'block', fontSize: '2.2rem', fontWeight: 'bold', color: '#00e676' }}>{completedTasks}</span>
                  <span style={{ fontSize: '0.85rem', color: '#8a8a93' }}>Completed Work</span>
                </div>
                <div style={{ background: '#141416', padding: '1.25rem', borderRadius: '8px', border: '1px solid #2d2d34', textAlign: 'center' }}>
                  <span style={{ display: 'block', fontSize: '2.2rem', fontWeight: 'bold', color: '#ffad33' }}>{totalTasks - completedTasks}</span>
                  <span style={{ fontSize: '0.85rem', color: '#8a8a93' }}>Pending Backlog</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;
