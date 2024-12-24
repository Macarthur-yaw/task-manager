//what if the access token has expired?

// call the 
export const useAuthenticated=()=>{


   const accessToken= localStorage.getItem("accessToken")
let tokens;
let authenticated=false;
   if(accessToken){
   tokens= JSON.parse(accessToken)
   authenticated=true;
   }


   return {authenticated,tokens};
}

