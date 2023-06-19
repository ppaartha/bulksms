import axios from "axios";
import React, { useState } from "react";
// import {
//   createBrowserRouter,
//   createRoutesFromElements,
//   Route,
//   RouterProvider,
// } from "react-router-dom";


export default function Form() {
  const [formData, setFormData] = useState({
    masking: "",
    sms: "",
    number: "",
    schedule_time:""
  });
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        alert("Sending Message")
        await axios.post("http://localhost:5000",{
            formData
        })

    } catch (error) {
      // Handle network or other errors
      console.error("Error:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    //console.log({...formData})
  };

  return (
    <div className="content-wrapper">
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="card card-primary">
                <div className="card-header">
                  <h3 className="card-title">Request to send SMS</h3>
                </div>
                <form action="POST">
                  <div className="card-body">
                    <div className="form-group">
                      <label>Masking</label>
                      <input
                        type="text"
                        name="masking"
                        className="form-control"
                        id="masking"
                        placeholder="Enter Masking"
                        value={formData.masking}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>SMS Content</label>
                      <input
                        type="text"
                        name="sms"
                        className="form-control"
                        id="sms"
                        placeholder="Enter SMS Content"
                        value={formData.sms}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>Mobile Numbers</label>
                      <input
                        type="text"
                        name="number"
                        className="form-control"
                        id="number"
                        placeholder="+8801910000000"
                        value={formData.number}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>Scheduled Time</label>
                      <input
                        type="datetime-local"
                        name="schedule_time"
                        className="form-control"
                        id="schedule_time"
                        value={formData.schedule_time}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="card-footer">
                    <button
                      type="submit"
                      onClick={handleSubmit}
                      className="btn btn-primary"
                    >
                      Send SMS
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-md-6"></div>
          </div>
        </div>
      </section>
    </div>
  );
}
