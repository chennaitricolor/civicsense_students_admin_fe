import React from 'react';
import PropTypes from 'prop-types';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import './index.css';

function desc(a, b, orderBy) {
    if (typeof a[orderBy] === 'number' && typeof b[orderBy] === 'number') {
        if (a[orderBy] > b[orderBy]) return 1;
        if (a[orderBy] === b[orderBy]) return 0;
        return -1;
    }
    return a[orderBy].localeCompare(b[orderBy], 'en', { sensitivity: 'base' });
}

function stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

function getSorting(order, orderBy) {
    return order === 'desc'
        ? (a, b) => desc(a, b, orderBy)
        : (a, b) => -desc(a, b, orderBy);
}

function TableHeader({
     column, orderBy, order, onRequestSort, preventSortForColumns,
 }) {
    const { id, label } = column;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };
    return (
        <th>
            <TableSortLabel
                active={orderBy === id}
                direction={order}
                onClick={createSortHandler(id)}
                disabled={preventSortForColumns.includes(id)}
            >
                {label}
            </TableSortLabel>
        </th>
    );
}

TableHeader.defaultProps = {
    preventSortForColumns: [],
};

TableHeader.propTypes = {
    column: PropTypes.objectOf(PropTypes.any).isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    preventSortForColumns: PropTypes.arrayOf(PropTypes.string),
};

export default function Table({
    columns, rows, columnChecked, onColumnCheckboxClick, onRowCheckboxClick,
    orderBy, setOrderBy, preventSortForColumns,
  }) {
    const [order, setOrder] = React.useState('asc');
    const handleRequestSort = (event, property) => {
        if (!preventSortForColumns.includes(property)) {
            const isDesc = orderBy === property && order === 'desc';
            setOrder(isDesc ? 'asc' : 'desc');
            setOrderBy(property);
        }
    };
    return (
        <table className="custom-table" cellSpacing={0}>
            <thead>
            <tr>
                <th>
                    <input type="checkbox" checked={columnChecked} onChange={onColumnCheckboxClick} />
                </th>
                {columns.map((column) => (
                    <TableHeader
                        key={column.id}
                        column={column}
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}
                        preventSortForColumns={preventSortForColumns}
                    />
                ))}
            </tr>
            </thead>
            <tbody>
            {stableSort(rows, getSorting(order, orderBy))
                .map((row) => (
                    <tr key={row.id}>
                        <td>
                            <input type="checkbox" checked={row.checked} onChange={() => onRowCheckboxClick(row)} />
                        </td>
                        {columns.map((column) => {
                            const value = row[column.id];
                            return (
                                <td key={`${row.id}-${column.id}`}>
                                    {column.format ? column.format(value) : value}
                                </td>
                            );
                        })}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

Table.defaultProps = {
    preventSortForColumns: [],
};

Table.propTypes = {
    columns: PropTypes.arrayOf(PropTypes.object).isRequired,
    columnChecked: PropTypes.bool.isRequired,
    orderBy: PropTypes.string.isRequired,
    rows: PropTypes.arrayOf(PropTypes.object).isRequired,
    setOrderBy: PropTypes.func.isRequired,
    onColumnCheckboxClick: PropTypes.func.isRequired,
    onRowCheckboxClick: PropTypes.func.isRequired,
    preventSortForColumns: PropTypes.arrayOf(PropTypes.string),
};
