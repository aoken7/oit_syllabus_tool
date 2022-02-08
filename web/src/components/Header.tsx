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

const CustomAppBar = styled(AppBar)({
    position: "fixed",
    minHeight: "35px",
});

const CustomToolBar = styled(Toolbar)({
    minHeight: '35px',
    backgroundColor: "inherit"
});

const CustomLink = styled(Link)({
    textDecoration: "none",
    color: "inherit",
});

export default function Header() {
    const [Theme, setTheme] = React.useState(false);
    const toggleTheme = () => setTheme(!Theme);

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
                            <CustomLink
                                to="https://oit.yashikota.com">
                                OIT Tools
                            </CustomLink>
                        </Typography>
                        <Button
                            color="inherit"
                            onClick={onClickReturnTop}
                            variant="outlined"
                            size='small'
                            component={Link}
                            {...returntop ? { to: './' } : { to: '/about' }}
                            sx={{ mr: "20px" }}
                        >
                            {returntop ? "戻る" : "使い方"}
                        </Button>
                        <IconButton
                            {...console.log(Theme)}
                            onClick={toggleTheme}
                            color="inherit">
                            {Theme ? <Brightness7Icon /> : <Brightness2Icon />}
                        </IconButton>
                    </CustomToolBar>
                </CustomAppBar>
                <CustomToolBar />
            </Box>
        </>
    );
}
