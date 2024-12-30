import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

type propsTypes={
      handleClickOpen?:(events:string)=>void,
      handleClose:()=>void,
      open:boolean,
      sendData:(data:boolean)=>void,
      info:string
}
export default function AlertDialog({handleClose,open,sendData,info}:propsTypes) {
     
 const handleData=()=>{
      sendData(true)
     handleClose()
 }
 const handleUnsubscribe=()=>{
  sendData(false)
  handleClose()
 }
 
 

  return (
    <React.Fragment>
      
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {
          info !== 'subscribe' ? "Accept Subscription" :
          "Unsubscribe Subscription"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {
              info !== 'subscribe' ? "Subscribing to this subscribes to our daily reminders and news letter" : "Unsubscribing to this unsubscribes to our daily reminders and news letter"
            }
    
          </DialogContentText>
        </DialogContent>
        <DialogActions>

          {
            info !== 'subscribe' ? 
            
            <Button onClick={handleData} autoFocus>
            Subscribe
          </Button> : <Button onClick={handleUnsubscribe} autoFocus>
            Unsubscribe
          </Button>
          }
          {
            info !== 'subscribe' && <Button onClick={handleClose} autoFocus>
            Cancel
          </Button> 
          }
        
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
