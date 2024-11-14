
import { ChangeEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { BACKEND_URL } from '../config';
import { signupInput } from '@powerfulquarter/medium-blog';


const Auth = ({type}: {type: "signup" | "signin"}) => {
    const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState<signupInput>({
        email:"",
        password: ""
    });

    async function sendRequest() {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`, postInputs);
            const jwt = response.data;
            localStorage.setItem("token", jwt);
            navigate("/blogs")
        } catch (e) {
            
        }
         
    }
  return (
    <div className='h-screen flex justify-center flex-col'>
        <div className='flex justify-center'>
            <div>
                <div className='px-10'>
                    <div className='text-3xl font-bold text-center '>
                        {type === "signin" ? "Login to your account" : "Create an account"}
                    </div>
                    <div className='text-slate-600'>
                        {type === "signin" ? "Don't have an account ?" :"Already have an account ?"} 
                        <Link to={type === "signin" ? "/signup": "/signin"} className='pl-2 underline'>{type === "signin" ? "Sign up" : "Sign in"}</Link>
                    
                    </div>
                </div>
                <div className='pt-8'>
                    <LabeledInput label="Email" placeholder='johndoe@email.com' onChange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            email: e.target.value
                        })
                    }} />
                    <LabeledInput label="Password" type={"password"} placeholder='password..' onChange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            password: e.target.value
                        })
                    }} />
                    <button onClick={sendRequest} type="button" className="mt-4 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type === "signup" ? "Sign Up" : "Sign in"}</button>
                </div>
            </div>
            
        </div>
        
    </div>
  )
}

interface labeledInputType {
    label: string;
    type?: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void 
}
function LabeledInput({ label, type ,placeholder, onChange }: labeledInputType){
    return <div>
        
        <div>
            <label className="block mb-2 text-sm font-semibold text-black pt-4">{label}</label>
            <input onChange={onChange} type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder= {placeholder} required />
        </div>
    </div>
}
export default Auth