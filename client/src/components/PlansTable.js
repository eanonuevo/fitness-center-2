import React, { useState } from 'react'
import { DataGrid, GridToolbar, GridActionsCellItem, } from '@mui/x-data-grid'
import {
    Tooltip,
} from '@mui/material'
import moment from 'moment'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import PlansEditModal from './PlansEditModal';
import PlansDeleteModal from './PlansDeleteModal';

const EquipmentsTable = ({ plans }) => {
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [pageSize, setPageSize] = useState(5)
    const [rowValues, setRowValues] = useState({})

    const handleOpenEdit = (row) => {
        setOpenEdit(true)
        setRowValues(row)
    }
    const handleCloseEdit = () => setOpenEdit(false);

    const handleOpenDelete = (row) => {
        setOpenDelete(true)
        setRowValues(row)
    }
    const handleCloseDelete = () => setOpenDelete(false)

    const columns = [
        { field: 'name', headerName: 'Plan Name', width: 150 },
        { field: 'price', headerName: 'Price', width: 75 },
        { field: 'months', headerName: 'Months', width: 75 },
        { field: 'description', headerName: 'Description', width: 300 },
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
                        icon={<Tooltip title='Edit' arrow><EditIcon/></Tooltip>}
                        label="Edit"
                        className="textPrimary"
                        onClick={() => handleOpenEdit(params.row)}
                        color="secondary"
                    />,
                    <GridActionsCellItem
                        icon={<Tooltip title='Delete' arrow><DeleteIcon/></Tooltip>}
                        label="Delete"
                        onClick={() => handleOpenDelete(params.row)}
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
                rows={plans}
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                rowsPerPageOptions={[5, 10, 20]}
                pagination
                {...plans}
                autoHeight {...plans}
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
            <PlansEditModal rowValues={rowValues} openEdit={openEdit} handleCloseEdit={handleCloseEdit} />
            <PlansDeleteModal rowValues={rowValues} openDelete={openDelete} handleCloseDelete={handleCloseDelete} />
        </>
    )
}

export default EquipmentsTable