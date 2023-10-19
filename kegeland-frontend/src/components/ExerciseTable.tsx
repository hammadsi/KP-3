import { useMediaQuery } from '@chakra-ui/react';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { capitalize } from 'lodash';
import moment from 'moment';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { LeanSession } from '../state/ducks/sessions/sessions.interface';

import DataTable from './DataTable';

type ExerciseTableProps = {
  sessions: LeanSession[];
  patientId: string;
};

const ExerciseTable: React.FC<ExerciseTableProps> = ({
  sessions,
  patientId,
}) => {
  const [isGreaterThanMd] = useMediaQuery('(min-width: 48em)');
  const navigate = useNavigate();

  const columnHelper = createColumnHelper<LeanSession>();
  const columns = React.useMemo<ColumnDef<LeanSession, any>[]>(
    () => [
      ...(isGreaterThanMd
        ? [
            columnHelper.accessor('createdAt', {
              header: 'Date',
              cell: (props) => moment(props.getValue()).format('lll'),
            }),
          ]
        : []),
      columnHelper.accessor('sensor', {
        header: 'Sensor',
        cell: (props) => capitalize(props.getValue()),
      }),
    ],
    [isGreaterThanMd],
  );

  return <DataTable data={sessions} columns={columns} />;
};

export default ExerciseTable;
