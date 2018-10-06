import React from 'react';
import {Box, Button} from 'grommet';
import { Filter } from 'grommet-icons';

const FilterControl = () => (
    <Box justify='center' margin='small'>
        <Button
            onClick={() => {}}
            icon={<Filter />}
            plain={true}
        />
    </Box>
);

export default FilterControl;