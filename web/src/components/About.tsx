import { useEffect, useState } from "react";
import Markdown from 'markdown-to-jsx';
import { Box, styled } from '@mui/material';

const CustomBox = styled(Box)({
    color: "inherit",
    backgroundColor: "inherit",
    width: "100%",
    lineHeight: 2,
    textAlign: "center",
    fontSize: "1.1rem",
    a: {
        color: "#20B2AA",
    },
    img: {
        maxWidth: "94%",
    },
    pre: {
        fontSize: "1.0rem",
        lineHeight: 1,
        display: "inline-block",
        textAlign: "left",
    },
});

const About = () => {
    const [mdText, setMdText] = useState('');
    useEffect(() => {
        fetch("https://raw.githubusercontent.com/yashikota/oit-syllabus/master/README.md")
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