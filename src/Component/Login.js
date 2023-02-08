import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from '../contexts/AuthContext';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form";
const Login = () => {
    const navigate = useNavigate();
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const { login } = useAuth();
    const schema = yup.object().shape({
        username: yup.string().required(),
        password: yup.string().min(4).max(32).required(),
    });
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(schema),
    });
    useEffect(() => {
        localStorage.setItem("Username", JSON.stringify(username));
        localStorage.setItem("isLoggedIn", true);
    }, [username]);
    const onSubmit = (e) => {
        if (username === " " && password === " ") {
            alert("Invalid Entry");
            return;
        }
        else {
            localStorage.setItem("username", JSON.stringify(username));
            localStorage.setItem("password", JSON.stringify(password));
            login().then(() => {
                navigate("/dashboard");
            });
        }
    };
    return (
        <div>
            <p>Sign In</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    {...register("username")}
                    placeholder="john doe"
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setusername(e.target.value)}
                />
                <p>{errors.username?.message}</p>
                <br />
                <br />
                <input
                    {...register("password")}
                    placeholder="password"
                    type="password"
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                    required
                />
                <p>{errors.password?.message}</p>
                <br />
                <br />
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
};


export default Login;