import { useState } from 'react';
import api_url from '../BaseUrl';
import { projectsTask } from '../Components/Navbar';

interface SubmitTaskParams {
  apiUrl: string;
  formData: any;
  selectedDate: string | undefined;
}

export const useSubmitTask = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
const[response,setResponse]=useState<projectsTask>();

  const submitTask = async ({ apiUrl, formData, selectedDate }: SubmitTaskParams) => {
    const data = {
      date: selectedDate,
      ...formData,
    };

    setIsSubmitting(true);
    setError(null);
    let tokenResult;
    
const parseToken=localStorage.getItem("accessToken");
if(parseToken){
tokenResult=JSON.parse(parseToken)
}
    try {
      const responseData = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tokenResult}`,
        },
        body: JSON.stringify(data),
      });

     const  responseResults = await responseData.json();
setResponse(responseResults.new);
console.log(responseResults)
      if (!responseResults.success) {
        await handleTokenRefresh(data, apiUrl);
      } else {
        console.log('Task added successfully:', responseResults);
      }
    } catch (error) {
      setError('Error submitting task');
      console.error('Error submitting task:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTokenRefresh = async (data: any, apiUrl: string) => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
      const parsedRefreshToken = JSON.parse(refreshToken);
      const refreshData = { refreshToken: parsedRefreshToken };

      try {
        const refreshResponse = await fetch(`${api_url}/refresh`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(refreshData),
        });

        const refreshDataResponse = await refreshResponse.json();
        if (refreshDataResponse?.accessToken) {
          localStorage.setItem('accessToken', refreshDataResponse.accessToken);
         localStorage.setItem('refreshToken', refreshDataResponse.refreshToken);
          await retrySubmitTask(data, apiUrl, refreshDataResponse.accessToken);
        }
      } catch (error) {
        console.log('Error refreshing token:', error);
      }
    }
  };

  const retrySubmitTask = async (data: any, apiUrl: string, accessToken: string) => {
    try {
      const retryResponse = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(data),
      });

      const retryData = await retryResponse.json();
      setResponse(retryData)
      console.log('Retry task submission response:', retryData);
    } catch (error) {
      console.error('Error retrying task submission:', error);
    }
  };

  return { submitTask, isSubmitting, error,response };
};
