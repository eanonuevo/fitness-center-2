import React, { useState } from 'react'
import { DataGrid, GridToolbar, GridActionsCellItem, } from '@mui/x-data-grid'
import {
    Tooltip,
} from '@mui/material'
import moment from 'moment'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import PreviewIcon from '@mui/icons-material/Preview';
import MembersEditModal from './MembersEditModal';
import MembersDeleteModal from './MembersDeleteModal';
import MembersMemberships from './MembersMemberships';

const MembersTable = ({ members }) => {
    const [pageSize, setPageSize] = useState(10)
    const [openEdit, setOpenEdit] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)
    const [openView, setOpenView] = useState(false)
    const [rowValues, setRowValues] = useState({})

    const handleOpenEdit = (row) => {
        setOpenEdit(true)
        setRowValues(row)
    }
    const handleCloseEdit = () => setOpenEdit(false)

    const handleOpenDelete = (row) => {
        setOpenDelete(true)
        setRowValues(row)
    }
    const handleCloseDelete = () => setOpenDelete(false)

    const handleOpenView = (row) => {
        setOpenView(true)
        setRowValues(row)
    }
    const handleCloseView = () => setOpenView(false)

    const columns = [
        { 
            field: 'fullName', 
            headerName: 'Full Name', 
            width: 200,
            valueGetter: (params) => {
                return `${params.row.firstName || ''} ${params.row.lastName || ''}`
            },
        },
        { field: 'email', headerName: 'Email', width: 225 },
        { field: 'status', headerName: 'Status', width: 80 },
        { 
            field: 'createdAt', 
            headerName: 'Created At', 
            type: 'date', 
            width: 200,
            valueFormatter: (params) => {
              const valueFormatted = moment(params.value).format('MMM D YYYY, h:mm:ss a')
              return valueFormatted
            },
        },
        { 
            field: 'updatedAt', 
            headerName: 'Updated At', 
            type: 'date', 
            width: 200,
            valueFormatter: (params) => {
              const valueFormatted = moment(params.value).format('MMM D YYYY, h:mm:ss a')
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
                        icon={<Tooltip title='Edit' arrow><EditIcon /></Tooltip>}
                        label="Edit"
                        className="textPrimary"
                        onClick={() => handleOpenEdit(params.row)}
                        color="secondary"
                    />,
                    <GridActionsCellItem
                        icon={<Tooltip title='Delete' arrow><DeleteIcon /></Tooltip>}
                        label="Delete"
                        onClick={() => handleOpenDelete(params.row)}
                        color="secondary"  
                    />,
                    <GridActionsCellItem
                        icon={<Tooltip title='View Memberships' arrow><PreviewIcon /></Tooltip>}
                        label="View"
                        onClick={() => handleOpenView(params.row)}
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
                rows={members}
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                rowsPerPageOptions={[10, 20, 30]}
                pagination
                {...members}
                autoHeight {...members}
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
            <MembersEditModal rowValues={rowValues} openEdit={openEdit} handleCloseEdit={handleCloseEdit} />
            <MembersDeleteModal rowValues={rowValues} openDelete={openDelete} handleCloseDelete={handleCloseDelete} />
            <MembersMemberships rowValues={rowValues} openView={openView} handleCloseView={handleCloseView} />
        </>
    )
}

export default MembersTable