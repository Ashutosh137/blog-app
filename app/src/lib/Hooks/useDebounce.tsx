import { useRef } from 'react';

function useDebounce(callback: () => void, delay: number) {
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const debouncedCallback = () => {
        if (timeoutRef.current) {
            console.log(timeoutRef.current)
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            callback();
        }, delay);
    }

    return debouncedCallback;
}

export default useDebounce;
