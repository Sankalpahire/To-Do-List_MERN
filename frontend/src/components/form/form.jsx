import  { useEffect, useState } from 'react';
import axios from 'axios';
//  import { Link } from 'react-router-dom';
import Modal from '../modal/modal';
import UpdateModal from '../update/update';
import DeleteModal from '../delete/Delete';

const Form = () => {

  const [selectedTask, setSelectedTask] = useState(null);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {

    axios.get('http://localhost:8000/api/get')
      .then(res => setTasks(res.data))
      .catch(err => console.log(err));

      
  }, []);
  
  
  return (
    <div>
      <div className='d-flex vh-100 justify-content-center align-items-center'>
        <div className='w-50 bg-light rounded task-list-container sticky'>
          <button type="button" className="btn btn-primary sticky-button" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Add Task</button>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Task</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody className="">
                {tasks.map((task, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{task.name}</td>
                    <td>{task.task}</td>
                    <td>{task.status}</td>
                    <td>
                      <button type="button" className="btn btn-warning" data-bs-toggle="modal" onClick={() => setSelectedTask(task)} data-bs-target="#updatemodal">Update Task</button>
                      <button type="button" className="btn btn-danger  ms-2" data-bs-toggle="modal" data-bs-target="#deletemodal" onClick={() => setSelectedTask(task)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Modal/>
      <UpdateModal selectedTask={selectedTask} />
      <DeleteModal selectedTask={selectedTask} />
    </div>
  );
  
  }  
export default Form;