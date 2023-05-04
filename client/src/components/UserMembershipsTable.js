import React, { useState } from 'react'
import moment from 'moment'
import { DataGrid, GridToolbar, GridActionsCellItem, } from '@mui/x-data-grid'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import MembershipsEditModal from './MembershipsEditModal';
import MembershipDeleteModal from './MembershipDeleteModal';

const UserMembershipsTable = ({ memberships }) => {
    const [pageSize, setPageSize] = useState(3)
    const [openEdit, setOpenEdit] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)
    const [membershipValues, setMembershipValues] = useState({})

    const handleOpenEdit = (row) => {
        setOpenEdit(true)
        setMembershipValues(row)
    }
    const handleCloseEdit = () => setOpenEdit(false)

    const handleOpenDelete = (row) => {
        setOpenDelete(true)
        setMembershipValues(row)
    }
    const handleCloseDelete = () => setOpenDelete(false)

    const columns = [
        { field: 'name', headerName: 'Plan Name', width: 200 },
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
            field: 'updatedAt', 
            headerName: 'Updated At', 
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
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={() => handleOpenEdit(params.row)}
                        color="primary"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={() => handleOpenDelete(params.row)}
                        color="primary"
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
                rows={memberships}
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                rowsPerPageOptions={[3, 5]}
                pagination
                {...memberships}
                autoHeight {...memberships}
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
            <MembershipsEditModal membershipValues={membershipValues} openEdit={openEdit} handleCloseEdit={handleCloseEdit} />
            <MembershipDeleteModal membershipValues={membershipValues} openDelete={openDelete} handleCloseDelete={handleCloseDelete} />
        </>
    )
}

export default UserMembershipsTable
