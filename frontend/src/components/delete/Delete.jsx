import React, { useState } from "react";
import axios from "axios";

const DeleteModal = ({ selectedTask = {} }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleDelete = async () => {
    if (!isChecked) {
      alert("Please confirm deletion by checking the checkbox.");
      return;
    }
    try {
      await axios.delete(
        `http://localhost:8000/api/delete/${selectedTask._id}`
      );
      alert("Task deleted successfully");
      window.location.reload();
      document.getElementById("closedeleteModal").click();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div>
      <div
        className="modal fade"
        id="deletemodal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="deletemodalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title fs-5" id="deletemodalLabel">
                Delete Task
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                id="closedeleteModal"
              ></button>
            </div>
            <div className="modal-body">
              <p>
                "Are you sure you want to delete this task?"
                <br /> <br />
                Consider it not as erasing, but as embracing the triumph of
                completion.
                <br /> <br />
                Every task finished is a testament to your perseverance and
                capability.
                <br />
                Click delete with pride, knowing that with each completed task,
                <br />
                <br></br> you're one step closer to your goals.
              </p>
              <div className="form-check m-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={isChecked}
                  onChange={(e) => setIsChecked(e.target.checked)}
                  id="flexCheckDefault"
                />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  Confirm deletion
                </label>
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleDelete}
              >
                Delete
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                id="closedeleteModal"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
