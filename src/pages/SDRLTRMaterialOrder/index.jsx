import React from 'react'
import HeaderChanger from '@app/components/cardheader/HeaderChanger'
import MaterialOrder from '@app/pages/SDRLTRMaterialOrder/MaterialOrder'

const indexSDRLTRMO = () => {
    return (
        <div>
            <HeaderChanger title="SDR LTR Material Order"/>
            <MaterialOrder/>
        </div>
    );
};

export default indexSDRLTRMO;