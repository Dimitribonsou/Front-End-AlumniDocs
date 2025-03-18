import { useEffect, useRef, useState } from 'react';

const useSticky = () => {
    const stickyRef = useRef(null);
    const [sticky, setSticky] = useState(false);
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        if (!stickyRef.current) return;
        setOffset(stickyRef.current.offsetTop);
    }, [stickyRef]);

    useEffect(() => {
        const handleScroll = () => {
            if (!stickyRef.current) return;
            setSticky(window.scrollY > offset);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [offset]);

    return { stickyRef, sticky };
};

export default useSticky;
