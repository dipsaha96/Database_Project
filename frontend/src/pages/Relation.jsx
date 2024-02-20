import React from 'react';
import {useEffect, useState} from 'react';

function Relation() {
    const [relations, setRelations] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8000/relation')
            .then(response => response.json())
            .then(data => setRelations(data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div>
            <center>
                <h1>Relation List</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Relation ID</th>
                            <th>Student ID</th>
                            <th>Teacher ID</th>
                            <th>Course ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {relations.map((relation, index) => (
                            <tr key={index}>
                                <td>{relation.relation_id}</td>
                                <td>{relation.student_id}</td>
                                <td>{relation.teacher_id}</td>
                                <td>{relation.course_id}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </center>
        </div>
    );
}

export default Relation;