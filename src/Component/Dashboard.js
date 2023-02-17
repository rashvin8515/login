import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom"
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import useAuth from '../contexts/AuthContext'
import "../App.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import api from '../api/interceptor';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
    addUserDataApi,
    getUserDataApi,
    updateUserDataApi,
    deleteUserDataApi,
  } from "../Redux/userDataSlice";

const Dashboard = () => {
    const dispatch = useDispatch();
    const userdata = useSelector((state) => state.userData);
    const formData = userdata.userData;
    useEffect(() => {
        getData()
    }, [])
    //const [formData, setFormData] = useState([]);
    const [editingId, setEditingId] = React.useState(0);
    var [initialValues1, setInitialValue1] = useState({
        age: "",
        email: "",
        country: "",
        gender: "",
        joiningdate: "",
        hobbie: [],
        maleName: "",
        maleBio: "",
        femaleName: "",
    })
    const [flag, setFlag] = useState(false);

    const { authed, logout } = useAuth();
    const navigate = useNavigate();

    const access_token = localStorage.getItem('token')
    const schema = yup.object({
        email: yup.string().email("invalid").required("email is not valid"),
        age: yup.number().required("required"),
        gender: yup.string().nullable().required("gender is required"),
        country: yup.string().required("required"),
        joiningdate: yup.string().required('Date is required'),
        hobbie: yup.array()
            .required('At least one checkbox must be selected')
            .min(1, 'At least one checkbox must be selected'),
        maleName: yup.string().when('gender', {
            is: 'Male',
            then: yup.string().nullable().required('male name is required.'),
            otherwise: yup.string().nullable().notRequired('male name is not required.'),
        }),
        maleBio: yup.string().when('gender', {
            is: 'Male',
            then: yup.string().nullable().required('male bio is required.'),
            otherwise: yup.string().nullable().notRequired('male name is not required.'),
        }),
        femaleName: yup.string().when('gender', {
            is: 'Female',
            then: yup.string().nullable().required('female name is required.'),
            otherwise: yup.string().nullable().notRequired('male name is not required.'),
        }),
    })
    const onLogOut = () => {
        logout().then(() => {
            toast.success("Logged out", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
            });
        navigate("/");
    }
    const getData = async () => {
        // await api.get("/module")
        //     .then((res) => {
        //         var data = res.data;
        //         return data.data
        //     })
        //     .then((data) => {
        //         //console.log(data)
        //         setFormData(data)
        //     }).catch((e) => {
        //         console.log("Error in getData fun")
        //     })
        dispatch(getUserDataApi())
    }


    const saveData = async (newValues) => {
        // await api.post("/module", newValues)
        //     .then(res => {
        //         toast.success(res.data.message, {
        //             position: "top-center",
        //             autoClose: 2000,
        //             hideProgressBar: false,
        //             closeOnClick: true,
        //             pauseOnHover: true,
        //             draggable: true,
        //             progress: undefined,
        //             theme: "light",
        //         });
        //         getData()
        //     })
        //     .catch(err => {
        //         console.log('Error message: ', err.message);
        //     });
        dispatch(addUserDataApi(newValues));
        setTimeout(() => {
            window.location.reload();
        });

    }
    const updateUserData = async (data) => {
        // console.log(data.id)
        // await api.put("/module/".concat(`${data.id}`), data)
        //     .then(res => {
        //         toast.success(res.data.message, {
        //             position: "top-center",
        //             autoClose: 2000,
        //             hideProgressBar: false,
        //             closeOnClick: true,
        //             pauseOnHover: true,
        //             draggable: true,
        //             progress: undefined,
        //             theme: "light",
        //         });
        //         getData()
        //     })
        //     .then(() => {
        //         setTimeout(() => { window.location.reload() }, 2000)
        //     })
        //     .catch(err => {
        //         console.log('Error message: ', err.message);
        //     });
        const updateData = {
            id: editingId,
            data: data,
          };
          dispatch(updateUserDataApi(updateData));
          setTimeout(() => {
            window.location.reload();
          });
    }
    const updateData = (user) => {
        console.log(user)
        setTimeout(() => {
            setInitialValue1(() => {
                //initialValues1.id = user.id
                initialValues1.age = user.age
                initialValues1.country = user.country
                initialValues1.email = user.email
                initialValues1.gender = user.gender
                initialValues1.hobbie = user.hobbie
                initialValues1.joiningdate = user.joiningdate
                initialValues1.maleName = user.maleName
                initialValues1.maleBio = user.maleBio
                initialValues1.femaleName = user.femaleName
            })
            setEditingId(user.id)
        }, 1000)

        //saveData(initialValues1)
    }
    const handleDelete = (id) => {
        // const data = [...formData];
        // data.splice(id, 1);
        // setFormData(data)
        deleteData(id);
    }
    //const [Users, fetchUsers] = useState([])
    const deleteData = (id) => {
        // api.delete('/module/'.concat(`/${id}`))
        //     .then((res) => {
        //         toast.error(res.data.message, {
        //             position: "top-center",
        //             autoClose: 2000,
        //             hideProgressBar: false,
        //             closeOnClick: true,
        //             pauseOnHover: true,
        //             draggable: true,
        //             progress: undefined,
        //             theme: "light",
        //         });
        //         getData()
        //     })
    
        dispatch(deleteUserDataApi(id));
    setTimeout(() => {
      window.location.reload();
    });
    }
    
    const newValues = {};

    
    return (
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl shadow-rose-600/40 ring-2 ring-indigo-600 lg:max-w-xl">
                <h1 className="text-3xl font-semibold text-center text-indigo-700 underline uppercase decoration-wavy">
                    Dashboard
                </h1>
                <ToastContainer
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
                <div>

                    <Formik
                        validationSchema={schema}
                        initialValues={initialValues1}
                        // enableReinitialize
                        onSubmit={(values, { resetForm }) => {

                            if (values.gender === "Male") {
                                values.femaleName = ""
                            } else if (values.gender === "Female") {
                                values.maleName = "";
                                values.maleBio = ""
                            }
                            Object.keys(values).forEach((key) => {
                                if (values[key] !== "") {
                                    newValues[key] = values[key];
                                }
                            })
                            // setFormData([...formData, newValues]);

                            console.log(newValues);
                            //saveData(newValues)

                            flag ?
                                updateUserData(newValues) : saveData(newValues);
                            //resetForm();
                        }}
                    >
                        {({ values, resetForm }) =>
                        (

                            <Form className="mt-6" >
                                {/* <div className="mb-2">
                                <label className="block text-sm font-semibold text-gray-800" htmlFor='name'>Name:</label>
                                <Field name="name" type="text" className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Enter Your good name" />
                                <ErrorMessage name="name" className='block mt-1 text-xs text-gray-600' render={msg => <div className="error">{msg}</div>} />
                            </div> */}
                                <div className="mb-2">
                                    <label className="block text-sm font-semibold text-gray-800" >Email:</label>
                                    <Field name="email" type="text" className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Enter your Email" />
                                    <ErrorMessage name="email" className='block mt-1 text-xs text-gray-600' render={msg => <div className="error">{msg}</div>} />
                                </div>
                                <div className="mb-2">
                                    <label className="block text-sm font-semibold text-gray-800">Age:</label>
                                    <Field name="age" className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40" type="number" placeholder="Enter your age" />
                                    <ErrorMessage name="age" className='block mt-1 text-xs text-gray-600' render={msg => <div className="error">{msg}</div>} />
                                </div>
                                <div className="mb-2">
                                    <label className="block text-sm font-semibold text-gray-800">Gender</label>
                                    <div className="justify-center">
                                        <div className='form-check'>
                                            <label className="form-check-label inline-block text-gray-800" >Male</label>
                                            <Field
                                                className="form-check-input appearance rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                                name="gender"
                                                value="Male"
                                                type="radio"
                                            />
                                        </div>
                                        <div className='form-check'>
                                            <label className="form-check-label inline-block text-gray-800">Female</label>
                                            <Field
                                                className="form-check-input appearance rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                                name="gender"
                                                value="Female"
                                                type="radio"
                                            />
                                        </div>
                                    </div>
                                    <ErrorMessage className='block mt-1 text-xs text-gray-600' name="gender" render={msg => <div className="error">{msg}</div>} />
                                </div>

                                <div className="mb-2">
                                    <Field
                                        type="text"
                                        name="maleName"
                                        placeholder="Enter a male username"
                                        className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                    />
                                    <ErrorMessage name="maleName" className='block mt-1 text-xs text-gray-600' render={msg => <div className="error">{msg}</div>} />
                                    <Field
                                        type="textarea"
                                        name="maleBio"
                                        placeholder="Enter a male bio"
                                        className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                    />
                                    <ErrorMessage name="maleBio" className='block mt-1 text-xs text-gray-600' render={msg => <div className="error">{msg}</div>} />
                                </div>


                                <div className="mb-2">
                                    <Field
                                        type="text"
                                        name="femaleName"
                                        placeholder="Enter a female username"
                                        className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                    />
                                    <ErrorMessage name="femaleName" className='block mt-1 text-xs text-gray-600' render={msg => <div className="error">{msg}</div>} />
                                    <br />
                                </div>

                                <div className="flex justify mb-2">
                                    <div className="datepicker relative form-floating mb-3 xl:w-96" data-mdb-toggle-button="false">
                                        <label className="block text-sm font-semibold text-gray-800">Select a Date:</label>
                                        <Field
                                            name="joiningdate"
                                            type="text"
                                            placeholder="Select a date"
                                            data-mdb-toggle="datepicker"
                                            class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none mt-1" />
                                        <ErrorMessage name="date" className='block mt-1 text-xs text-gray-600' render={msg => <div className="error">{msg}</div>} />
                                    </div>
                                </div>
                                <div className='flex justify mb-2'>
                                    <div className='mb-3 xl:w-96'>
                                        <label className="block text-sm font-semibold text-gray-800">Select a City:</label>
                                        <Field name="country" as="select" className="form-control appearance block w-full px-3 py-15 text-base font-normal text-gray-700 bg-white mt-1 bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="select your city">
                                            <option defaultValue={Option}>City</option>
                                            <option value="delhi">delhi</option>
                                            <option value="benglore">benglore</option>
                                            <option value="mumbai">mumbai</option>
                                        </Field>
                                        <ErrorMessage className='block mt-1 text-xs text-gray-600' name="country" render={msg => <div className="error">{msg}</div>} />
                                    </div>
                                </div>

                                <div className="flex justify mb-2">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-800">Select Your hobbies:</label>
                                        <div className="form-check">
                                            <Field
                                                className="form-check-input appearance h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                                name="hobbie"
                                                type="checkbox"
                                                value="movies"
                                            />
                                            <label className="form-check-label inline-block text-gray-800">movies</label>
                                        </div>
                                        <div className="form-check">
                                            <Field
                                                className="form-check-input appearance h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                                name="hobbie"
                                                type="checkbox"
                                                value="travelling"
                                            />
                                            <label className="form-check-label inline-block text-gray-800">travelling</label>
                                        </div>
                                        <div className="form-check">
                                            <Field
                                                className="form-check-input appearance h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                                name="hobbie"
                                                type="checkbox"
                                                value="surfing"
                                            />
                                            <label>surfing</label>
                                        </div>
                                        <ErrorMessage name="hobbie" className='block mt-1 text-xs text-gray-600' render={msg => <div className="error">{msg}</div>} />
                                    </div></div>
                                <div className="text-center lg:text-left">
                                    <button type="submit" className="inline-block px-4 py-2 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out mt-5">Submit</button>
                                </div>

                            </Form>
                        )
                        }
                    </Formik>
                </div>
            </div>
            <div className="flex items-center mb-2 justify-center text-center lg:text-left">
                <input
                    type="button"
                    className="inline-block px-4 py-2 bg-black-600 text-black font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-black-700 hover:shadow-lg focus:bg-black-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-black-800 active:shadow-lg transition duration-150 ease-in-out mt-5"
                    value="Log out"
                    onClick={onLogOut}
                />
            </div>
            <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="overflow-hidden"></div>
                        <table>
                            <thead>
                                <tr>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">Index</td>
                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">Email</th>
                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">age</th>
                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">gender</th>
                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">city</th>
                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">joining date</th>
                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">hobbies</th>
                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">maleName</th>
                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">maleBio</th>
                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">femaleName</th>
                                </tr>
                            </thead>
                            <tbody>
                                {formData && formData.map((data, index) => (
                                    <tr key={index} className="bg-white">
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{data.id}</td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{data.email}</td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{data.age}</td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{data.gender}</td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{data.country}</td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{data.joiningdate}</td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{data.hobbie}</td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{data.maleName}</td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{data.maleBio}</td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{data.femaleName}</td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            <button className="inline-block px-4 py-2 bg-black-600 text-black font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-black-700 hover:shadow-lg focus:bg-black-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-black-800 active:shadow-lg transition duration-150 ease-in-out" onClick={() => handleDelete(data.id)}>DELETE</button>
                                        </td>
                                        <td><button className="inline-block px-4 py-2 bg-black-600 text-black font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-black-700 hover:shadow-lg focus:bg-black-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-black-800 active:shadow-lg transition duration-150 ease-in-out" onClick={() => {
                                            console.log("update called")
                                            setFlag(true)
                                            updateData(data,index)
                                        }}>Update</button></td>
                
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div >

    );

};

export default Dashboard;

