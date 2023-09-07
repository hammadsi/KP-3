import {PermissionsAndroid} from 'react-native';

/**
 * Checks if the user has handled a permission request.
 * If not, the user will be prompted with a permission request
 * @param permission the permission to check
 */
const checkAndroidPermission = async (permission: string) => {
  return PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS[permission],
  ).then((result) => {
    if (result) {
      console.warn(`Permission ${permission} is OK`);
    } else {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS[permission],
      ).then((status) => {
        if (status === 'granted') {
          console.warn('User accepted');
        } else {
          console.warn('User refused');
        }
      });
    }
  });
};

export default checkAndroidPermission;
