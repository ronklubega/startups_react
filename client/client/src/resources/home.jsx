import React, { useState } from 'react';
import './home.css'; // Import CSS for styling

function Home() {
  const [activeTab, setActiveTab] = useState('dashboard'); // State to track the active tab

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <p>Welcome to the Receptionist Dashboard. Select an option from the sidebar.</p>;
      case 'register':
        return (
          <div>
            <h2>Register New Patient</h2>
            <form className="form">
              <div>
                <label>Full Name:</label>
                <input type="text" placeholder="Enter full name" required />
              </div>
              <div>
                <label>Age:</label>
                <input type="number" placeholder="Enter age" required />
              </div>
              <div>
                <label>Contact:</label>
                <input type="text" placeholder="Enter contact number" required />
              </div>
              <div>
                <label>Address:</label>
                <input type="text" placeholder="Enter address" required />
              </div>
              <button type="submit">Register Patient</button>
            </form>
          </div>
        );
      case 'billing':
        return (
          <div>
            <h2>Billing</h2>
            <form className="form">
              <div>
                <label>Patient ID:</label>
                <input type="text" placeholder="Enter patient ID" required />
              </div>
              <div>
                <label>Service:</label>
                <input type="text" placeholder="Enter service provided" required />
              </div>
              <div>
                <label>Amount:</label>
                <input type="number" placeholder="Enter amount" required />
              </div>
              <button type="submit">Generate Bill</button>
            </form>
          </div>
        );
      case 'createVisit':
        return (
          <div>
            <h2>Create Patient Visit</h2>
            <form className="form">
              <div>
                <label>Patient ID:</label>
                <input type="text" placeholder="Enter patient ID" required />
              </div>
              <div>
                <label>Visit Date:</label>
                <input type="date" required />
              </div>
              <div>
                <label>Reason for Visit:</label>
                <textarea placeholder="Enter reason for visit" required></textarea>
              </div>
              <div>
                <label>Doctor Assigned:</label>
                <input type="text" placeholder="Enter doctor's name" required />
              </div>
              <button type="submit">Create Visit</button>
            </form>
          </div>
        );
      case 'reports':
        return (
          <div>
            <h2>Reports</h2>
            <p>View and generate reports for patient registrations, billing, and visits.</p>
          </div>
        );
      default:
        return <p>Select an option from the sidebar.</p>;
    }
  };

  return (
    <div className="home-container">
      <aside className="sidebar">
        <h2>Receptionist Panel</h2>
        <ul>
          <li onClick={() => setActiveTab('dashboard')}>Dashboard</li>
          <li onClick={() => setActiveTab('register')}>Register Patient</li>
          <li onClick={() => setActiveTab('billing')}>Billing</li>
          <li onClick={() => setActiveTab('createVisit')}>Create Visit</li>
          <li onClick={() => setActiveTab('reports')}>Reports</li>
        </ul>
      </aside>

      <main className="main-content">
        <div className="cards-container">
          <div className="card">Extras</div>
          <div className="card">Doctor</div>
          <div className="card">Setting</div>
          <div className="card">Lab Results</div>
          <div className="card">Prescriptions</div>
        </div>
        <header>
          <h1>Hospital Billing System</h1>
        </header>
        <section>{renderContent()}</section>
      </main>
    </div>
  );
}

export default Home;