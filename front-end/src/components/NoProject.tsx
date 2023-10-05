import '../styles/NoProject.css'
import { AiOutlinePlus } from 'react-icons/ai';

interface Props {
    createProject: () => void;
}

const NoProject = ( { createProject }: Props) => {
    return (
        <div className='empty-project-container'>
            <img src="/task.png" alt="Log in" className="img"/>
            <p>Project list empty? Start your first project now and make things happen!</p>
            <button className='d-flex align-center' onClick={() => createProject()}>
                <AiOutlinePlus style={{ marginRight: 2 }}/>
                <span>New project</span>
            </button>
        </div>
    )
}

export default NoProject