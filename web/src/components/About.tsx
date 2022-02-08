import React, { useEffect, useState } from "react";
import Markdown from 'markdown-to-jsx';
import { Box, styled } from '@mui/material';

const CustomBox = styled(Box)({
    color: "inherit",
    backgroundColor: "inherit",
    width: "100%",
    lineHeight: 2,
    textAlign: "center",
    a: { color: "skyblue" },
    fontSize: "1.1rem",
});

const About = () => {
    const [mdText, setMdText] = useState('');
    useEffect(() => {
        fetch("https://raw.githubusercontent.com/yashikota/oit-syllabus/release/README.md")
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