import { useState, useEffect } from 'react';

interface GeoLocation {
    latitude: number | null;
    longitude: number | null;
}

const useGeoLocation = () => {
    const [location, setLocation] = useState<GeoLocation>({ latitude: null, longitude: null });
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!navigator.geolocation) {
            setError('Geolocation is not supported by your browser');
            return;
        }

        const success = (position: GeolocationPosition) => {
            setLocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            });
        };

        const error = () => {
            setError('Unable to retrieve your location');
        };

        navigator.geolocation.getCurrentPosition(success, error);
    }, []);

    return { location, error };
};

export default useGeoLocation;