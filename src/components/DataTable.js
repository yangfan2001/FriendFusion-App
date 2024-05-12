import React, { useState } from 'react';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import { TextField, Box, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';


const DataTable= ({ showSearch=true,rows, columns, ...props }) => {
    const [searchText, setSearchText] = useState('');

    const handleSearch = (event) => {
        setSearchText(event.target.value);
    };

    console.log('rows:', rows);

    const filteredRows = rows.filter((row) => {
        return columns.some((column) => {
            const value = row[column.field];
            return value ? value.toString().toLowerCase().includes(searchText.toLowerCase()) : false;
        });
    });

    return (
        <Box sx={{ height: 400, width: '100%', marginTop: 2 }}>
            {showSearch && (
              <TextField
              fullWidth
              variant="outlined"
              value={searchText}
              onChange={handleSearch}
              placeholder="Search"
              margin="normal"
              InputProps={{
                  startAdornment: (
                      <InputAdornment position="start">
                          <SearchIcon />
                      </InputAdornment>
                  ),
              }}
          />
            )}
            <DataGrid
                rows={filteredRows}
                columns={columns}
                autoPageSize={true}
                pageSizeOptions={[5, 10, 20]}
                {...props}
                sx={{ height: 400, width: '100%' }}
            />
        </Box>
    );
}

DataTable.defaultProps = {
};

export default DataTable;