import React from 'react';
import { Box, Button, FormField, TextInput } from 'grommet';
import FilterControl from './FilterControl';

const Taskbar = () => (
    <Grid justify='between' direction='row' background='dark-4'>
        <Box margin='small'>
            <FormField>
                <TextInput size='small' placeholder='Search...'/>
            </FormField>
        </Box>
        <FilterControl size={10} />
    </Grid>
);

export default Taskbar;