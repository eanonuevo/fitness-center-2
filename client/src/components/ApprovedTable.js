import React, { useState } from 'react'
import moment from 'moment'
import { DataGrid, GridToolbar, GridActionsCellItem } from '@mui/x-data-grid'
import {
    Tooltip,
} from '@mui/material'
import LockClockIcon from '@mui/icons-material/LockClock';
import ExpiredModal from './ExpiredModal';

const ApprovedTable = ({ approved }) => {
    const [pageSize, setPageSize] = useState(10)
    const [openExpire, setOpenExpire] = useState(false);
    const [rowValues, setRowValues] = useState({})

    const handleOpenExpire = (row) => {
        setOpenExpire(true)
        setRowValues(row)
    }
    const handleCloseExpire = () => setOpenExpire(false);

    const columns = [
        { 
            field: 'fullName', 
            headerName: 'Name', 
            width: 200,
            valueGetter: (params) => {
                return `${params.row.firstName || ''} ${params.row.lastName || ''}`
            },
        },
        { field: 'name', headerName: 'Plan', width: 100 },
        { field: 'price', headerName: 'Price', width: 80 },
        { field: 'status', headerName: 'Status', width: 100 },
        { 
            field: 'startingDate', 
            headerName: 'Starting Date', 
            type: 'date', 
            width: 125,
            valueFormatter: (params) => {
              const valueFormatted = moment(params.value).format('MMM D, YYYY')
              return valueFormatted
            },
        },
        { 
            field: 'validity', 
            headerName: 'Valid Until', 
            type: 'date', 
            width: 125,
            valueFormatter: (params) => {
              const valueFormatted = moment(params.value).format('MMM D, YYYY')
              return valueFormatted
            },
        },
        { 
            field: 'createdAt', 
            headerName: 'Applied At', 
            type: 'date', 
            width: 200,
            valueFormatter: (params) => {
              const valueFormatted = moment(params.value).format('MMM D, YYYY, h:mm:ss a')
              return valueFormatted
            },
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 120,
            cellClassName: 'actions',
            getActions: (params) => {
                return [
                    <GridActionsCellItem
                        icon={<Tooltip title='Expired' arrow><LockClockIcon/></Tooltip>}
                        label="Approved"
                        className="textPrimary"
                        onClick={() => handleOpenExpire(params.row)}
                        color="secondary"
                    />,
                ];
            },
        },
    ]

    return (
        <>
            <DataGrid
                getRowId={(row) => row._id}
                columns={columns}
                rows={approved}
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                rowsPerPageOptions={[10, 20, 30]}
                pagination
                {...approved}
                autoHeight {...approved}
                components={{ Toolbar: GridToolbar }}
                disableColumnFilter
                disableColumnSelector
                componentsProps={{
                toolbar: {
                        showQuickFilter: true,
                        quickFilterProps: { debounceMs: 500 },
                    },
                }}
            />
            <ExpiredModal rowValues={rowValues} openExpire={openExpire} handleCloseExpire={handleCloseExpire} />
        </>
    )
}

export default ApprovedTable
