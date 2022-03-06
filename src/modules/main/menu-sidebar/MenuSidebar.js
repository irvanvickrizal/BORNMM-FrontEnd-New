import React,{useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {MenuItem} from '@components';
import API  from '../../../utils/apiServices';

export const MENU = [
    {
        name: 'menusidebar.label.poManagement',
        icon: 'fa-cogs',
        children: [
            {
                name: 'menusidebar.label.poCreation',
                path: '/po/creation'
            },
            {
                name: 'menusidebar.label.poScope',
                path: '/po/scope'
            },
            {
                name: 'menusidebar.label.poSitelist',
                path: '/po/sitelist'
            },
            {
                name: 'menusidebar.label.poCustomer',
                path: '/po/customer'
            }
        ]
    },
    {
        name: 'menusidebar.label.masterSetting',
        icon: 'fa-cogs',
        children: [
            {
                name: 'menusidebar.label.mMaterialCategory',
                path: '/master/materialcategory'
            },
            {
                name: 'menusidebar.label.mSubMaterialCategory',
                path: '/master/submaterialcategory'
            },
            {
                name: 'menusidebar.label.mMaterial',
                path: '/master/material'
            },
            {
                name: 'menusidebar.label.mOrderType',
                path: '/master/ordertype'
            },
            {
                name: 'menusidebar.label.mDeliveryType',
                path: '/master/deliverytype'
            },
            {
                name: 'menusidebar.label.mDOP',
                path: '/master/dop'
            },
            {
                name: 'menusidebar.label.mScope',
                path: '/master/scope'
            },
            {
                name: 'menusidebar.label.mDOP2',
                path: '/master/dop2'
            },
            {
                name: 'menusidebar.label.mScope2',
                path: '/master/scope2'
            },
        ]
    }
];

const MenuSidebar = () => {
    const user = useSelector((state) => state.auth.user);

    const [menu, setMenu] = useState([]);

    const menuapi=(id)=> {
        API.getMenu(id).then(
            result=>{
                console.log('i menu',result)
                setMenu(result);
            }
        );
    } 

    useEffect(() => {
        menuapi(user.roleId);
    },[])



    return (
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
            <Link to="/" className="brand-link">
                <img
                    src="/img/logo.png"
                    alt="AdminLTE Logo"
                    className="brand-image img-circle elevation-3"
                    style={{opacity: '.8'}}
                />
                <span className="brand-text font-weight-light">BORN</span>
            </Link>
            <div className="sidebar">
                <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                    <div className="image">
                        <img
                            src='/img/default-profile.png'
                            className="img-circle elevation-2"
                            alt="User"
                        />
                    </div>
                    <div className="info">
                        <Link to="/profile" className="d-block">
                            {user.email}
                        </Link>
                    </div>
                </div>
                <nav className="mt-2" style={{overflowY: 'hidden'}}>
                    <ul
                        className="nav nav-pills nav-sidebar flex-column"
                        role="menu"
                    >
                        {menu.map((menuItem) => (
                            <MenuItem key={menuItem.name} menuItem={menuItem} />
                        ))}
                    </ul>
                </nav>
            </div>
        </aside>
    );
};

export default MenuSidebar;
