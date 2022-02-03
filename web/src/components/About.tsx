import React, { useEffect, useState } from "react";
import Markdown from 'markdown-to-jsx';
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
    about: {
        color: "#000000",
        backgroundColor: "#ffffff",
        width: "100%",
        lineHeight: 2,
        textAlign: "center"
    },
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
    const classes = useStyles();
    return (
        <div className={classes.about}>
            <Markdown>
                {mdText}
            </Markdown>
        </div>
    );
}

export default About;