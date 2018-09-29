import React from 'react';
import { Box, Heading } from 'grommet';
import PropTypes from 'prop-types';

const PageHeader = ({ title, actionItems }) => (
    <Box justiy='between' direction='row' margin={{ bottom: 'small' }} pad='small'>
        <Heading margin='none'>{title}</Heading>
        {actionItems}
    </Box>
);

PageHeader.propTypes = {
    title: PropTypes.string.isRequired,
    actionItems: PropTypes.array,
};

PageHeader.defaultProps = {
    actionItems: [],
};

export default PageHeader;