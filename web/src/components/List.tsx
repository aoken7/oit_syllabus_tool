import type { FC } from "react";
import type { Syllabus } from "../types/syllabus";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

export const List: FC<Syllabus> = props => {
    const { kougi, nenji, kikan, numbering, tantousya, link } = props;
    return (
        <p>
            {kougi},
            {nenji}年次,
            {kikan},
            {numbering},
            {tantousya},
            <Stack spacing={10} direction="row">
                <Button variant="outlined" color="info" size="small" href={link} target="_balnk">
                    公式シラバス
                </Button>
            </Stack>
        </p >
    );
};