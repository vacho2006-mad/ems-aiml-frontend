import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {

    const [users, setUsers] = useState([]);

    // GET ID states
    const [showIdBox, setShowIdBox] = useState(false);
    const [employeeId, setEmployeeId] = useState("");
    const [employeeById, setEmployeeById] = useState(null);

    const navigate = useNavigate();


    // GET ALL EMPLOYEES
    async function getUsers() {

        try {

            console.log("Getting employees...");

            const response = await axios.get(
                "http://localhost:9090/employee/get"
            );

            console.log("Employee data:", response.data);

            setUsers(response.data);

        } catch (err) {

            console.log("GET ERROR:", err);
            console.log("GET RESPONSE:", err.response);
            console.log("GET DATA:", err.response?.data);

            if (err.response?.data) {

                alert(
                    "Something Went Wrong: " +
                    (
                        typeof err.response.data === "string"
                            ? err.response.data
                            : JSON.stringify(err.response.data)
                    )
                );

            } else {

                alert("Cannot connect to backend!");

            }
        }
    }


    // AUTOMATICALLY GET USERS WHEN DASHBOARD OPENS
    useEffect(() => {
        getUsers();
    }, []);


    // GET EMPLOYEE BY ID
    async function getEmployeeById() {

        if (employeeId === "") {

            alert("Please enter Employee ID");

            return;
        }

        try {

            console.log("Getting Employee ID:", employeeId);

            const response = await axios.get(
                `http://localhost:9090/employee/${employeeId}`
            );

            console.log("Employee details:", response.data);

            setEmployeeById(response.data);

        } catch (err) {

            console.log("GET ID ERROR:", err);
            console.log("GET ID RESPONSE:", err.response);

            setEmployeeById(null);

            if (err.response?.status === 404) {

                alert(
                    "Employee with ID " +
                    employeeId +
                    " not found!"
                );

            } else {

                alert("Something went wrong!");

            }
        }
    }


    // LOGOUT
    function logout() {
        navigate("/");
    }


    // DELETE EMPLOYEE
    async function Delete(id) {

        try {

            console.log("Deleting ID:", id);

            await axios.delete(
                `http://localhost:9090/employee/delete/${id}`
            );

            alert("Successfully deleted!");

            getUsers();

        } catch (err) {

            console.log("DELETE ERROR:", err);
            console.log("DELETE RESPONSE:", err.response);

            if (err.response?.data) {

                alert(
                    "Deletion Failed: " +
                    (
                        typeof err.response.data === "string"
                            ? err.response.data
                            : JSON.stringify(err.response.data)
                    )
                );

            } else {

                alert("Deletion Failed");

            }
        }
    }


    // UPDATE EMPLOYEE
    async function update(user) {

        const name = prompt(
            "Enter updated name",
            user.name
        );

        if (name === null) {
            return;
        }


        const email = prompt(
            "Enter your updated Email",
            user.email
        );

        if (email === null) {
            return;
        }


        const role = prompt(
            "Enter your role",
            user.role
        );

        if (role === null) {
            return;
        }


        const password = prompt(
            "Enter your updated password",
            user.password
        );

        if (password === null) {
            return;
        }


        const updatedUser = {
            name: name,
            role: role,
            email: email,
            password: password
        };


        try {

            console.log("Updating ID:", user.id);
            console.log("Updated data:", updatedUser);

            await axios.put(
                `http://localhost:9090/employee/update/${user.id}`,
                updatedUser
            );

            alert("Updation is Successful!");

            getUsers();

        } catch (err) {

            console.log("UPDATE ERROR:", err);
            console.log("UPDATE RESPONSE:", err.response);

            if (err.response?.data) {

                alert(
                    "Updation Failed: " +
                    (
                        typeof err.response.data === "string"
                            ? err.response.data
                            : JSON.stringify(err.response.data)
                    )
                );

            } else {

                alert("Updation Failed");

            }
        }
    }


    return (
        <>

            <h1>
                Welcome to Employee Management System
            </h1>


            {/* GET ALL BUTTON */}

            <button onClick={getUsers}>
                Get
            </button>


            {/* GET ID BUTTON */}

            <button
                onClick={() => {
                    setShowIdBox(!showIdBox);
                    setEmployeeById(null);
                }}
            >
                Get ID
            </button>


            {/* LOGOUT BUTTON */}

            <button onClick={logout}>
                Logout
            </button>


            <br />
            <br />


            {/* GET ID INPUT BOX */}

            {showIdBox && (

                <div>

                    <input
                        type="number"
                        placeholder="Enter Employee ID"
                        value={employeeId}
                        onChange={(e) =>
                            setEmployeeId(e.target.value)
                        }
                    />

                    <button onClick={getEmployeeById}>
                        Search
                    </button>

                </div>

            )}


            <br />


            {/* EMPLOYEE DETAILS */}

            {employeeById && (

                <div>

                    <h2>
                        Employee Details
                    </h2>

                    <p>
                        <b>ID:</b> {employeeById.id}
                    </p>

                    <p>
                        <b>Name:</b> {employeeById.name}
                    </p>

                    <p>
                        <b>Role:</b> {employeeById.role}
                    </p>

                    <p>
                        <b>Email:</b> {employeeById.email}
                    </p>

                </div>

            )}


            <br />


            {/* ALL EMPLOYEES TABLE */}

            <table border={1}>

                <thead>

                    <tr>

                        <th>ID</th>

                        <th>NAME</th>

                        <th>ROLE</th>

                        <th>EMAIL</th>

                        <th>PASSWORD</th>

                        <th>Action</th>

                    </tr>

                </thead>


                <tbody>

                    {
                        users.map((user) => (

                            <tr key={user.id}>

                                <td>
                                    {user.id}
                                </td>

                                <td>
                                    {user.name}
                                </td>

                                <td>
                                    {user.role}
                                </td>

                                <td>
                                    {user.email}
                                </td>

                                <td>
                                    {user.password}
                                </td>

                                <td>

                                    <button
                                        onClick={() => update(user)}
                                    >
                                        Edit
                                    </button>


                                    <button
                                        onClick={() => Delete(user.id)}
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>

                        ))
                    }

                </tbody>

            </table>

        </>
    );
}

export default Dashboard;