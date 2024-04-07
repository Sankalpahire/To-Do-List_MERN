import  { useState } from "react";
import axios from "axios";

const Modal = () => {
  const [name, setName] = useState("");
  const [task, setTask] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const formData = {
        name: name,
        task: task,
        addedOn: Date.now(),
        isCompleted: status === "1" ? true : false,
      };

      const response = await axios.post(
        "http://localhost:8000/api/save",
        formData
      );

      if (response.status === 201) {
        alert("Form submitted successfully");
        document.getElementById("staticBackdrop").classList.remove("show"); // Close modal by removing "show" class
        document.body.classList.remove("modal-open"); // Remove modal-open class from body
        document.querySelector(".modal-backdrop").remove(); // Remove modal backdrop
        setName(""); 
        setTask("");
        setStatus("");
        window.location.reload();
      
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div>
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title fs-5" id="staticBackdropLabel">
                Add a Task
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => {
                  setName("");
                  setTask("");
                  setStatus("");
                }}
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="exampleInputName" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputName"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputTask" className="form-label">
                    Write Task
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputTask"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputTask" className="form-label">
                    Select Status
                  </label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option defaultValue>select status</option>
                    <option value="0">Pending</option>
                    <option value="1">Completed</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                id="closeModal"
                data-bs-dismiss="modal"
                onClick={() => {
                  setName("");
                  setTask("");
                  setStatus("");
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
