import { useState } from 'react';

export default () => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return {
    openDialog,
    handleOpenDialog,
    handleCloseDialog
  };
};
