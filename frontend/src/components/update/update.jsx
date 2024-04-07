import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UpdateModal({ selectedTask = {} }) {

  const [name, setName] = useState('');
  const [task, setTask] = useState('');
  const [status, setStatus] = useState('');
  const [id, setId] = useState('');

  useEffect(() => {
    // Check if selectedTask exists and has data before updating state
    if (selectedTask) {
      console.log("here is the task " + JSON.stringify(selectedTask));
      setName(selectedTask.name || ''); // Handle potential undefined values
      setTask(selectedTask.task || ''); // Handle potential undefined values
      setStatus(selectedTask.status || ''); // Handle potential undefined values
      setId(selectedTask._id || ''); // Handle potential undefined values
    }
  }, [selectedTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = {
        name: name,
        task: task,
        status: status,
        id: id
      };

      const response = await axios.put(`http://localhost:8000/api/update/${id}`, formData);

      if (response.status === 200) {
        alert('Form submitted successfully');
        window.location.reload();
        document.getElementById('closeUpdateModal').click();
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div>
      <div className="modal fade" id="updatemodal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="updatemodalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title fs-5" id="updatemodalLabel">Update Task</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" id="closeUpdateModal"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="exampleInputName" className="form-label">Name</label>
                  <input type="text" className="form-control" 
                    id="exampleInputName" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}  
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputTask" className="form-label">Write Task</label>
                  <input type="text" className="form-control" id="exampleInputTask" 
                    value={task}
                    onChange={(e) => setTask(e.target.value)} 
                  />
                </div>
                
                <div className="mb-3">
                  <label htmlFor="exampleInputTask" className="form-label">Select Status</label>
                  <select className="form-select" aria-label="Default select example"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)} 
                  >
                    <option defaultValue>select status</option>
                    <option value="0">Pending</option>
                    <option value="1">Completed</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-primary">Update</button>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" id="closeUpdateModal" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateModal;
