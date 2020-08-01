import { useState } from 'react';

import api from '../../../api';

export default () => {
  const [openAlert, setOpenAlert] = useState(true);

  return {
    openAlert,
    setOpenAlert,
  };
};
