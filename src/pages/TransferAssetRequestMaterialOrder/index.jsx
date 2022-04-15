import React from 'react'
import HeaderChanger from '@app/components/cardheader/HeaderChanger'
import TARMaterialOrder from '@app/pages/TransferAssetRequestMaterialOrder/TARMaterialOrder'

const indexTARMO = () => {


    return (
        <div>
            <HeaderChanger title="TAR Material Order"/>
            <TARMaterialOrder/>
        </div>
    );
};

export default indexTARMO;