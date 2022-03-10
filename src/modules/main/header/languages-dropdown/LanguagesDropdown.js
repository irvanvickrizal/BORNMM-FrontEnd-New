/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-plusplus */
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Dropdown} from '@components';
import { useSelector } from 'react-redux';




const LanguagesDropdown = () => {
//    const user = useSelector(state => state)
    var today = new Date()
    var curHr = today.getHours()
    const dataUser = useSelector(state=>state.auth.user.name)

    return (
        <div style={{marginTop:'12px',marginRight:'16px'}}>
            {curHr >= 4 && curHr <= 12 ? (<p style={{fontWeight:"500"}}>{`Good Morning ${dataUser}`}</p>)
                :curHr <= 18 && curHr >= 12 ? (<p style={{fontWeight:"500"}}>{`Good Afternoon ${dataUser}`}</p>)
                    :curHr >= 18 && curHr <= 24 ? (<p style={{fontWeight:"500"}}>{`Good Evening ${dataUser}`}</p>)
                        :(<><p style={{fontWeight:"500"}}>{`Good Night ${dataUser}`}</p></>)
            }
        </div> 
    );
};

export default LanguagesDropdown;
