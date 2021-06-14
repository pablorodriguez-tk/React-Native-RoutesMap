import Geolocation from '@react-native-community/geolocation';
import {useState} from 'react';
import {useEffect} from 'react';
import {Location} from '../interfaces/appInterfaces';

export const useLocation = () => {
  const [hasLocation, setHasLocation] = useState(false);
  const [initialPosition, setInitialPosition] = useState<Location>({
    longitude: 0,
    latitude: 0,
  });

  useEffect(() => {
    Geolocation.getCurrentPosition(
      ({coords}) => {
        setInitialPosition({
          latitude: coords.latitude,
          longitude: coords.longitude,
        });
        setHasLocation(true);
      }, // OK
      console.log, // Error
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}, //Opciones
    );
  }, []);

  return {hasLocation, initialPosition};
};
