import { useState } from 'react';

const useToggle = () => {
  const [opened, toggleOpened] = useState(true);

  return {
    opened,
    toggle: () => toggleOpened(!opened),
  };
};

export default useToggle;
