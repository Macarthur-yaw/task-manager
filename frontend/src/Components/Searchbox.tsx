import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import CloseIcon from '@mui/icons-material/Close';

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
          <ul>
            <li className="hover:bg-gray-100 p-2">Project 1</li>
            <li className="hover:bg-gray-100 p-2">Project 2</li>
            <li className="hover:bg-gray-100 p-2">Project 3</li>
          </ul>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
