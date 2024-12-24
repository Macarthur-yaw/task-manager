import axios from "axios"
import { Formdata } from "../UserPage/Login";


export const useFetch=async(url:string,data:Formdata)=>{

    let dataResponse;

       
            try {
                
            const results=  await axios.post(url,data)
            const response=await results.data
            dataResponse=response;
            } catch (error) {
                console.log(error)
            }
        
    

    

    return dataResponse;

}