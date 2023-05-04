import React, { useState } from 'react'
import moment from 'moment'
import {
    Tooltip,
} from '@mui/material'
import { DataGrid, GridToolbar, GridActionsCellItem } from '@mui/x-data-grid'
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CancelIcon from '@mui/icons-material/Cancel';
import ApprovedModal from './ApprovedModal';
import RejectedModal from './RejectedModal';

const PendingTable = ({ pending }) => {
    const [pageSize, setPageSize] = useState(10)
    const [openApprove, setOpenApprove] = useState(false);
    const [openReject, setOpenReject] = useState(false);
    const [rowValues, setRowValues] = useState({})

    const handleOpenApprove = (row) => {
        setOpenApprove(true)
        setRowValues(row)
    }
    const handleCloseApprove = () => setOpenApprove(false);

    const handleOpenReject = (row) => {
        setOpenReject(true)
        setRowValues(row)
    }
    const handleCloseReject = () => setOpenReject(false);

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
                        icon={<Tooltip title='Approve' arrow><CheckBoxIcon/></Tooltip>}
                        label="Approved"
                        className="textPrimary"
                        onClick={() => handleOpenApprove(params.row)}
                        color="secondary"
                    />,
                    <GridActionsCellItem
                        icon={<Tooltip title='Reject' arrow><CancelIcon/></Tooltip>}
                        label="Approved"
                        className="textPrimary"
                        onClick={() => handleOpenReject(params.row)}
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
                rows={pending}
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                rowsPerPageOptions={[10, 20, 30]}
                pagination
                {...pending}
                autoHeight {...pending}
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
            <ApprovedModal rowValues={rowValues} openApprove={openApprove} handleCloseApprove={handleCloseApprove} />
            <RejectedModal rowValues={rowValues} openReject={openReject} handleCloseReject={handleCloseReject} />
        </>
    )
}

export default PendingTable
