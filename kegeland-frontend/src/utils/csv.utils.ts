import { SessionDataPoint } from '../state/ducks/sessions/sessions.interface';

export const exportSessionAsCsv = (
  labels: string[],
  data: Record<string, SessionDataPoint[]>,
) => {
  let csvContent = 'data:text/csv;charset=utf-8,';
  const rows = [labels.join(',')];
  Object.entries(data).forEach(([key, val]) => {
    rows.push([key, ...val].join(','));
  });
  csvContent += rows.join('\n');
  return encodeURI(csvContent);
};
