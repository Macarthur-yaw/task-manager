import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import api_url from '../BaseUrl';
type propsType={
  id:string,
  deleteProject:(id:string)=>void
}
export default function BasicMenu({id,deleteProject}:propsType) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  const DeleteProject=async()=>{
const getToken=localStorage.getItem('accessToken')
let results: string = "";
if(getToken){
  results=JSON.parse(getToken)
}

deleteProject(id)
    try {
      await fetch(`${api_url}/projectTask/${id}`,{
        headers:{
          'Authorization':`Bearer ${results}`
        },
        method:"DELETE"
      })
      console.log('deleted')
    } catch (error) {
      console.log(error)
    }
    
    
  }

  

 

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{color:"#000"}}
      >
        <MoreHorizIcon />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose} className='flex flex-row items-center gap-1'> 
        <EditIcon/>
        Rename Project</MenuItem>
        <MenuItem onClick={DeleteProject}>
        <DeleteIcon/>
        Delete Project</MenuItem>
        
      </Menu>
    </div>
  );
}
