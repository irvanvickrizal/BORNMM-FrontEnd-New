import React,{ useContext } from 'react';
import {useSelector} from 'react-redux';


const CardHeader = () => {
    const title = useSelector((state) => state.pagetext.cardHeader);
    return (
        <h2 className="card-title">
            <b>
                {title}
            </b>
        </h2>
    );
};

export default CardHeader;
