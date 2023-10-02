import "../styles/NewTaskModal.css";
import { useState } from 'react';

interface Props {
    saveTask: (name: string, dueDate: string) => void;
}   



const NewTaskModal = ({ saveTask } : Props) => {
  const [name, setName] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSave = () => {
    saveTask(name, dueDate)
  }

  return (
    <div className="modal-overlay ">
        <div className="modal">
            <div className="modal-content">
                <h2>New Task</h2>
                <label>Name:</label>
                <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                />

                <label>Date:</label>
                <input
                type="datetime-local"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                />

                <button>Cancel</button>
                <button onClick={handleSave}>Save</button>
            </div>
        </div>
    </div>
  );
};

export default NewTaskModal;
