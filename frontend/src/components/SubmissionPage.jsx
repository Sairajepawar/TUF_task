import React, {useEffect, useState} from 'react';
import axios from "axios";
function SubmissionPage() {
    const [submissions,createSubmissions] = useState([]);
    useEffect(() => {
    //     fetching the submissions
        axios.get("http://localhost:3000/collect")
            .then((response)=>{
                if (Array.isArray(response.data.entries)) {
                    createSubmissions(response.data.entries);
                } else {
                    console.log("Unexpected data structure from the API");
                }
            })
            .catch((err)=>{
                console.log(err)
            })
    }, []);
    return (
        <div>
            <h2>Submitted Entries</h2>
            <table className="table table-bordered">
                <thead>
                <tr>
                    <th>Username</th>
                    <th>Code Language</th>
                    <th>Standard Input</th>
                    <th>Source Code (First 100 Characters)</th>
                    <th>Timestamp</th>
                </tr>
                </thead>
                <tbody>
                {submissions.map((submission, index) => (
                    <tr key={index}>
                        <td>{submission.username}</td>
                        <td>{submission.language}</td>
                        <td>{submission.stdin}</td>
                        <td>{submission.source.substring(0, 100)}</td>
                        <td>{submission.timestamp}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default SubmissionPage;
