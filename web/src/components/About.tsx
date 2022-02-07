import React, { useEffect, useState } from "react";
import Markdown from 'markdown-to-jsx';
import { Box, styled } from '@mui/material';
import Theme from "../components/Theme";

const CustomBox = styled(Box)({
    color: Theme.palette.text.primary,
    backgroundColor: Theme.palette.background.default,
    width: "100%",
    lineHeight: 2,
    textAlign: "center",
    a: { color: "skyblue" },
    fontSize: "1.1rem",
});

const About = () => {
    const [mdText, setMdText] = useState('');
    useEffect(() => {
        fetch("https://raw.githubusercontent.com/yashikota/oit-syllabus/web/README.md")
            .then((response) => {
                return response.text();
            })
            .then((text) => {
                setMdText(text);
            })
    });
    return (
        <CustomBox>
            <Markdown>
                {mdText}
            </Markdown>
        </CustomBox>
    );
}

export default About;