import React, {Component,useState,useEffect} from 'react';

const MasterMaterial = (materialId,materialCode,materialName,uom,itemLevel,itemLevelId,subCategory,subCategoryId,category,isActive) => {
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
        subCategoryId: subCategoryId
    }
    return datas;
}


const DGMasterMaterial = {
    MasterMaterial
}

export default DGMasterMaterial;