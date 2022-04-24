import React, {Component,useState,useEffect} from 'react';

const MasterMaterialDownload = (categoryName,subCategory,materialCode,materialName,customerCode,uom,isCustomerMaterial,boqRefCheck,serialRequaired,isReusable,itemLevel,itemLevelId,subCategoryId,isActive) => {
    const datas = {
        categoryName: categoryName,
        subCategory: subCategory,
        materialCode: materialCode,
        materialName: materialName,
        customerCode:customerCode,
        uom: uom,
        isCustomerMaterial: isCustomerMaterial,
        boqRefCheck: boqRefCheck,
        serialRequaired:serialRequaired,
        isReusable:isReusable,
        itemLevel: itemLevel,
       
    
        isActive: isActive,
        itemLevelId: itemLevelId,
        subCategoryId: subCategoryId,
      
  
    
 
    }
    return datas;
}


const DGMasterMaterialDownload = {
    MasterMaterialDownload
}

export default DGMasterMaterialDownload;