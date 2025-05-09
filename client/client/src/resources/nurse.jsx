import React from 'react';

function Nurse({ nurseForm, HandleChange, handleNurseSubmit }) {
  return (
    <div className="nurse-container">
      <h2>Patient Vitals and Complaints</h2>
      <form className="visit-form" onSubmit={handleNurseSubmit}>
        <label>
          Patient ID:
          <input
            type="text"
            name="patientId"
            value={nurseForm.patientId}
            onChange={HandleChange}
            required
          />
        </label>
        <label>
          VisitNo:
          <input
            type="text"
            name="visitNumber"
            value={nurseForm.visitNumber}
            onChange={HandleChange}
            required
          />
        </label>
        <label>
          Service:
          <input
            type="text"
            name="service"
            value={nurseForm.service}
            onChange={HandleChange}
            required
          />
        </label>
        <label>
          Doctor:
          <input
            type="text"
            name="doctor"
            value={nurseForm.doctor}
            onChange={HandleChange}
            required
          />
        </label>
        <label>
          Temperature (°C):
          <input
            type="number"
            name="temperature"
            value={nurseForm.temperature}
            onChange={HandleChange}
            required
          />
        </label>
        <label>
          Blood Pressure (mmHg):
          <input
            type="text"
            name="bloodPressure"
            value={nurseForm.bloodPressure}
            onChange={HandleChange}
            required
          />
        </label>
        <label>
          Heart Rate (bpm):
          <input
            type="number"
            name="heartRate"
            value={nurseForm.heartRate}
            onChange={HandleChange}
            required
          />
        </label>
        <label>
          Complaints:
          <textarea
            name="complaints"
            value={nurseForm.complaints}
            onChange={HandleChange}
            required
          />
        </label>
        <button type="submit">Submit Vitals</button>
      </form>
    </div>
  );
}

export default Nurse;