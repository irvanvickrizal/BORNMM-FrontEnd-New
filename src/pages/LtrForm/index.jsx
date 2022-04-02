import React from 'react'
import HeaderChanger from '@app/components/cardheader/HeaderChanger'
import LtrForm from '@app/pages/LtrForm/LtrForm'

export default function index() {
    return (
        <div>
            <HeaderChanger title="LTR Form"/>
            <LtrForm/>
        </div>
    )
}
