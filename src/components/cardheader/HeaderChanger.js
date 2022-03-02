import React from 'react';
import {useDispatch} from 'react-redux';
import {setCardTitle} from '@store/reducers/pagetext';


const HeaderChanger = ({title}) => {
    const dispatch = useDispatch(setCardTitle(title));
    
    dispatch(setCardTitle(title));
    return (
        null
    );
};

export default HeaderChanger;