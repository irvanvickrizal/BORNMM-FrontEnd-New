import React from 'react'
import HeaderChanger from '@app/components/cardheader/HeaderChanger'
import SDRLTRMaterialOrder from '@app/pages/SDRLTRMaterialOrder/SDRLTRMaterialOrder'

const indexSDRLTRMO = () => {
    return (
        <div>
            <HeaderChanger title="SDR LTR Material Order"/>
            <SDRLTRMaterialOrder/>
        </div>
    );
};

export default indexSDRLTRMO;