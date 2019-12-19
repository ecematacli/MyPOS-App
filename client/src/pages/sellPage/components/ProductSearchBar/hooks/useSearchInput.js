import React, { useState } from 'react';

import useInputState from '../../../../../common/hooks/useInputState';

export default () => {
  const [searchBarInput, setSearchBarInput] = useInputState('');
};
