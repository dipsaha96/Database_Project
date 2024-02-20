import React, { useEffect, useState } from 'react';

function Rank () {
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8000/pointTable')
            .then(response => response.json())
            .then(data => setTeams(data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div>
            <center>
                <h1>STUDENT SURVEY</h1>
                
            </center>
        </div>
    );
}

export default Rank;
