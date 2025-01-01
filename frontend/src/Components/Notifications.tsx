import * as React from 'react';
import Menu from '@mui/material/Menu';
import { NotificationsOutlined } from '@mui/icons-material';

export default function NotificationsMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  
  const open = Boolean(anchorEl);

  
  const handleMenuItemClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null); 
  };

  return (
    <div>
      <NotificationsOutlined onClick={()=>handleMenuItemClick} />
      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'lock-button',
          role: 'listbox',
        }}
      >
            <div>
            <p>Notifications</p>
            </div>
      </Menu>
    </div>
  );
}
