import React, {Component,useState,useEffect} from 'react';

const MasterMaterial = (materialId,materialCode,materialName,uom,itemLevel,itemLevelId,subCategory,subCategoryId,category,isActive,boqRefCheck,isCustomerMaterial,isReusable,customerCode) => {
    const datas = {
        materialId: materialId,
        materialCode: materialCode,
        materialName: materialName,
        uom: uom,
        itemLevel: itemLevel,
        subCategory: subCategory,
        category: category,
        isActive: isActive,
        itemLevelId: itemLevelId,
        subCategoryId: subCategoryId,
        boqRefCheck: boqRefCheck,
        isReusable:isReusable,
        customerCode:customerCode,
        isCustomerMaterial: isCustomerMaterial
    }
    return datas;
}


const DGMasterMaterial = {
    MasterMaterial
}

export default DGMasterMaterial;