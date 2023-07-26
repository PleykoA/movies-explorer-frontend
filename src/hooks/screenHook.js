import { useEffect, useCallback, useState } from 'react';

function useResize() {
    const getDeviceWidth = useCallback(() => window.innerWidth, []);
    const [deviceWidth, setDeviceWidth] = useState(getDeviceWidth());

    useEffect(() => {

        function handleScreenResize() {
            setDeviceWidth(getDeviceWidth());
        };

        window.addEventListener('resize', resizeController, false); 

        let resizeTimer;

        function resizeController() {
            if (!resizeTimer) {
                resizeTimer = setTimeout(() => {
                    resizeTimer = null;
                    handleScreenResize();
                }, 1000); 
            }
        };

        return () => window.removeEventListener('resize', handleScreenResize); 
    }, [getDeviceWidth]);

    return deviceWidth;
}

export default useResize;