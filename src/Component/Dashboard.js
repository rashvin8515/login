import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from "react-router-dom"
import * as yup from "yup";
import useAuth from '../contexts/AuthContext'
import "../App.css";
import { Formik, Form, Field, ErrorMessage } from "formik";


const Dashboard = () => {
    const [formData, setFormData] = useState([]);
    const [initialValues, setInitialValues] = useState();
    const [updateIt, setUpdateit] = useState(false);
    //const [selectedOption, setSelectedOption] = useState("");
    const userName = localStorage.getItem("username");
    const { authed, logout } = useAuth();
    const navigate = useNavigate();
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    const schema = yup.object({
        name: yup.string().required("name is required"),
        email: yup.string().email().required("email is not valid"),
        phone: yup.string().required("required").matches(phoneRegExp, 'Phone number is not valid').min(10, "too short").max(12, "too long"),
        gender: yup.string().nullable().required("gender is required"),
        city: yup.string().required(),
        date: yup.date().required('Date is required'),
        about: yup.string().required("about is required"),
        checkboxes: yup.array()
            .required('At least one checkbox must be selected')
            .min(1, 'At least one checkbox must be selected'),
        maleName: yup.string().when('gender', {
            is: 'male',
            then: yup.string().required('male name is required.'),
            otherwise: yup.string().notRequired("not required")
        }),
        maleBio: yup.string().when('gender', {
            is: 'male',
            then: yup.string().required('male bio is required.'),
            otherwise: yup.string().notRequired("not required")
        }),
        femaleName: yup.string().when('gender', {
            is: 'female',
            then: yup.string().required('female name is required.'),
            otherwise: yup.string().notRequired("not required")
        }),
    })
    const onLogOut = () => {
        logout();
        navigate("/");
    }
    const handleDelete = (id) => {
        const data = [...formData];
        data.splice(id, 1);
        setFormData(data)
    }

    return (
        <div>
            <h1>Dashboard</h1>
            <h2>Welcome {userName}</h2>

            <Formik
                validationSchema={schema}
                initialValues={{
                    name: "",
                    phone: "",
                    email: "",
                    city: "",
                    gender: "",
                    date: "",
                    about: "",
                    checkboxes: [],
                    maleName: "",
                    maleBio: "",
                    femaleName: "",

                }}
                onSubmit={(values, { resetForm }) => {
                    const newValues = {};
                    if (values.gender === "male") {
                        values.femaleName = ""
                    } else if (values.gender === "female") {
                        values.maleName = "";
                        values.maleBio = ""
                    }
                    Object.keys(values).forEach((key) => {
                        if (values[key] !== "") {
                            newValues[key] = values[key];
                        }
                    })
                    setFormData([...formData, newValues]);
                    resetForm();
                    console.log(newValues);
                }}
            >
                {({ values, resetForm }) => (

                    <Form >
                        <label>Name:</label>
                        <Field name="name" type="text" />
                        <ErrorMessage name="name" render={msg => <div className="error">{msg}</div>} />
                        <br /> <br />
                        <label>Email:</label>
                        <Field name="email" type="text" />
                        <ErrorMessage name="email" render={msg => <div className="error">{msg}</div>} />
                        <br /> <br />
                        <label>Phone:</label>
                        <Field name="phone" type="number" />
                        <ErrorMessage name="phone" render={msg => <div className="error">{msg}</div>} />
                        <br /> <br />
                        <label>Gender:</label>
                        <br /> <br />
                        <label>Male:</label>
                        <Field
                            name="gender"
                            value="male"
                            type="radio"
                        />
                        <label>Female:</label>
                        <Field
                            name="gender"
                            value="female"
                            type="radio"
                        />
                        <ErrorMessage name="gender" render={msg => <div className="error">{msg}</div>} />
                        <br />
                        {values.gender === 'male' && (
                            <>
                                <Field
                                    type="text"
                                    name="maleName"
                                    placeholder="Enter a male username"
                                />
                                <ErrorMessage name="maleName" render={msg => <div className="error">{msg}</div>} />
                                <br />
                                <Field
                                    type="text"
                                    name="maleBio"
                                    placeholder="Enter a male bio"
                                />
                                <ErrorMessage name="maleBio" render={msg => <div className="error">{msg}</div>} />
                                <br />
                            </>
                        )}
                        {values.gender === 'female' && (
                            <>
                                <Field
                                    type="text"
                                    name="femaleName"
                                    placeholder="Enter a female username"
                                />
                                <ErrorMessage name="femaleName" render={msg => <div className="error">{msg}</div>} />
                                <br />
                            </>
                        )}
                        <br /> <br />
                        <label>Date:</label>
                        <Field name="date" type="date" />
                        <ErrorMessage name="date" render={msg => <div className="error">{msg}</div>} />
                        <br /> <br />
                        <label>City:</label>
                        <Field name="city" as="select">
                            <option value="select a city"></option>
                            <option value="delhi">delhi</option>
                            <option value="benglore">benglore</option>
                            <option value="mumbai">mumbai</option>
                        </Field>
                        <ErrorMessage name="city" render={msg => <div className="error">{msg}</div>} />
                        <br /> <br />
                        <label>About:</label>
                        <Field name="about" as="textarea" />
                        <ErrorMessage name="about" render={msg => <div className="error">{msg}</div>} />
                        <br /> <br />
                        <label>movies</label>
                        <Field
                            name="checkboxes"
                            type="checkbox"
                            value="movies"
                        />
                        <label>travelling</label>
                        <Field
                            name="checkboxes"
                            type="checkbox"
                            value="travelling"
                        />
                        <label>surfing</label>
                        <Field
                            name="checkboxes"
                            type="checkbox"
                            value="surfing"
                        />
                        <ErrorMessage name="checkboxes" render={msg => <div className="error">{msg}</div>} />
                        <br /><br />
                        <button type="submit">Submit</button>
                    </Form>
                )}
            </Formik>
            <input
                type="button"
                value="Log out"
                className="w-100 mt-3"
                onClick={onLogOut}
            />
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>phone</th>
                        <th>Email</th>
                        <th>city</th>
                        <th>gender</th>
                        <th>date</th>
                        <th>about</th>
                        <th>checkboxes</th>
                        <th>maleName</th>
                        <th>maleBio</th>
                        <th>femaleName</th>

                    </tr>
                </thead>
                <tbody>
                    {formData.map((data, index) => (
                        <tr key={index}>
                            <td>{data.name}</td>
                            <td>{data.phone}</td>
                            <td>{data.email}</td>
                            <td>{data.city}</td>
                            <td>{data.gender}</td>
                            <td>{data.date}</td>
                            <td>{data.about}</td>
                            <td>{data.checkboxes}</td>
                            <td>{data.maleName}</td>
                            <td>{data.maleBio}</td>
                            <td>{data.femaleBio}</td>
                            <td><button onClick={handleDelete}>DELETE</button></td>
                            <td><button>DELETE</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    );

};

export default Dashboard;

