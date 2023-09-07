// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import {TypedUseSelectorHook, useSelector} from 'react-redux';

import {RootState} from '~state/store';

/**
 * Custom hook for selecting states in the redux store
 */
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default useAppSelector;
