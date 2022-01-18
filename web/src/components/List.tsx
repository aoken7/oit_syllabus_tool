import type { FC } from "react";
import type { Syllabus } from "../types/syllabus";
import Button from "@mui/material/Button";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export const List: FC<Syllabus> = props => {
    const { kougi, nenji, kikan, numbering, tantousya, link } = props;
    return (
        <>
            <TableContainer component={Paper} >
                <Table sx={{ minWidth: 650 }} arial-label="Syllabus">
                    <TableHead>
                        <TableRow>
                            <TableCell>講義名</TableCell>
                            <TableCell>年次</TableCell>
                            <TableCell>期間</TableCell>
                            <TableCell>ナンバリング</TableCell>
                            <TableCell>担当者</TableCell>
                            <TableCell>URL</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>{kougi}</TableCell>
                            <TableCell>{nenji}</TableCell>
                            <TableCell>{kikan}</TableCell>
                            <TableCell>{numbering}</TableCell>
                            <TableCell>{tantousya}</TableCell>
                            <TableCell>
                                <Button variant="contained" color="info" size="small" href={link} target="_balnk">
                                    公式シラバス
                                </Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer >
        </>
    );
};