import Header from "./Header";
import Main from "./Main";
import {useEffect, useReducer} from "react";

const initialState = {
    questions: [],
    status: "loading"
};

function reducer(state, action) {
    switch (action.type) {
        case "dataReceived":
            return {...initialState, questions: action.payload, status: "ready"};
        case "dataFailed":
            return {...initialState, status: "error"};
        default: return state;
    }
}

export default function App() {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        fetch("http://localhost:8000/questions")
            .then(res => res.json())
            .then(data => dispatch({type: "dataReceived", payload: data }))
            .catch(err => dispatch({type: "dataFailed"}))
    }, []);

    return (
        <div className="app">
            <Header />

            <Main>
                <p>1/15</p>
                <p>Question?</p>
            </Main>
        </div>
    );
}
