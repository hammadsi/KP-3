import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
  IconButton,
  Text,
  Tooltip,
  Select,
  TableContainer,
  Tfoot,
  useMediaQuery,
} from '@chakra-ui/react';
import {
  ArrowRightIcon,
  ArrowLeftIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
} from '@chakra-ui/icons';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

export type DataTableProps<T extends object> = {
  data: T[];
  columns: ColumnDef<T, any>[];
};

const DataTable = <T extends object>({ data, columns }: DataTableProps<T>) => {
  const [isGreaterThanLg] = useMediaQuery('(min-width: 62em)');
  const table = useReactTable<T>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
  });
  return (
    <Flex flexDirection="column" height="100%">
      <TableContainer height="full">
        <Table height="full" colorScheme="gray">
          <Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {table.getRowModel().rows.map((row) => (
              <Tr
                key={row.id}
                _hover={{
                  backgroundColor: 'blackAlpha.50',
                  transitionDuration: '300ms',
                }}>
                {row.getVisibleCells().map((cell) => (
                  <Td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
          <Tfoot>
            {table.getFooterGroups().map((footerGroup) => (
              <Tr key={footerGroup.id}>
                {footerGroup.headers.map((header) => (
                  <Th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.footer,
                          header.getContext(),
                        )}
                  </Th>
                ))}
              </Tr>
            ))}
          </Tfoot>
        </Table>
      </TableContainer>
      <Flex
        justifyContent="space-between"
        justifySelf="end"
        m={4}
        alignItems="center">
        <Flex>
          <Tooltip label="First Page">
            <IconButton
              aria-label="Go to first page"
              onClick={() => table.setPageIndex(0)}
              isDisabled={!table.getCanPreviousPage()}
              icon={<ArrowLeftIcon h={3} w={3} />}
              mr={4}
            />
          </Tooltip>
          <Tooltip label="Previous Page">
            <IconButton
              aria-label="Go to previous page"
              onClick={() => table.previousPage()}
              isDisabled={!table.getCanPreviousPage()}
              icon={<ChevronLeftIcon h={6} w={6} />}
            />
          </Tooltip>
        </Flex>
        {isGreaterThanLg && (
          <Flex alignItems="center">
            <Text flexShrink="0" mr={8}>
              Page{' '}
              <Text fontWeight="bold" as="span">
                {table.getState().pagination.pageIndex + 1}
              </Text>{' '}
              of{' '}
              <Text fontWeight="bold" as="span">
                {table.getPageCount()}
              </Text>
            </Text>

            <Select
              w={32}
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
              }}>
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </Select>
          </Flex>
        )}

        <Flex>
          <Tooltip label="Next Page">
            <IconButton
              aria-label="Go to next page"
              onClick={() => table.nextPage()}
              isDisabled={!table.getCanNextPage()}
              icon={<ChevronRightIcon h={6} w={6} />}
            />
          </Tooltip>
          <Tooltip label="Last Page">
            <IconButton
              aria-label="Go to last page"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              isDisabled={!table.getCanNextPage()}
              icon={<ArrowRightIcon h={3} w={3} />}
              ml={4}
            />
          </Tooltip>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default DataTable;
