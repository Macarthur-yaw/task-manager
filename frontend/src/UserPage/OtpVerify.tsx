import { useState } from 'react';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import { useForm } from 'react-hook-form';
import { Alert } from '@mui/material';

type OTPFormData = {
  otp: string;
};

export default function OTPVerification() {
  const [loading, setLoading] = useState<boolean>(false);
  const [information, setInformation] = useState<string>('');
  const [isVerified, setIsVerified] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OTPFormData>();

  const onSubmit = async (data: OTPFormData) => {
    setLoading(true);
    try {
      // Sending OTP verification request to the backend
      const result = await axios.post('http://localhost:8086/api/verify-otp', {
        otp: data.otp,
      });

      const message = result.data;
      setInformation(message.message);

      if (message.success) {
        setIsVerified(true);
      }
    } catch (error) {
      console.log(error);
      setInformation("Can't connect to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row-reverse gap-20 justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center h-screen lg:w-[32%] w-[100%] p-8"
      >
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
    </div>
  );
}
