import * as React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { styled } from '@mui/material';
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Brightness2Icon from "@mui/icons-material/Brightness3";
import IconButton from '@mui/material/IconButton/IconButton';
import Theme from "../components/Theme";

const CustomAppBar = styled(AppBar)({
    position: "fixed",
    minHeight: "35px",
    backgroundColor: Theme.palette.background.paper,
});

const CustomToolBar = styled(Toolbar)({
    minHeight: '35px',
    color: Theme.palette.text.primary,
});

export default function Header() {
    const [theme, setTheme] = React.useState(false);
    const onClickSwitch = () => setTheme(!theme);

    const [returntop, setReturntop] = React.useState(false);
    const onClickReturnTop = () => setReturntop(!returntop);

    return (
        <>
            <Box>
                <CustomAppBar>
                    <CustomToolBar>
                        <Typography
                            variant="h5"
                            component="div"
                            color="inherit"
                            sx={{ flexGrow: 1 }}>
                            OIT Tools
                        </Typography>
                        <Button
                            color="inherit"
                            onClick={onClickReturnTop}
                            variant="outlined"
                            size='small'
                            component={Link}
                            {...returntop ? { to: './' } : { to: '/about' }}
                            sx={{ mx: "auto" }}
                        >
                            {returntop ? "戻る" : "使い方"}
                        </Button>
                        <IconButton
                            onClick={onClickSwitch}
                            color="inherit">
                            {theme ? <Brightness7Icon /> : <Brightness2Icon />}
                        </IconButton>
                    </CustomToolBar>
                </CustomAppBar>
                <CustomToolBar />
            </Box>
        </>
    );
}
