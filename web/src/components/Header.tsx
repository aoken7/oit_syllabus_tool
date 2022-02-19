import * as React from 'react';
import { Link as MuiLink, styled, AppBar, Box, Toolbar, Typography, Button, IconButton } from '@mui/material';
import { useTheme } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Brightness2Icon from "@mui/icons-material/Brightness3";
import { ColorModeContext } from '../App';

const CustomAppBar = styled(AppBar)({
    position: "fixed",
    minHeight: "35px",
});

const CustomToolBar = styled(Toolbar)({
    minHeight: '35px',
    backgroundColor: "#00a1ea",
});

const CustomLink = styled(MuiLink)({
    textDecoration: "none",
    color: "black",
});

export default function Header() {
    const [returntop, setReturntop] = React.useState(false);
    const onClickReturnTop = () => setReturntop(!returntop);

    const theme = useTheme();
    const colorMode = React.useContext(ColorModeContext);

    return (
        <>
            <Box>
                <CustomAppBar>
                    <CustomToolBar>
                        <Typography
                            variant="h5"
                            component="div"
                            sx={{ flexGrow: 1 }}>
                            <CustomLink
                                target="_blank"
                                rel="noopener noreferrer"
                                href="https://oit.yashikota.com">
                                OIT Tools
                            </CustomLink>
                        </Typography>
                        <Button
                            onClick={onClickReturnTop}
                            variant="outlined"
                            size='small'
                            component={Link}
                            {...returntop ? { to: './' } : { to: '/about' }}
                            sx={{ mr: "20px", color: "black", borderColor: "black" }}>
                            {returntop ? "戻る" : "about"}
                        </Button>
                        <IconButton
                            onClick={colorMode.toggleColorMode}
                            sx={{ color: "black" }}>
                            {theme.palette.type === 'dark' ? <Brightness7Icon /> : <Brightness2Icon />}
                        </IconButton>
                    </CustomToolBar>
                </CustomAppBar>
                <CustomToolBar />
            </Box>
        </>
    );
}
