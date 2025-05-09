import React, { useState, useEffect } from 'react';

function Doctor() {
  const [visits, setVisits] = useState([]); // State to hold visit data
  const [selectedVisit, setSelectedVisit] = useState(null); // State for the selected visit
  const [doctorForm, setDoctorForm] = useState({
    provisionalDiagnosis: '',
    labRecommendation: '',
    prescription: '',
    dosage: '',
    duration: '',
    additionalNotes: '',
  });

  // Fetch visits when the component loads
  useEffect(() => {
    const fetchVisits = async () => {
      try {
        const response = await fetch('http://localhost:3000/auth/getVisits'); // Replace with your backend endpoint
        const data = await response.json();
        if (response.ok) {
          setVisits(data);
        } else {
          alert('Failed to fetch visits: ' + data.error);
        }
      } catch (error) {
        console.error('Error fetching visits:', error);
      }
    };

    fetchVisits();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctorForm({ ...doctorForm, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/auth/submitDoctorNotes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...doctorForm, visitId: selectedVisit.visitNumber }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Doctor notes submitted successfully!');
        setDoctorForm({
          provisionalDiagnosis: '',
          labRecommendation: '',
          prescription: '',
          dosage: '',
          duration: '',
          additionalNotes: '',
        });
        setSelectedVisit(null); // Clear the selected visit
      } else {
        alert('Failed to submit notes: ' + data.error);
      }
    } catch (error) {
      console.error('Error submitting notes:', error);
      alert('An error occurred while submitting the notes.');
    }
  };

  return (
    <div className="doctor-container">
      <h2>Doctor Dashboard</h2>

      {/* Visit Table */}
      <div className="visit-table">
        <h3>Visits</h3>
        <table>
          <thead>
            <tr>
              <th>Visit No</th>
              <th>Patient Name</th>
              <th>Visit Date</th>
              <th>Service</th>
              <th>Doctor</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {visits.map((visit) => (
              <tr key={visit.visitNumber}>
                <td>{visit.visitNumber}</td>
                <td>{visit.patientName}</td>
                <td>{visit.visitDate}</td>
                <td>{visit.service}</td>
                <td>{visit.doctor}</td>
                <td>
                  <button onClick={() => setSelectedVisit(visit)}>View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Selected Visit Details */}
      {selectedVisit && (
        <div className="visit-details">
          <h3>Visit Details</h3>
          <p><strong>Patient Name:</strong> {selectedVisit.patientName}</p>
          <p><strong>Visit Date:</strong> {selectedVisit.visitDate}</p>
          <p><strong>Service:</strong> {selectedVisit.service}</p>
          <p><strong>Doctor:</strong> {selectedVisit.doctor}</p>

          {/* Doctor Form */}
          <form onSubmit={handleSubmit}>
            <label>
              Provisional Diagnosis:
              <textarea
                name="provisionalDiagnosis"
                value={doctorForm.provisionalDiagnosis}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Lab Recommendation:
              <textarea
                name="labRecommendation"
                value={doctorForm.labRecommendation}
                onChange={handleChange}
              />
            </label>
            <label>
              Prescription:
              <textarea
                name="prescription"
                value={doctorForm.prescription}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Dosage:
              <input
                type="text"
                name="dosage"
                value={doctorForm.dosage}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Duration:
              <input
                type="text"
                name="duration"
                value={doctorForm.duration}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Additional Notes:
              <textarea
                name="additionalNotes"
                value={doctorForm.additionalNotes}
                onChange={handleChange}
              />
            </label>
            <button type="submit">Submit Notes</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Doctor;