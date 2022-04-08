/* eslint-disable prefer-const */
/* eslint-disable prefer-template */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-plusplus */
import React, {useState,useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {Dropdown} from '@components';
import { useSelector } from 'react-redux';
import moment from 'moment';




const LanguagesDropdown = () => {
//    const user = useSelector(state => state)
    var todays = new Date()
    var hr = todays.getHours()
    const dataUser = useSelector(state=>state.auth.user.name)
    // const time = moment().format("hh:mm")
    function checkTime(i) {
        // eslint-disable-next-line prefer-template
        if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
        return i;
    }
    function startTime() {
        const today = new Date();
        let date = today.getDate();
        let h = today.getHours();
        let m = today.getMinutes();
        let s = today.getSeconds();
        m = checkTime(m);
        s = checkTime(s);
        
        document.getElementById('txt').innerHTML =  h + ":" + m + ":" + s;
        setTimeout(startTime, 1000);
    }
    
    const Greeting = ({hours}) =>{
        
        let greetings = "default" 

        if(hours>=0 && hours<12){
            greetings = `Good Morning ${dataUser}`
        }
        else if(hours>=12 && hours<18){
            greetings = `Good afternoon ${dataUser}`
        }
        else if(hours>=18 && hours<=23){
            greetings = `Good evening ${dataUser}`
        }

        return greetings
    }

    const GetDate = () =>{
        const today = new Date();
        return moment(today).format("DD-MM-YYYY")
    }

    useEffect(() => {
        startTime()
    }, [])

    return (
        <div style={{marginTop:'12px',marginRight:'10px'}}>
            {/* {curHr >= 4 && curHr <= 12 ? (<p style={{fontWeight:"500"}}>{`Good Morning ${dataUser}`}<div id="txt"></div></p>)
                :curHr <= 18 && curHr >= 12 ? (<p style={{fontWeight:"500"}}>{`Good Afternoon ${dataUser}`}<div id="txt"></div></p>)
                    :curHr >= 18 && curHr <= 24 ? (<p style={{fontWeight:"500"}}>{`Good Evening ${dataUser}`}<div id="txt"></div></p>)
                        :(<><p style={{fontWeight:"500"}}>{`Good Evening ${dataUser}`}<div id="txt"></div></p></>)
            } */}
            <div className='row'>
                <div className='col-md-12'>
                    <Greeting hours={hr}/>
                    <div id="txt"></div>
                </div>
            </div>
        </div> 
    );
};

export default LanguagesDropdown;
