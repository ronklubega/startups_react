import React, { useState } from 'react';
import './home.css'; // Import CSS for styling

function Home() {
  const [activeTab, setActiveTab] = useState('dashboard'); // State to track the active tab
  // State to hold form data(patient registration)
  const[regForm,setRegForm] = useState({
    firstName:'',lastName:'',nextOfKin:'',occupation:'',insurance:'',insNo:'' ,address:'',telephone:'',email:''

  })
  const HandleChange = (e) => {
    const { name, value } = e.target;
    setRegForm({ ...regForm, [name]: value });
  };  
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      const response = await fetch('http://localhost:3000/auth/registerPatient', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(regForm), // Send the form data as JSON
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Patient registered successfully:', data);
        alert('Patient registered successfully!');
        setRegForm({
          firstName: '',
          lastName: '',
          nextOfKin: '',
          occupation: '',
          insurance: '',
          insNo: '',
          address: '',
          telephone: '',
          email: '',
        }); // Reset the form
      } else {
        console.error('Error registering patient:', data.error);
        alert('Failed to register patient: ' + data.error);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while submitting the form.');
    }
  };
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <p>Welcome to the Receptionist Dashboard. Select an option from the sidebar.</p>;
      case 'register':
        return (
          <div className="register-container">
      <form className="form-grid" onSubmit={handleSubmit}>
        <label>First Name<input type="text" name="firstName" value={regForm.firstName} onChange={HandleChange}/></label>
        <label>Last Name<input type="text"  name="lastName" value={regForm.lastName} onChange={HandleChange}/></label>
        <label>DOB<input type="date" name="dob" value={regForm.dob} onChange={HandleChange}/></label>

        <label>Next Of Kin<input type="text" name="nextOfKin" value={regForm.nextOfKin} onChange={HandleChange} /></label>
        <label>Occupation<input type="text" name="occupation" value={regForm.occupation} onChange={HandleChange}/></label>

        <label>Insurance<input type="text" name="insurance" value={regForm.insurance} onChange={HandleChange} /></label>
        <label>Ins No<input type="text" name="insNo" value={regForm.insNo} onChange={HandleChange}/></label>

        <label>Address<input type="text" name="address" value={regForm.address} onChange={HandleChange}/></label>
        <label>Tel No<input type="tel" name="telephone" value={regForm.telephone} onChange={HandleChange} /></label>
        <label>Email<input type="email" name="email" value={regForm.email} onChange={HandleChange}/></label>

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
          <div className="visit-container">
      <form className="visit-form">
        <label>PatientID<input type="text" /></label>
        <label>PatientName<input type="text" /></label>
        <label>DOB<input type="date" /></label>

        <label>Date<input type="date" /></label>
        <label>INSUARANCE<input type="text" /></label>
        <label className="checkbox-label">Cash<input type="checkbox" /></label>

        <label>Service<input type="text" /></label>
        <label>Doctor<input type="text" /></label>
        <label>Speciality<input type="text" /></label>

        <div className="checkbox-group">
          <label className="checkbox-label">OPD<input type="checkbox" /></label>
          <label className="checkbox-label">IPD<input type="checkbox" /></label>
        </div>

        <label>VisitNumber<input type="text" /></label>

        <button type="submit">CREAT VISIT</button>
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
        <h2>Billing System</h2>
        <ul>
          <li onClick={() => setActiveTab('dashboard')}>Dashboard</li>
          <li onClick={() => setActiveTab('register')}>Register Patient</li>
          <li onClick={() => setActiveTab('billing')}>Billing</li>
          <li onClick={() => setActiveTab('createVisit')}>Create Visit</li>
          <li onClick={() => setActiveTab('reports')}>Reports</li>
          <li onClick={() => setActiveTab('reports')}>Doctor</li>
          <li onClick={() => setActiveTab('reports')}>Nurse</li>
          <li onClick={() => setActiveTab('reports')}>Radiology</li>
          <li onClick={() => setActiveTab('reports')}>Pharmacy</li>
          <li onClick={() => setActiveTab('reports')}>Lab</li>
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
        
        <section>{renderContent()}</section>
      </main>
    </div>
  );
}

export default Home;