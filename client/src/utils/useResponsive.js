import { useEffect, useState } from 'react';

const getDeviceConfig = (width) => {
  if (width < 640) return { isMobile: true, isTablet: false, isDesktop: false };
  if (width < 1024) return { isMobile: false, isTablet: true, isDesktop: false };
  return { isMobile: false, isTablet: false, isDesktop: true };
};

const useResponsive = () => {
  const [device, setDevice] = useState(getDeviceConfig(window.innerWidth));

  useEffect(() => {
    const handleResize = () => {
      setDevice(getDeviceConfig(window.innerWidth));
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return device;
};

export default useResponsive; 