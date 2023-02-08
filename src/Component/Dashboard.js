import { Button } from 'react-bootstrap';
import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from "react-router-dom"
import * as yup from "yup";
import useAuth from '../contexts/AuthContext'
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form";
import { number } from 'yup/lib/locale';
import { Formik, Form, Field, ErrorMessage } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '../index.css';
const Dashboard = () => {
    const [input, setInput] = useState({});
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [phoneno, setPhoneno] = useState("");
    const [gender, setGender] = useState("");
    const [city, setCity] = useState("");
    const [selectedHobbies, setSelectedHobbies] = useState({ hobbies: [] });
    const [date, setDate] = useState(new Date());
    //const [hobbies, setHobbies] = useState([]);
    const [hobbies, setHobbies] = useState({
        options: []
    });
    const [userName, setUserName] = useState(() => {
        const savedItem = localStorage.getItem("username");
        const parsedItem = JSON.parse(savedItem);
        return parsedItem || "";
    });

    const { auth, logout } = useAuth();
    const navigate = useNavigate();
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    const cities = [
        { label: "Select City", value: "", id: 1, checked: false },
        { label: "surat", value: "surat", id: 2, checked: false },
        { label: "delhi", value: "delhi", id: 3, checked: false },
        { label: "amd", value: "amd", id: 4, checked: false },
    ]
    const schema = yup.object({
        fullname: yup.string().required(),
        email: yup.string().email().required(),
        phoneno: yup.string().required("required").matches(phoneRegExp, 'Phone number is not valid').min(10, "too short").max(12, "too long"),
        hobbie: yup
            .array()
            .min(1)
            .of(yup.string().required())
            .nullable()
            .required("Select at least one hobby"),
        gender: yup.string().nullable().required(),
        city: yup.string().required(),
        //date: yup.date().required('Date is required')

    })

    const { register, handleSubmit, watch, trigger, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const onLogOut = () => {
        logout();
        navigate("/");
    }

    function selectChange(e) {
        setCity(e.target.value)
    }
    useEffect(() => {
        console.log(city)
        setCity(city)
    }, [city])


    const Hobbies = [
        { label: "movies", value: "movies", id: 1 },
        { label: "swimming", value: "swimming", id: 2 },
        { label: "scuba", value: "scuba", id: 3 },
    ];

    function selectCheckChangeHandle(event) {
        const { value, checked } = event.target;
        const { hobbies } = selectedHobbies;

        if (checked) {
            setSelectedHobbies({
                hobbies: [...hobbies, value],
            });
        } else {
            setSelectedHobbies({
                hobbies: hobbies.filter((hobby) => hobby !== value),
            });
        }
    }
    const handleDate = (date) => {
        setDate(date)
    }

    const submitDetails = () => {

        console.log(input)
        //console.log(e.target.value)
    }
    const [error, setError] = useState({});
    useEffect(() => {
        setInput({
            ...input,
            fullname: fullname,
            email: email,
            phoneno: phoneno,
            gender: gender,
            city: city,
            hobbies: selectedHobbies.hobbies,
            date: date
        });
        schema
            .validate(input, { abortEarly: false })
            .then(() => {
                setError({});
            })
            .catch((err) => {
                setError(err.inner.reduce((acc, curr) => {
                    acc[curr.path] = curr.message;
                    return acc;
                }, {}));
            });

    }, [fullname, email, phoneno, gender, city, selectedHobbies.hobbies, date])

    return (
        <div>
            <br />
            <div style={{ width: 300 }}>
                Dashboard {userName}
                <br />
                <Button
                    variant="primary"
                    type="button"
                    className="w-100 mt-3"
                    onClick={onLogOut}
                >
                    Log out
                </Button>
                <br />
                <br />
                <Formik
                    initialValues={{
                        city: '',
                        hobbies: ''
                    }}
                    validationSchema={schema}
                ><div>
                        <form onSubmit={handleSubmit(submitDetails)}>
                            <div>
                                <div>
                                    <label for="fname">First Name</label>
                                </div>
                                <div>
                                    <input name="thename" id="name" placeholder='Name' {...register("fullname")
                                    } onChange={(e) => { setFullname(e.target.value) }} value={fullname} />
                                    {error.fullname && <p>{error.fullname}</p>}
                                </div>
                            </div>
                            <div>
                                <div>
                                    <label htmlFor="email">email</label>
                                </div>

                                <div>
                                    <input name="email" id="email" placeholder='Email' className="text-indigo-400 "

                                        {...register("email")
                                        } onChange={(e) => { setEmail(e.target.value) }} value={email} />
                                    {error.email && <p>{error.email}</p>}
                                </div>
                            </div>
                            <div>
                                <div>
                                    <label htmlFor="phonno">phoneno</label>
                                </div>
                                <div>
                                    <input {...register("phoneno")}
                                        name="phoneno"
                                        placeholder='Phone No.'
                                        value={phoneno}
                                        onChange={(e) => { setPhoneno(e.target.value) }} />
                                    {error.phoneno && <p>{error.phoneno}</p>}
                                </div>
                            </div>
                            <div>
                                <div>
                                    <div>
                                        <label htmlFor="MALE">
                                            <input
                                                {...register('gender', { required: true })}
                                                type="radio"
                                                name="gender"
                                                value="MALE"
                                                onChange={(e) => { setGender(e.target.value) }}
                                                id="ted-lasso"
                                            />
                                            MALE
                                        </label>
                                    </div>


                                    <div>
                                        <label htmlFor="FEMALE">
                                            <input
                                                {...register('gender', { required: true })}
                                                type="radio"
                                                name="gender"
                                                value="FEMALE"
                                                onChange={(e) => { setGender(e.target.value) }}
                                                id="got"
                                            />
                                            FEMALE
                                        </label>
                                    </div>
                                </div>
                                {error.gender && <p>{error.gender}</p>}
                            </div>
                            <div>
                                <p>
                                    select your city
                                </p>
                                <select {...register("city")} name='city' onChange={selectChange}  >
                                    {
                                        cities.map((city) => {
                                            return (
                                                <option key={city.id} value={city.value}>
                                                    {city.label}
                                                </option>
                                            );
                                        })
                                    }
                                </select>
                                {error.city && <p>{error.city}</p>}
                            </div>
                            <div>
                                <p>Select your Hobbies</p>
                                {Hobbies.map((hobbie) => {
                                    return (
                                        <div key={hobbie.id}>
                                            <div>
                                                <input
                                                    {...register("hobbie")}
                                                    type="checkbox"
                                                    value={hobbie.label}
                                                    name="hobbie"
                                                    onChange={selectCheckChangeHandle}
                                                    checked={selectedHobbies.hobbies.includes(hobbie.label)}
                                                />
                                                <label>{hobbie.label}</label>
                                            </div>

                                        </div>

                                    );
                                }

                                )}

                            </div>
                            <div>
                                <DatePicker
                                    selected={date}
                                    onChange={handleDate}
                                />
                            </div>
                            <Button type="submit">submit</Button>
                        </form>
                    </div>
                </Formik>

            </div>

            <br />


            <br />
        </div>

    );

};

export default Dashboard;