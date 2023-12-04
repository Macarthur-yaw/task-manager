// import { useNavigate } from 'react-router-dom'
import bgPic from '../assets/bg.png'
import { Link,useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'
interface FormData{
    email:string,
    password:string

}

export default function Login(){
    const[email,setEmail]=useState<string>('')
    const [password,setPassword]=useState<string>('')
    const[information,setInformation]=useState<string>('')

  // const[tokendata,setTokendata]=useState<string>('')  
//    const[loading,setLoading]=useState<boolean>(false)
    const navigate=useNavigate()
    const  formData:FormData={
        email,
        password
    
    }
    const [loading, setLoading] = useState<boolean>(false);

  

    
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  try {
    const result = await axios.post('http://localhost:5000/api/login', formData);
    const data = result.data;

    setInformation(data.message);

    if (data.success) {
      const authenticationValue = true;
      localStorage.setItem('authentication', JSON.stringify(authenticationValue));

      
      localStorage.setItem('accessToken', data.id);
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
        <div className='flex md:flex-row-reverse flex-col gap-20 justify-center items-center  '>
  {loading && <div className="animate-progress-line absolute top-0 " />}

<div className='md:block hidden'>
    <img src={bgPic} alt="bg" className="object-cover "/>
</div>
<form onSubmit={handleSubmit} className="flex flex-col justify-center h-screen  md:w-[32%] w-[100%]  p-8  ">
<span>
    <h1 className="text-3xl font-semibold mb-10 ">Login</h1>
</span>
  <label className="text-sm text-gray-500 font-medium " htmlFor="username">
    Email Address
  </label>
  <input
    type="text"
    id="username"
    name="username"
value={email}
onChange={(e)=>setEmail(e.target.value)}    
    className="w-full p-2 mt-2 outline-none border-[1px]  rounded border-gray-300  mb-4"
  />

  <label className="text-gray-500 text-sm font-semibold" htmlFor="password">
    Password
  </label>
  <input
    type="password"
    id="password"
    name="password"
    value={password}
    onChange={(e)=>setPassword(e.target.value)}
    
    className="w-full outline-none mt-2 border-[1px] rounded p-2 border-gray-300  "
  />

  <div className="flex flex-col space-y-4  mt-4">
  <button
  type="submit"
  className="bg-[#242526] text-white p-2 rounded hover:bg-black transition duration-300 relative"
  disabled={loading}
>
  CONTINUE
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

<h2 className='text-center text-[#202020] '>Don't have an account? <Link to='/signup' className='underline'>Sign up</Link></h2>
    </span>
  </div>
</form>

        </div>
    )
}