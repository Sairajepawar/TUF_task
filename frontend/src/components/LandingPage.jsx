import './LandingItem.css'
import axios from 'axios'
import {useState} from "react";
import {useNavigate} from "react-router-dom";
function LandingPage(){
    const [username,setUsername] = useState("");
    const [language,setLanguage] = useState("");
    const [stdin,setStdin] = useState("");
    const [source,setSource] = useState("");
    const navigate = useNavigate();

    const handleUsername = (event) =>{
        setUsername(event.target.value)
    }
    const handleLanguage = (event) =>{
        setLanguage(event.target.value)
    }
    const handleStdin = (event) =>{
        setStdin(event.target.value)
    }
    const handleSource = (event) =>{
        setSource(event.target.value)
    }
    async function handleSubmit(){
    //     prepare the request
        const timestamp = new Date()
        const request = {
            username,
            language,
            stdin,
            source,
            timestamp
        }
    //     make post request using axios
        try{
            const response = await axios.post("https://tuf-task-gamma.vercel.app/submit",request);
            console.log(response.data);
        }
        catch(err){
            console.log(err);
        }
    //     navigate to submission page
        navigate('/submission')
    }
    return (
        <div className={"mainLandingPage"}>
            <div className="mb-3 LandingItem">
                <label htmlFor="formGroupExampleInput" className="form-label">Username</label>
                <input type="text" className="form-control"
                       placeholder="Enter the Username" onChange={handleUsername}/>
            </div>
            <div className="mb-3 LandingItem">
                <label htmlFor="formGroupExampleInput" className="form-label">Language</label>
                <select className="form-select" aria-label="Default select example" onChange={handleLanguage}>
                    <option selected>Select Language</option>
                    <option value="C++">C++</option>
                    <option value="Java">Java</option>
                    <option value="Javascript">Javascript</option>
                    <option value="Python">Python</option>
                </select>
            </div>
            <div className="mb-3 LandingItem">
                <label htmlFor="exampleFormControlTextarea1" className="form-label">Standard Input</label>
                <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"
                          placeholder={"Enter the standard input"} onChange={handleStdin}></textarea>
            </div>
            <div className="mb-3 LandingItem">
                <label htmlFor="exampleFormControlTextarea1" className="form-label">Source Code</label>
                <textarea className="form-control" id="exampleFormControlTextarea1" rows="11"
                          placeholder={"Enter the source code"} onChange={handleSource}></textarea>
            </div>
            <button className="btn btn-primary mb-3" onClick={handleSubmit}>Submit</button>
        </div>
    )
}

export default LandingPage;