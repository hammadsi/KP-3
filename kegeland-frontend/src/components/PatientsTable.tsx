import { useMediaQuery } from '@chakra-ui/react';
import { createColumnHelper, ColumnDef } from '@tanstack/react-table';
import React from 'react';

import { Patient } from '../state/ducks/patients/patients.interface';
import { renderName } from '../utils/renderName';

import DataTable from './DataTable';

type PatientsTableProps = {
  patients: Patient[];
};

const PatientsTable: React.FC<PatientsTableProps> = ({ patients }) => {
  const [isGreaterThanLg] = useMediaQuery('(min-width: 62em)');
  const columnHelper = createColumnHelper<Patient>();
  const columns = React.useMemo<ColumnDef<Patient, any>[]>(
    () => [
      columnHelper.accessor('name', {
        header: 'Patient',
        cell: (props) => renderName(props.getValue()),
      }),
      ...(isGreaterThanLg
        ? [
            columnHelper.accessor('email', {
              header: 'E-mail',
              cell: (props) => props.getValue(),
            }),
          ]
        : []),
    ],
    [isGreaterThanLg],
  );

  return <DataTable data={patients} columns={columns} patientId={''} />;
};

export default PatientsTable;
