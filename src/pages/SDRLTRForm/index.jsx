import React from 'react'
import HeaderChanger from '@app/components/cardheader/HeaderChanger'
import SDRLTRForm from '@app/pages/SDRLTRForm/SDRLTRForm'

const index = () => {


    return (
        <div>
            <HeaderChanger title="SDR LTR Form"/>
            <SDRLTRForm/>
        </div>
    );
};

export default index;