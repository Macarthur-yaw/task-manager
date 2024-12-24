import bgPic from '../assets/bgTwo.png';
import { useState } from 'react';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import { useForm } from 'react-hook-form';
import { Alert } from '@mui/material';
import { useNavigate } from 'react-router';

type FormData = {
  username: string;
  email: string;
  password: string;
  otp?: string;
};

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [information, setInformation] = useState<string>('');
  const [showOTP, setShowOTP] = useState<boolean>(false);  // Track OTP form display
  const [isVerified, setIsVerified] = useState<boolean>(false); // Track OTP verification status

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      if (showOTP) {
      
        const otpResult = await axios.post('http://localhost:8086/api/verify', {email:data.email,otp:data.otp} );
        const message = otpResult.data;
        setInformation(message.message);
        if (message.success) {
          setIsVerified(true);
          setShowOTP(false);
          setLoading(false);
          navigate('/dashboard'); 
        }
      } else {
        // Sign up
        const result = await axios.post('http://localhost:8086/api/signup', data);
        const message = result.data;
        setInformation(message.message);
        if (message.success) {
          setShowOTP(true); // Show OTP form after successful signup
        }
      }
    } catch (error) {
      console.log(error);
      setInformation("Can't connect to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex flex-col lg:flex-row-reverse gap-20 justify-center items-center'>
      <div className='hidden lg:block'>
        <img src={bgPic} alt='bg' className='object-cover' />
      </div>

      {showOTP ? (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center h-screen lg:w-[32%] w-[100%] p-8">
          <span>
            <h1 className="text-3xl font-semibold mb-10">OTP Verification</h1>
          </span>
          <label className="text-sm text-gray-500 font-medium" htmlFor="otp">
            Enter OTP
          </label>
          <span className="mb-2">
            <input
              type="text"
              id="otp"
              {...register('otp', { required: 'OTP is required' })}
              className="w-full p-2 mt-2 outline-none border-[1px] rounded border-gray-300 mb-1"
            />
            <p className="text-red-500">{errors.otp?.message}</p>
          </span>

          <div className="flex flex-col space-y-4 mt-4">
            <button
              type="submit"
              className="bg-[#242526] text-white p-2 rounded hover:bg-black transition duration-300"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <CircularProgress color="inherit" size={20} />
                </div>
              ) : (
                'Verify OTP'
              )}
            </button>

            <h1 className="text-center">
              {information && (
                <Alert
                  variant="outlined"
                  severity={information === "Can't connect to server" ? 'error' : 'success'}
                  onClose={() => setInformation('')}
                >
                  {information}
                </Alert>
              )}
            </h1>

            {isVerified && (
              <h2 className="text-center text-green-600">
                OTP Verified successfully! You are now logged in.
              </h2>
            )}
          </div>
        </form>
      ) : (
        <form id='signup-form' onSubmit={handleSubmit(onSubmit)} className='flex flex-col justify-center h-screen lg:w-[32%] w-[100%] p-8'>
          <span>
            <h1 className='text-3xl font-semibold mb-10'>Sign up</h1>
          </span>

          <label className='text-sm text-gray-500 font-medium' htmlFor='username'>
            Username
          </label>

          <span className='mb-2'>
            <input
              type='text'
              id='username'
              {...register('username', { required: 'Username is required' })}
              className='w-full p-2 mt-2 outline-none border-[1px] rounded border-gray-300 mb-1'
            />
            <p className='text-red-500'>{errors.username?.message}</p>
          </span>

          <label className='text-sm text-gray-500 font-medium' htmlFor='email'>
            Email Address
          </label>

          <span className='mb-2'>
            <input
              type='email'
              id='email'
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: 'Invalid email address',
                },
              })}
              className='w-full p-2 mt-2 outline-none border-[1px] rounded border-gray-300 mb-1'
            />
            <p className='text-red-500'>{errors.email?.message}</p>
          </span>

          <label className='text-gray-500 text-sm font-semibold' htmlFor='password'>
            Password
          </label>

          <span className='mb-2'>
            <input
              type='password'
              id='password'
              {...register('password', { required: 'Password is required' })}
              className='w-full outline-none mt-2 border-[1px] rounded p-2 border-gray-300 mb-1'
            />
            <p className='text-red-500'>{errors.password?.message}</p>
          </span>

          <div className='flex flex-col space-y-4 mt-4'>
            <button
              type='submit'
              className='bg-[#242526] text-white p-2 rounded hover:bg-black transition duration-300'
              disabled={loading}
            >
              {loading ? (
                <div className='flex items-center justify-center gap-2'>
                  <CircularProgress color='inherit' size={20} />
                </div>
              ) : (
                'Sign up'
              )}
            </button>

            <h1 className='text-center'>
              {information && (
                <Alert
                  variant='outlined'
                  severity={information === "Can't connect to server" ? 'error' : 'success'}
                  onClose={() => setInformation('')}
                >
                  {information}
                </Alert>
              )}
            </h1>

<span>
  <p className='text-right text-sm'>
   <a href='' className='underline underline-offset-2'>Reset your password</a>
  </p>
</span>

            <span className='flex flex-col gap-2'>
              <h2 className='text-sm'>
                By continuing, you agree to our{' '}
                <span className='text-[#202020] underline'>Terms of Service</span> and{' '}
                <span className='text-[#202020] underline'>Privacy Policy</span>.
              </h2>

              <h2 className='text-center text-[#202020]'>
                Don't have an account? <a href='/' className='underline'>Login</a>
              </h2>
            </span>
          </div>
        </form>
      )}
    </div>
  );
}
