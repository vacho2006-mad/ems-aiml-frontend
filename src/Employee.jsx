import axios from "axios";
import { useEffect, useState } from "react";

function Employee() {

    const [employees, setEmployees] = useState([]);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        id: "",
        name: "",
        role: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });

        setErrors({
            ...errors,
            [name]: ""
        });
    };

    const getEmployees = () => {
        axios.get("http://localhost:9090/employee/get")
            .then((response) => {
                setEmployees(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        getEmployees();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = {};

        if (formData.name.trim() === "") {
            newErrors.name = "Name is required";
        }

        if (formData.role.trim() === "") {
            newErrors.role = "Role is required";
        }

        if (formData.email.trim() === "") {
            newErrors.email = "Email is required";
        }

        if (formData.password.trim() === "") {
            newErrors.password = "Password is required";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        if (formData.id === "") {

            axios.post("http://localhost:9090/employee/add", formData)
                .then(() => {
                    alert("Employee Registered Successfully!");
                    getEmployees();

                    setFormData({
                        id: "",
                        name: "",
                        role: "",
                        email: "",
                        password: ""
                    });

                    setErrors({});
                })
                .catch((error) => {
                    console.log(error);
                });

        } else {

            axios.put(`http://localhost:9090/employee/update/${formData.id}`, formData)
                .then(() => {
                    alert("Employee Updated Successfully!");
                    getEmployees();

                    setFormData({
                        id: "",
                        name: "",
                        role: "",
                        email: "",
                        password: ""
                    });

                    setErrors({});
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    const editHandle = (employee) => {
        setFormData({
            id: employee.id,
            name: employee.name,
            role: employee.role,
            email: employee.email,
            password: employee.password
        });
    };

    const deleteHandle = (id) => {
        axios.delete(`http://localhost:9090/employee/delete/${id}`)
            .then(() => {
                alert("Employee Deleted Successfully!");
                getEmployees();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div>

            <h2>Employee Registration Form</h2>

            <form onSubmit={handleSubmit}>

                Name:
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    placeholder="Enter your name"
                    onChange={handleChange}
                />
                <p>{errors.name}</p>

                <br />

                Role:
                <input
                    type="text"
                    name="role"
                    value={formData.role}
                    placeholder="Enter your role"
                    onChange={handleChange}
                />
                <p>{errors.role}</p>

                <br />

                Email:
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    placeholder="Enter your email"
                    onChange={handleChange}
                />
                <p>{errors.email}</p>

                <br />

                Password:
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    placeholder="Enter your password"
                    onChange={handleChange}
                />
                <p>{errors.password}</p>

                <br />

                <button type="submit">
                    {formData.id === "" ? "Register" : "Update"}
                </button>

            </form>

            <br />

            <h2>Employee List</h2>

            <table border="1">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Role</th>
                        <th>Email</th>
                        <th>Password</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {employees.map((employee) => (
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.name}</td>
                            <td>{employee.role}</td>
                            <td>{employee.email}</td>
                            <td>{employee.password}</td>
                            <td>
                                <button
                                    type="button"
                                    onClick={() => editHandle(employee)}
                                >
                                    Edit
                                </button>

                                <button
                                    type="button"
                                    onClick={() => deleteHandle(employee.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>

            </table>

        </div>
    );
}

export default Employee;