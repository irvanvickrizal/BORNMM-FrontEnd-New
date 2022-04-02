import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {ContentHeader, Button} from '@components';
import ActivityTab from './ActivityTab';
import TimelineTab from './TimelineTab';
import SettingsTab from './SettingsTab';
import {useDispatch, useSelector} from 'react-redux';

import HeaderChanger from '@app/components/cardheader/HeaderChanger'

const Profile = () => {
    
    const [activeTab, setActiveTab] = useState('SETTINGS');
    const [t] = useTranslation();
    const user = useSelector((state) => state.auth.user);
    const toggle = (tab) => {
        if (activeTab !== tab) setActiveTab(tab);
    };

    return (
        <>
            <HeaderChanger title="Profile"/>
            <ContentHeader title="Profile" />
            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-3">
                            <div className="card card-primary card-outline">
                                <div className="card-body box-profile">
                                    <div className="text-center">
                                        <img
                                            className="profile-user-img img-fluid img-circle"
                                            src="/img/default-profile.png"
                                            alt="User profile"
                                        />
                                    </div>
                                    <h3 className="profile-username text-center">
                                        {user.name}
                                    </h3>
                                    <p className="text-muted text-center">
                                        {user.email}
                                    </p>
                                </div>
                                {/* /.card-body */}
                            </div>
                        </div>
                        <div className="col-md-9">
                            <div className="card">
                                <div className="card-header p-2">
                                    <ul className="nav nav-pills">
                                        <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`nav-link ${
                                                    activeTab === 'SETTINGS'
                                                        ? 'active'
                                                        : ''
                                                }`}
                                                onClick={() =>
                                                    toggle('SETTINGS')
                                                }
                                            >
                                                {t('main.label.settings')}
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                                <div className="card-body">
                                    <div className="tab-content">
                                        <ActivityTab
                                            isActive={activeTab === 'ACTIVITY'}
                                        />
                                        <TimelineTab
                                            isActive={activeTab === 'TIMELINE'}
                                        />
                                        <SettingsTab
                                            isActive={activeTab === 'SETTINGS'}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Profile;
