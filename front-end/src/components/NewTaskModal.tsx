import "../styles/NewTaskModal.css";
import { useState } from 'react';

interface Props {
  closeModal:(name: string) => void
}

const NewTaskModal = ({ closeModal }: Props) => {
  const [name, setName] = useState('');


  return (
    <div className="modal-overlay ">
        <div className="modal">
            <form className="modal-content">
                <label>🎯 New project</label>
                <input
                className="name-input"
                type="text"
                value={name}
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
                />
                <div className="button-container">
                  <button className="btn cancel-btn" onClick={() => closeModal('')}>Cancel</button>
                  <button className="btn save-btn" onClick={() => closeModal(name)} disabled={name === ''}>Save</button>
                </div>
            </form>
        </div>
    </div>
  );
};

export default NewTaskModal;
