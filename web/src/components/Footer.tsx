import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
    footer: {
        color: "#000000",
        backgroundColor: "#cccccc",
        width: "100%",
        padding: 5,
        lineHeight:1.5,
        position: "relative",
        bottom: 0,
        textAlign: "center"
    },
});

const Footer = () => {
    const classes = useStyles();
    return (
        <div className={classes.footer}>
            ソースコードは&nbsp;
            <a
                href="https://github.com/yashikota/oit-syllabus"
                target="_blank"
                rel="noreferrer" >
                こちら
            </a>
            &nbsp;で公開してます
            <br />
            Contributed by&nbsp;
            <a
                href="https://github.com/yashikota"
                target="_blank"
                rel="noreferrer">
                yashikota
            </a>
            <br />
            2022/1/21 時点での&nbsp;
            <a
                href="https://www.portal.oit.ac.jp/CAMJWEB/slbssrch.do"
                target="_blank"
                rel="noreferrer">
                大阪工業大学公式シラバス
            </a>
            &nbsp;のデータに基づきます
            <br />
            <a
                href="https://github.com/yashikota/oit-syllabus/blob/master/web/public/hyouki.txt"
                target="_blank"
                rel="noreferrer">
                知的財産の表記
            </a>
        </div>
    )

};

export default Footer;