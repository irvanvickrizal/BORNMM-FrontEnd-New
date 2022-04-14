import React from 'react'
import HeaderChanger from '@app/components/cardheader/HeaderChanger'
import TARForm from '@app/pages/TransferAssetRequestForm/TransferAssetRequestForm'

const TarIndex = () => {


    return (
        <div>
            <HeaderChanger title="Transfer Asset Request Form"/>
            <TARForm/>
        </div>
    );
};

export default TarIndex;