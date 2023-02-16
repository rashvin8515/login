import { useNavigate } from "react-router-dom";
import useAuth from '../contexts/AuthContext';
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import '../App.css'
import '../index.css'
import api from "../api/interceptor";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Login = () => {
    const navigate = useNavigate();
    //const [data, setData] = useState(null);
    //const [username, setusername] = useState("");
    //const [password, setpassword] = useState("");
    const { login } = useAuth();
    const validationSchema = yup.object({
        email: yup.string().email("invalid").required("email is not valid"),
        password: yup.string().min(4).max(32).required(),
    });
    //var res = {}
    //const [response, setResponse] = useState(null);

    function callApi(email, password) {
        const body = {
            email: email,
            password: password
        }
        api.post(`/login/dologin`, body)
            .then(res => {
                toast.success(res.data.message, {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                login().then(() => {
                    navigate("/dashboard");
                });
                return res.data
            })
            .then(data => {
                // console.log(data);
                localStorage.setItem('token', data['data'].token)
                //localStorage.setItem('message', data['message'])
                return data;
            })
            .catch(err => {
                // Handle error 
                console.log('Error message: ', err);
            });
    }
    return (
        <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
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
                <Formik
                    validationSchema={validationSchema}
                    initialValues={{
                        email: "",
                        password: "",
                    }}
                    onSubmit={(values) => {
                        console.log(values);
                        localStorage.setItem("email", values.email);
                        localStorage.setItem("password", values.password);
                        //localStorage.setItem("isLoggedIn", true)
                        callApi(values.email, values.password);

                    }}
                >
                    {({ values }) => (
                        <Form className="mt-8 space-y-6">
                            <img
                                className="mx-auto h-12 w-auto"
                                src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                                alt="Workflow"
                            />
                            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
                            <Field name="email" type="email" className="appearance-none rounded-none relative block
                  w-full px-3 py-2 border border-gray-300
                  placeholder-gray-500 text-gray-900 rounded-t-md
                  focus:outline-none focus:ring-indigo-500
                  focus:border-indigo-500 focus:z-10 sm:text-sm mt-5 ml-5"
                                placeholder="Enter yout name" />
                            <ErrorMessage name="email" className="block mt-1 text-xs text-red-600" />
                            <br /> <br />

                            <Field name="password" type="password" className="appearance-none rounded-none relative block
                  w-full px-3 py-2 border border-gray-300
                  placeholder-gray-500 text-gray-900 rounded-t-md
                  focus:outline-none focus:ring-indigo-500
                  focus:border-indigo-500 focus:z-10 sm:text-sm mt-5 ml-5" placeholder="Enter your password" />
                            <ErrorMessage name="password" className="block mt-1 text-xs text-red-600" />
                            <br /> <br />

                            <button type="submit"
                                className="group relative w-full flex justify-center
                py-2 px-4 border border-transparent text-sm font-medium
                rounded-md text-white bg-indigo-600 hover:bg-indigo-700
                focus:outline-none focus:ring-2 focus:ring-offset-2
                focus:ring-indigo-500 ml-5"
                                value="submit" onClick={callApi}>Submit</button>
                        </Form>
                    )}
                </Formik>
            </div>
            
        </div>
        

    )
};


export default Login;