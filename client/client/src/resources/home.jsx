import React, { useState } from 'react';
import './home.css'; // Import CSS for styling

function Home() {
  const [activeTab, setActiveTab] = useState('dashboard'); // State to track the active tab
  const [searchQuery, setSearchQuery] = useState(''); // State to hold search query
  const [searchResults, setSearchResults] = useState([]); // State to hold search results
  // State to hold form data(patient registration)
  const[regForm,setRegForm] = useState({
    firstName:'',lastName:'',nextOfKin:'',occupation:'',insurance:'',insNo:'' ,address:'',telephone:'',email:''

  })
  //create visit
  const handleCreateVisit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
  
    try {
      const response = await fetch('http://localhost:3000/auth/createVisit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(visitForm), // Send the visit form data as JSON
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert(`Visit created successfully! Visit Number: ${data.visitNumber}`);
        setVistForm({
          patientNo: '',
          patientName: '',
          dob: '',
          visitDate: '',
          insurance: '',
          cash: false,
          service: '',
          doctor: '',
          speciality: '',
          visitNumber: '',
        }); // Reset the form
      } else {
        alert('Failed to create visit: ' + data.error);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while creating the visit.');
    }
  };
  // STATE TO HOLD CREATING VISIT
  const[visitForm,setVistForm] = useState({
    patientNo: '', patientName: '', dob: '', visitDate: '', insurance: '', cash: false, service: '', doctor: '', speciality: '', visitNumber: ''
  })
  const HandleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setRegForm({ ...regForm, [name]: newValue });
    setVistForm({ ...visitForm, [name]: newValue });
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
  const handleSearchChange = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length > 2) { // Start searching after 3 characters
      try {
        const response = await fetch(`http://localhost:3000/auth/patients/search?query=${query}`);
        const data = await response.json();
        setSearchResults(data); // Update search results
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    } else {
      setSearchResults([]); // Clear results if query is too short
    }
  };

  const handlePatientSelect = (patient) => {
    // Populate the form with the selected patient's details
    setVistForm({
      ...visitForm,
      patientNo: patient.patientNo,
      patientName: `${patient.firstName} ${patient.lastName}`,
      dob: patient.dob,
      insurance: patient.insurance,
    });
    setSearchQuery(''); // Clear the search input
    setSearchResults([]); // Clear the search results
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
  
  <form className="visit-form" onSubmit={handleCreateVisit}>
    <label>
      Patient ID
      <input type="text" name="patientId" value={visitForm.patientNo} onChange={HandleChange} />
    </label>
    <label>
      Patient Name
      <input type="text" name="patientName" value={visitForm.patientName} onChange={HandleChange} />
    </label>
    <label>
      DOB
      <input type="text" name="dob" value={visitForm.dob} onChange={HandleChange} />
    </label>
    <label>
      Date
      <input type="date" name="visitDate" value={visitForm.visitDate} onChange={HandleChange} />
    </label>
    <label>
      Insurance
      <input type="text" name="insurance" value={visitForm.insurance} onChange={HandleChange} />
    </label>
    <label>
      Cash
      <input type="checkbox" name="cash" checked={visitForm.cash} onChange={HandleChange} />
    </label>

    <label>
      Service
      <select name="service" value={visitForm.service} onChange={HandleChange}>
        <option value="">Select Service</option>
        <option value="consultation">Consultation</option>
        <option value="review">Review</option>
        <option value="emergency">Emergency</option>
      </select>
    </label>

    <label>
      Doctor
      <select name="doctor" value={visitForm.doctor} onChange={HandleChange}>
        <option value="">Select Doctor</option>
        <option value="drJon">Dr. Jon</option>
        <option value="drEmma">Dr. Emma</option>
      </select>
    </label>

    <label>
      Speciality
      <select name="speciality" value={visitForm.speciality} onChange={HandleChange}>
        <option value="">Select Speciality</option>
        <option value="generalDoctor">General Doctor</option>
        <option value="physician">Physician</option>
        <option value="gynecologist">Gynecologist</option>
      </select>
    </label>

    {/* <label>
      Visit Number
      <input type="text" name="visitNumber" value={visitForm.visitNumber} onChange={HandleChange} />
    </label> */}

    <button type="submit">CREATE VISIT</button>
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
        <div className="search-container">
    <label>
      Search Patient:
      <input
        type="text"
        placeholder="Enter patient name or ID"
        value={searchQuery}
        onChange={handleSearchChange}
      />
    </label>
    <ul className="search-results">
      {searchResults.map((patient) => (
        <li
          key={patient.patientNo}
          onClick={() => handlePatientSelect(patient)}
        >
          {patient.firstName} {patient.lastName} - {patient.patientNo}
        </li>
      ))}
    </ul>
  </div>

        
        <section>{renderContent()}</section>
      </main>
    </div>
  );
}

export default Home;