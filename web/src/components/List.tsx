import Button from "@mui/material/Button";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import datas from "../data.json"

export default function List() {
    return (
        <TableContainer component={Paper} >
            <Table sx={{ minWidth: 650 }} arial-label="Syllabus">
                <TableHead>
                    <TableRow>
                        <TableCell>講義名</TableCell>
                        <TableCell>年次</TableCell>
                        <TableCell>期間</TableCell>
                        <TableCell>担当者</TableCell>
                        <TableCell>ナンバリング</TableCell>
                        <TableCell>URL</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {datas.map(data => (
                        <TableRow>
                            <TableCell>{data.kougi}</TableCell>
                            <TableCell>{data.nenji}</TableCell>
                            <TableCell>{data.kikan}</TableCell>
                            <TableCell>{data.tantousya}</TableCell>
                            <TableCell>{data.numbering}</TableCell>
                            <TableCell>
                                <Button variant="contained" color="primary" size="small" href={data.link} target="_balnk">
                                    公式シラバス
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer >
    );
};