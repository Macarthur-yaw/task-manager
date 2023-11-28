import bgPic from '../assets/bgTwo.png'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
interface FormData{
    email:string,
    password:string

}

export default function Login(){
    const [formData,setFormData]=useState<FormData>({
        email:'',
        password:''
    })
    const [information,setInformation]=useState<string>('')
const handleSubmit=async (e:React.FormEvent)=>{
e.preventDefault()
try {
const result=   await axios.post('https://web-api-db7z.onrender.com/api/signup',formData)
const message=result.data
console.log(message)
setInformation(message.message)
if(message.success){
    console.log('going...')
}
} catch (error) {
    // console.log(error.message)
    console.log(error);
    // if (error.response && error.response.data) {
    //    const errorMessage: string = error.response.data.message;
    //    console.log(errorMessage);
    // }
}
}
    return (
        <div className='flex  flex-col  md:flex-row-reverse gap-20 justify-center items-center  '>
<div className='hidden md:block'>
    <img src={bgPic} alt="bg" className="object-cover "/>
</div>
<form onSubmit={handleSubmit} className="flex flex-col justify-center h-screen  md:w-[32%] w-[100%]  p-8  ">
<span>
    <h1 className="text-3xl font-semibold mb-10 ">Sign up</h1>
</span>
  <label className="text-sm text-gray-500 font-medium " htmlFor="username">
    Email Address
  </label>
  <input
    type="text"
    id="username"
    name="username"
    value={formData.email}
    onChange={(e)=>setFormData({...formData,email:e.target.value})}
    className="w-full p-2 mt-2 outline-none border-[1px]  rounded border-gray-300  mb-4"
  />

  <label className="text-gray-500 text-sm font-semibold" htmlFor="password">
    Password
  </label>
  <input
    type="password"
    id="password"
    name="password"
 value={formData.password}
 onChange={(e)=>setFormData({...formData,password:e.target.value})}   
    className="w-full outline-none mt-2 border-[1px] rounded p-2 border-gray-300  "
  />

  <div className="flex flex-col space-y-4  mt-4">
    <button
      type="submit"
      className="bg-[#242526] text-white p-2  rounded  hover:bg-black transition duration-300"
    >
      Sign up with Email
    </button>
    <h1 className='text-center'>
    {information}

    </h1>
    {/* <button
      type="button"
      className="border-gray-200 text-[#242526] rounded border-[1px] p-2  hover:bg-gray-100 transition duration-300"
    >
    
    </button> */}

    <span className='flex flex-col gap-2'>
<h2 className='text-sm'>By continuing with  you agree to our 
   {''} <span className='text-[#202020] underline'>Terms of Service</span> and <span className='text-[#202020] underline'>Privacy Policy.</span></h2>

<h2 className='text-center text-[#202020] '>Don't have an account? <Link to='/' className='underline'>Login</Link></h2>
    </span>
  </div>
</form>

        </div>
    )
}