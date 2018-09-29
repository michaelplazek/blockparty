import React from 'react';
import { Box } from 'grommet';
import moment from 'moment';

import List from "../components/List";

const Market = () => (
    <Box>
        <List items={
            [
                {amount: '$700', owner: 'Rich', price: '$6,657.78', timestamp: moment().format('M D')}
            ]
        }
        />
    </Box>
);

export default Market;