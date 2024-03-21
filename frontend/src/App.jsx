import LandingPage from "./components/LandingPage.jsx";
import './App.css'
import {BrowserRouter as Router,Route,Routes,Link} from "react-router-dom";
import SubmissionPage from "./components/SubmissionPage.jsx";

function App(){
    return (
        <div>
            <Router>
                <Routes>
                    <Route path={"/"} exact element={<LandingPage/>}></Route>
                    <Route path={"/submission"} element={<SubmissionPage/>}></Route>
                </Routes>
            </Router>
        </div>
    )
}

export default App;