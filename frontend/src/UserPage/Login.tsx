// import { useNavigate } from 'react-router-dom'
import bgPic from '../assets/bg.png'
import { useNavigate } from 'react-router-dom'

import { useEffect, useState } from 'react'
import { useFetch } from '../hooks/useFetch'
import { useForm } from 'react-hook-form'
import { CircularProgress } from '@mui/material'
import { Google } from '@mui/icons-material'


export type Formdata={
    email:string,
    password:string

}

export default function Login(){

    const[information,setInformation]=useState<string>('')


    const {register,handleSubmit,formState:{errors}}=useForm<Formdata>()
 
    const navigate=useNavigate()
    
    const [loading, setLoading] = useState<boolean>(false);

  const openGoogle=async()=>{
try {
  

  window.location.href = `https://task-9u4e.onrender.com/api/auth/google`;

  
} catch (error) {
  console.log(error)
}
  }

  useEffect(()=>{
    getAPiDetails()
  },[])
  const getAPiDetails = () => {
    try {
      const queryParams = new URLSearchParams(window.location.search);
      console.log("Query Parameters:", queryParams.toString());
      const accessToken = queryParams.get("accessToken");
      const refreshToken = queryParams.get("refreshToken");
  
      if (accessToken && refreshToken) {
        localStorage.setItem("accessToken", JSON.stringify(accessToken));
        localStorage.setItem("refreshToken",JSON.stringify(refreshToken));
     navigate("/dashboard");

      } else {
        console.log("No accessToken or refreshToken found");
      }
    } catch (error) {
      console.error("Error parsing query parameters:", error);
    }
  };
  
    
const onsubmit = async (data:Formdata) => {
 
  setLoading(true);

  try {
    const result= await useFetch("http://localhost:8086/api/login",data)
    

    console.log(result)

    if (result.success) {
      setInformation(result);
      
      
      localStorage.setItem('accessToken', JSON.stringify(result.Accesstoken));
      localStorage.setItem("refreshToken",JSON.stringify(result.Refreshtoken))
    }

    navigate('/dashboard');
    console.log('success');
  } catch (err) {
    console.log(err);
    setInformation('Wrong credentials');

    const authenticationValue = false;
    localStorage.setItem('authentication', JSON.stringify(authenticationValue));
  } finally {
    setLoading(false);
  }
};


  
    return (
        <div className='flex md:flex-row-reverse flex-col  lg:gap-20 justify-around items-center  '>

<div className='lg:block hidden'>
    <img src={bgPic} alt="bg" className="object-cover "/>
</div>

<div className='w-[90%] lg:w-[40%] pt-[2%] md:h-screen h-[90vh]  lg:h-full flex flex-col justify-around items-center'>
<form onSubmit={handleSubmit(onsubmit)} className="flex flex-col justify-center    w-[100%]  lg:p-8  ">
<span>
    <h1 className="text-3xl font-semibold mb-10 ">Log in to get started</h1>
</span>
  <label className="text-sm text-gray-500 font-medium " htmlFor="username">
    Email Address
  </label>
  <span className='mb-4'>
  <input
    type="text"
    {...register("email",{required:{value:true,message:"Email address is required"},pattern:{value:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,message:"Email should be valid"}})}
   
  

  
    className="w-full p-2 mt-2 outline-none border-[1px] mb-1  rounded border-gray-300  "
  />

<p className='text-red-500'>
{errors.email?.message}
  </p>  
</span>


  <label className="text-gray-500 text-sm font-semibold" htmlFor="password">
    Password
  </label>
 <span>
  <input
    type="password"
    
    {...register("password",{required:{value:true,message:"Password is required"}})}
    
   
    
    className="w-full outline-none mt-2 border-[1px] rounded p-2 border-gray-300  "
  />
  
  <p className='text-red-500'>{errors.password?.message}</p>
  </span>
  <div className="flex flex-col space-y-4  mt-4">
  <button
  type="submit"
  className="bg-[#242526] text-white p-2 rounded hover:bg-black transition duration-300 relative"
  disabled={loading}
>
   {loading ? (<div className='flex items-center justify-center'>
    Signing in <CircularProgress color='inherit'/>
  </div>):'Login'}
</button>

    <span className='text-center text-red-500'>
{information}
</span>
    {/* <button
      type="button"
      className="border-gray-200 text-[#242526] rounded border-[1px] p-2  hover:bg-gray-100 transition duration-300"
    >
    
    </button> */}
    
    <span className='flex flex-col gap-2'>
<h2 className='text-sm'>By continuing with this login 
   {''} <span className='text-[#202020] underline'>Terms of Service</span> and <span className='text-[#202020] underline'>Privacy Policy.</span></h2>

<h2 className='text-center text-[#202020] '>Don't have an account? <a href='/signup' className='underline'>Sign up</a></h2>
    </span>

    

    
  </div>
</form>
<p className='text-center'>OR</p>
<div className='p-2 w-full lg:w-[90%]  lg:mt-10'>
<button onClick={()=>openGoogle()} className='border-[1px] w-full   lg:justify-center  p-1 flex items-center border-black justify-center gap-1 rounded-md'>Sign in with google

      <Google fontSize={"small"}/>
    </button>
    </div> </div>
        </div>
    )
}