import { useMediaQuery } from '@chakra-ui/react';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import moment from 'moment';
import React from 'react';

import { GameSession } from '../state/ducks/wheelchairPatients/wheelchairPatients.interface';

import DataTable from './DataTable';

type ExerciseTableProps = {
  sessions: GameSession[];
  patientId: string;
};

const ExerciseTable: React.FC<ExerciseTableProps> = ({ sessions, patientId }) => {
  const [isGreaterThanMd] = useMediaQuery('(min-width: 48em)');
  const columnHelper = createColumnHelper<GameSession>();
  const columns = React.useMemo<ColumnDef<GameSession, any>[]>(
    () => [
      ...(isGreaterThanMd
        ? [
            columnHelper.accessor('createdAt', {
              header: 'Date',
              cell: (props) => moment(props.getValue()).format('lll'),
            }),
          ]
        : []),
    ],
    [isGreaterThanMd],
  );

  return <DataTable data={sessions} columns={columns} patientId={patientId}/>;
};

export default ExerciseTable;
