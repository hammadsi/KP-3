import { HStack } from '@chakra-ui/react';
import moment from 'moment';
import { MdOutlineWatchLater } from 'react-icons/md';

import LabeledValue from '../LabeledValue';

type GraphHeaderProps = {
  date: number;
  endTime: Date;
};

const GraphHeader: React.FC<GraphHeaderProps> = ({ date, endTime }) => {
  const dateFormat = new Date(
    (date as any)._seconds * 1000 + (date as any)._nanoseconds / 1000000,
  );

  function getDuration(startDate: any, endDate: any) {
    const durationInMilliseconds = endDate.getTime() - startDate.getTime();

    const hours = Math.floor(durationInMilliseconds / (1000 * 60 * 60));
    const minutes = Math.floor(
      (durationInMilliseconds % (1000 * 60 * 60)) / (1000 * 60),
    );
    const seconds = Math.floor((durationInMilliseconds % (1000 * 60)) / 1000);

    return `${hours}:${String(minutes).padStart(2, '0')}:${String(
      seconds,
    ).padStart(2, '0')}`;
  }

  const duration = getDuration(dateFormat, new Date(endTime));

  return (
    <HStack justifyContent="space-between">
      <HStack spacing={12}>
        <LabeledValue
          label="Date of exercise"
          value={moment(dateFormat).format('lll')}
        />
        <LabeledValue
          label="Duration"
          icon={MdOutlineWatchLater}
          value={`${duration}`}
        />
      </HStack>
    </HStack>
  );
};

export default GraphHeader;
