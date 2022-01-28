import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { styled } from '@material-ui/core';
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Brightness2Icon from "@mui/icons-material/Brightness3";
import IconButton from '@mui/material/IconButton/IconButton';

const CustomToolbar = styled(Toolbar)({
    minHeight: '48px',
    backgroundColor: '#cccccc'
});

export default function Bar() {
    const [theme, setTheme] = React.useState(false);
    const onClickSwitch = () => setTheme(!theme);

    return (
        <Box>
            <AppBar position="static">
                <CustomToolbar>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}>
                        OIT Tools
                    </Typography>
                    <Button
                        sx={{ mx:"auto" }}>
                        使い方
                    </Button>
                    <IconButton
                        onClick={onClickSwitch}
                        color="inherit">
                        {theme ? <Brightness7Icon /> : <Brightness2Icon />}
                    </IconButton>
                </CustomToolbar>
            </AppBar>
        </Box>
    );
}
