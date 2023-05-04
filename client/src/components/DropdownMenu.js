import React from 'react';
import {TextField} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import {useState, useEffect} from 'react';

// компонент выподающий список
const DropdownMenu = ({label, name, value, options, disabled, defaultDropdownValue, onChange}) => {

    const [dropdownValue, setDropdownValue] = useState(defaultDropdownValue);

    useEffect(() => {
        setDropdownValue(value);
    }, [value]);

    const handleDropdownChange = (event) => {
        const {value} = event.target;
        setDropdownValue(value);
        onChange(event);
    };

    return (
        <TextField
            margin="dense"
            select
            name={name}
            label={label}
            value={dropdownValue}
            onChange={handleDropdownChange}
            disabled={disabled}
            variant="outlined"
            fullWidth
            InputLabelProps={{
                shrink: true
            }}
            SelectProps={{
                defaultValue: dropdownValue
            }}
        >
            {options.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                    {option.label}
                </MenuItem>
            ))}
        </TextField>
    );
};

export default DropdownMenu;