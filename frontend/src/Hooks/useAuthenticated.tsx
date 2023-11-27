const useAuthenticated = () => {
    // const[authenticates,setAuthenticates]=useState<boolean>(false)
    const isAuthenticated=()=>{
        const getAuthenticationValue = localStorage.getItem('authentication');  
    console.log(getAuthenticationValue)
return getAuthenticationValue    
}
    return {isAuthenticated}
}
 
export default useAuthenticated;