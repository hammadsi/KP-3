import { cloneDeep, filter } from 'lodash';
import { useCallback, useEffect, useRef, useState } from 'react';

import { fetchPatients } from '../state/ducks/patients/patients.actions';
import { Patient } from '../state/ducks/patients/patients.interface';
import { clearPatientsState } from '../state/ducks/patients/patients.reducer';

import useAppDispatch from './useAppDispatch';
import useAppSelector from './useAppSelector';

const usePatientList = () => {
  const dispatch = useAppDispatch();
  const prevSearchStr = useRef<string>();
  const [patients, setPatients] = useState<Patient[]>([]);
  const { data, loading } = useAppSelector((state) => state.patients);

  const filterData = useCallback(
    (value: string) => {
      const searchStr = value.toLowerCase();
      let source: Patient[];
      if (
        prevSearchStr.current &&
        searchStr.startsWith(prevSearchStr.current)
      ) {
        source = cloneDeep(patients);
      } else {
        source = data;
      }
      setPatients(
        filter(
          source,
          (item) =>
            item.name.firstName.toLowerCase().includes(searchStr) ||
            item.name.lastName.toLowerCase().includes(searchStr),
        ),
      );
      prevSearchStr.current = searchStr;
    },
    [patients],
  );

  useEffect(() => {
    dispatch(fetchPatients());

    return () => {
      dispatch(clearPatientsState());
    };
  }, []);

  useEffect(() => {
    setPatients(data);
  }, [data]);

  return { patients, loading, filterData };
};

export default usePatientList;
