import React, { useState } from 'react'
import moment from 'moment'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'

const MembershipTable = ({ memberships }) => {
    const [pageSize, setPageSize] = useState(5)

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
    ]

    return (
        <>
            <DataGrid
                getRowId={(row) => row._id}
                columns={columns}
                rows={memberships}
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                rowsPerPageOptions={[5, 10, 20]}
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
        </>
    )
}

export default MembershipTable