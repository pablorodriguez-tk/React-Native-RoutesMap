import React from 'react';
import MapView, {Marker} from 'react-native-maps';
import {useLocation} from '../hooks/useLocation';
import {LoadingScreen} from '../pages/LoadingScreen';

interface Props {
  markers?: Marker[];
}

export const Map = ({markers}: Props) => {
  const {hasLocation, initialPosition} = useLocation();

  if (!hasLocation) {
    return <LoadingScreen />;
  }

  return (
    <>
      <MapView
        style={{flex: 1}}
        // provider={PROVIDER_GOOGLE} // Solo IOS
        showsUserLocation
        initialRegion={{
          latitude: initialPosition.latitude,
          longitude: initialPosition.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        {/* <Marker
          image={require('../assets/custom-marker.png')}
          coordinate={{latitude: 37.78825, longitude: -122.4324}}
          title="esto es un titulo"
          description="esto es una descripcion"
        /> */}
      </MapView>
    </>
  );
};
