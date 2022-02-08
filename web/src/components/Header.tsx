import * as React from 'react';
import { Link as MuiLink, styled } from '@mui/material';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Brightness2Icon from "@mui/icons-material/Brightness3";
import IconButton from '@mui/material/IconButton/IconButton';
import { useTheme } from "@material-ui/core/styles";
import { ColorModeContext } from '../App';

const CustomAppBar = styled(AppBar)({
    position: "fixed",
    minHeight: "35px",
});

const CustomToolBar = styled(Toolbar)({
    minHeight: '35px',
    backgroundColor: "inherit"
});

const CustomLink = styled(MuiLink)({
    textDecoration: "none",
    color: "inherit",
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
                            color="inherit"
                            sx={{ flexGrow: 1 }}>
                            <CustomLink
                                target="_blank"
                                rel="noopener noreferrer"
                                href="https://oit.yashikota.com">
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
                            {returntop ? "戻る" : "about"}
                        </Button>
                        <IconButton
                            onClick={colorMode.toggleColorMode}
                            color="inherit">
                            {theme.palette.type === 'dark' ? <Brightness7Icon /> : <Brightness2Icon />}
                        </IconButton>
                    </CustomToolBar>
                </CustomAppBar>
                <CustomToolBar />
            </Box>
        </>
    );
}
