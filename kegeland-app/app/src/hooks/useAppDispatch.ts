// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import {useDispatch} from 'react-redux';

import {AppDispatch} from '~state/store';

/**
 * Custom hook for dispatching redux actions
 */
const useAppDispatch: () => AppDispatch = useDispatch;

export default useAppDispatch;
