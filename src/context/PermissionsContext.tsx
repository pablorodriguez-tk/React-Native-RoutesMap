import React from 'react';
import {useState} from 'react';
import {createContext} from 'react';
import {PermissionStatus} from 'react-native-permissions';

export interface PermissionsState {
  locationStatus: PermissionStatus;
}

export const permissionsInitState: PermissionsState = {
  locationStatus: 'unavailable',
};

type PermissionsContextProps = {
  permissions: PermissionsState;
  askLocationPermission: () => {};
  checkLocationPermission: () => {};
};

export const PermissionsContext = createContext({} as PermissionsContextProps);

const askLocationPermission = () => {};
const checkLocationPermission = () => {};

export const PermissionsProvider = ({children}: any) => {
  const [permissions, setPermissions] = useState(permissionsInitState);

  return (
    <PermissionsContext.Provider
      value={{permissions, askLocationPermission, checkLocationPermission}}>
      {children}
    </PermissionsContext.Provider>
  );
};
