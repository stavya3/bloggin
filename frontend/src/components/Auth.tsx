import { signupInput } from '@powerfulquarter/medium-blog';
import { ChangeEvent, useState } from 'react'
import { Link } from 'react-router-dom'

const Auth = ({type}: {type: "signup" | "signin"}) => {
    const [postInputs, setPostInputs] = useState<signupInput>({
        username:"",
        password: ""
    });
  return (
    <div className='h-screen flex justify-center flex-col'>
        <div className='flex justify-center'>
            <div>
                <div className='text-3xl font-bold text-center '>
                    Create an account
                </div>
                <div className='text-slate-600'>
                    Already have an account ? 
                    <Link to={"/signin"} className='pl-2 underline'>Login</Link>
                    
                </div>
                <LabeledInput label="Name" placeholder='Elon Musk..' onChange={(e) => {
                    setPostInputs(c => ({
                        ...c,
                        username: e.target.value
                    }))
                }} />
            </div>
            
        </div>
        
    </div>
  )
}

interface labeledInputType {
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void 
}
function LabeledInput({ label, placeholder, onChange }: labeledInputType){
    return <div>
        
        <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
            <input onChange={onChange} type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder= {placeholder} required />
        </div>
    </div>
}
export default Auth