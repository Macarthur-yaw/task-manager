import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import CloseIcon from '@mui/icons-material/Close';
import api_url from '../BaseUrl';
import { projectsTask } from './Navbar';
import { Link } from 'react-router-dom';

import { CircularProgress } from '@mui/material';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type PropTypes = {
  show: boolean;
  handleClickClose: () => void;
};

export default function AlertDialogSlide({ show, handleClickClose }: PropTypes) {
  const [value, setValue] = React.useState<string>("");
  const [projects, setProjects] = React.useState<projectsTask[]>([]);
  const[loading,setLoading]=React.useState<boolean>(true)
  const handleSearch = async() => {
    try {
      setLoading(false)
     const getToken=localStorage.getItem('accessToken')
    let results: string = "";
     if(getToken){
       results=JSON.parse(getToken)
     } 
     console.log(results)
    const data= await fetch(`${api_url}/projects/search?search=${value}`,{method:"GET",
    headers:{
      "Content-Type":"application/json",
      "Authorization":`Bearer ${results}`
    },

    })
    const response=await data.json()
    console.log(response)
    setProjects(response.data)
setLoading(false)
    
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
   
  }
React.useEffect(()=>{
  handleSearch();

},[value])
  
  return (
    <React.Fragment>
      <Dialog
        open={show}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClickClose}
        aria-describedby="alert-dialog-slide-description"
        fullWidth 
        maxWidth="md" 
      >
        <DialogTitle className="inline-flex items-center">
         
          <input
            type="text"
            value={value}
            onChange={(e)=>setValue(e.target.value)}
            className="outline-none flex-grow text-lg"
            placeholder="Search projects..."
          />
          <DialogActions>
            <CloseIcon
              onClick={handleClickClose}
              className="cursor-pointer"
            />
          </DialogActions>
        </DialogTitle>
        <DialogContent>

          {
            loading && <CircularProgress/>
          }
          <ul>
         
         {
            projects.slice(0,5).map((project,index)=>(
              <Link to={`/dashboard/projects/${project._id}`} key={index} className='hover:bg-gray-100 flex flex-col w-full p-2'>
                {project.Title}
              </Link>
            ))
         }
          </ul>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
