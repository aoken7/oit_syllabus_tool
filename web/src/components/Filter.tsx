import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function Filter() {

    const [area, setArea] = React.useState('');
    const handleChange = (event: SelectChangeEvent) => {
        setArea(event.target.value);
    };

    return (
        <>
            <FormControl sx={{ m: 3, minWidth: 120 }}>
                <InputLabel id="Area">学部/学科</InputLabel>
                <Select
                    labelId="Area"
                    id="Area"
                    value={area}
                    onChange={handleChange}
                    autoWidth
                    label="Area"
                    //disabled={true}
                >
                    <MenuItem value="">
                        <em>指定しない</em>
                    </MenuItem>
                    <MenuItem value={1}>情報科学</MenuItem>
                    <MenuItem value={2}>工学</MenuItem>
                    <MenuItem value={3}>都市デザイン</MenuItem>
                    <MenuItem value={4}>建築</MenuItem>
                    <MenuItem value={5}>機械</MenuItem>
                    <MenuItem value={6}>電気電子</MenuItem>
                    <MenuItem value={7}>電子情報</MenuItem>
                    <MenuItem value={8}>応用化学</MenuItem>
                    <MenuItem value={9}>環境</MenuItem>
                    <MenuItem value={10}>生命</MenuItem>
                    <MenuItem value={11}>RD</MenuItem>
                    <MenuItem value={12}>ロボット</MenuItem>
                    <MenuItem value={13}>システムデザイン</MenuItem>
                    <MenuItem value={14}>空間デザイン</MenuItem>
                    <MenuItem value={14}>知的財産</MenuItem>
                </Select>
            </FormControl>
            <FormControl component="fieldset" sx={{ m: 1 }}>
                <FormLabel component="legend">年次</FormLabel>
                <FormGroup aria-label="position" row>
                    <FormControlLabel
                        sx={{ m: 0}}
                        value="top"
                        control={<Checkbox />}
                        label="1"
                        labelPlacement="top" />
                    <FormControlLabel
                        sx={{ m: 0 }}
                        value="top"
                        control={<Checkbox />}
                        label="2"
                        labelPlacement="top" />
                    <FormControlLabel
                        sx={{ m: 0 }}
                        value="top"
                        control={<Checkbox />}
                        label="3"
                        labelPlacement="top" />
                    <FormControlLabel
                        sx={{ m: 0 }}
                        value="top"
                        control={<Checkbox />}
                        label="4"
                        labelPlacement="top" />
                </FormGroup>
            </FormControl>
            <FormControl component="fieldset" sx={{ m: 1 }}>
                <FormLabel component="legend">期間</FormLabel>
                <FormGroup aria-label="position" row>
                    <FormControlLabel
                        sx={{ m: 0 }}
                        value="top"
                        control={<Checkbox />}
                        label="前期"
                        labelPlacement="top" />
                    <FormControlLabel
                        sx={{ m: 0 }}
                        value="top"
                        control={<Checkbox />}
                        label="後期"
                        labelPlacement="top" />
                    <FormControlLabel
                        sx={{ m: 0 }}
                        value="top"
                        control={<Checkbox />}
                        label="その他"
                        labelPlacement="top" />
                </FormGroup>
            </FormControl>
            <FormControl component="fieldset" sx={{ m: 1 }}>
                <FormLabel component="legend">単位</FormLabel>
                <FormGroup aria-label="position" row>
                    <FormControlLabel
                        sx={{ m: 0 }}
                        value="top"
                        control={<Checkbox />}
                        label="1"
                        labelPlacement="top"
                    />
                    <FormControlLabel
                        sx={{ m: 0 }}
                        value="top"
                        control={<Checkbox />}
                        label="2"
                        labelPlacement="top"
                    />
                    <FormControlLabel
                        sx={{ m: 0 }}
                        value="top"
                        control={<Checkbox />}
                        label="3以上"
                        labelPlacement="top"
                    />
                </FormGroup>
            </FormControl>
        </>
    );
}