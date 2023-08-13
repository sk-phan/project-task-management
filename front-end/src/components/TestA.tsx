import { useAppDispatch, useAppSelector } from "../store/hook";
import { increment } from "../store/counterReducer";

const TestA = () => {
    
    const count = useAppSelector(state => state.counter.value)
    const dispatch = useAppDispatch();

    return (
        <>
            <p>{count}</p>

            <button onClick={() => dispatch(increment())}>Click</button>
        </>
    )
}

export default TestA;