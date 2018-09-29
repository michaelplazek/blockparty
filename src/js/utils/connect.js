import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import compose from 'lodash/fp/compose';
import mapValues from 'lodash/fp/mapValues';

const defaultSelector = () => false;

const mapActions = map => dispatch =>
    bindActionCreators(map, dispatch);

const mapSelectors = map => (...args) =>
    compose(
        mapValues(item => (item || defaultSelector)(...args)),
    )(map);

const mapper = (propMap, actionMap, ...rest) => {
    const mapStateToProps = typeof propMap === 'object' ?
        mapSelectors(propMap) : propMap;
    const mapDispatchToProps = typeof actionMap === 'object' ?
        mapActions(actionMap) : actionMap;
    return connect(
        mapStateToProps,
        mapDispatchToProps,
        ...rest
    )
};

export default mapper;