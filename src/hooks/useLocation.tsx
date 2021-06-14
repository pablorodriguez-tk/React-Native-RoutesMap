import Geolocation from '@react-native-community/geolocation';
import {useRef, useState, useEffect} from 'react';

import {Location} from '../interfaces/appInterfaces';

export const useLocation = () => {
  const [hasLocation, setHasLocation] = useState(false);
  const [initialPosition, setInitialPosition] = useState<Location>({
    longitude: 0,
    latitude: 0,
  });
  const [userLocation, setUserLocation] = useState<Location>({
    longitude: 0,
    latitude: 0,
  });
  const watchId = useRef<number>();

  useEffect(() => {
    getCurrentLocation().then(location => {
      setInitialPosition(location);
      setUserLocation(location);
      setHasLocation(true);
    });
  }, []);

  const getCurrentLocation = (): Promise<Location> => {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        ({coords}) => {
          resolve({
            latitude: coords.latitude,
            longitude: coords.longitude,
          });
        }, // OK
        err => reject({err}), // Error
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}, //Opciones
      );
    });
  };

  const followUserLocation = () => {
    watchId.current = Geolocation.watchPosition(
      ({coords}) => {
        setUserLocation({
          latitude: coords.latitude,
          longitude: coords.longitude,
        });
      }, // OK
      err => console.log(err), // Error
      {
        enableHighAccuracy: true,
        distanceFilter: 10,
        timeout: 20000,
        maximumAge: 1000,
      },
    ); //Opciones)
  };

  const stopFollowUserLocation = () => {
    if (watchId.current) {
      Geolocation.clearWatch(watchId.current);
    }
  };

  return {
    hasLocation,
    initialPosition,
    getCurrentLocation,
    followUserLocation,
    stopFollowUserLocation,
    userLocation,
  };
};
