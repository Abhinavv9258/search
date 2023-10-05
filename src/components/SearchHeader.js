import React from 'react';
import Typography from '@mui/material/Typography';
import Logo from '../assets/images/logo.png'
import '../assets/css/Content.css';

const SearchHeader = () => {
    return (
        <>
            <Typography sx={{ fontSize: 25, color: "grey" }}>
                <img src={Logo} className='logo' alt="logo" />
                Search
            </Typography>
        </>
    );
};

export default SearchHeader;