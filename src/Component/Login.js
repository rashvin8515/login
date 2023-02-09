import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from '../contexts/AuthContext';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form";
import { Formik, Form, Field, ErrorMessage } from "formik";
const Login = () => {
    const navigate = useNavigate();
    //const [username, setusername] = useState("");
    //const [password, setpassword] = useState("");
    const { login } = useAuth();
    const validationSchema = yup.object({
        name: yup.string().required("NAME IS REQUIRED"),
        password: yup.string().min(4).max(32).required(),
    });
    // const {
    //     register,
    //     handleSubmit,
    //     formState: { errors },
    //     reset,
    // } = useForm({
    //     resolver: yupResolver(schema),
    // });
    // useEffect(() => {
    //     localStorage.setItem("Username", JSON.stringify(username));
    //     localStorage.setItem("isLoggedIn", true);
    // }, [username]);
    // const onSubmit = (e) => {
    //     localStorage.setItem("username", JSON.stringify(username));
    //   
    //     login().then(() => {
    //         navigate("/dashboard");
    //     });
    // };
    return (
        <div>
            <Formik
                validationSchema={validationSchema}
                initialValues={{
                    name: "",
                    password: "",
                }}
                onSubmit={(values) => {
                    console.log(values);
                    localStorage.setItem("username", values.name);
                    localStorage.setItem("password", values.password);
                    localStorage.setItem("isLoggedIn",true)
                    login().then(() => {
                        navigate("/dashboard");
                    });
                }}
            >
                {({ values }) => (
                    <Form>
                        <label>Name:</label>
                        <Field name="name" type="text" />
                        <ErrorMessage name="name" />
                        <br /> <br />

                        <label>Password:</label>
                        <Field name="password" type="password" />
                        <ErrorMessage name="password" />
                        <br /> <br />

                        <button type="submit" value="submit">Submit</button>
                    </Form>
                )}
            </Formik>
        </div>
    )
};


export default Login;