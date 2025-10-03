import { useEffect } from 'react';

/**
 * Custom hook to dynamically load external scripts or stylesheets.
 */
const useExternalScript = (url, type = 'script', onLoad) => {
    useEffect(() => {
        if (!url) return;

        let element;
        if (type === 'script') {
            element = document.createElement('script');
            element.src = url;
            element.async = true;
            element.onload = () => onLoad && onLoad();
            element.onerror = (e) => console.error(`Failed to load: ${url}`, e);
        } else if (type === 'style') {
            element = document.createElement('link');
            element.rel = 'stylesheet';
            element.href = url;
        }

        if (element) document.head.appendChild(element);

        return () => {
            if (element) document.head.removeChild(element);
        };
    }, [url, type, onLoad]);
};

export default useExternalScript;
