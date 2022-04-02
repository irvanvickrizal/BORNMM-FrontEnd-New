import React from 'react';
import {Link} from 'react-router-dom';

import {Button} from '@components';
import {useDispatch, useSelector} from 'react-redux';

const SettingsTab = ({isActive}) => {


    const user = useSelector((state) => state.auth.user);

    return (
        <div className={`tab-pane ${isActive ? 'active' : ''}`}>
            <form className="form-horizontal">
                <div className="form-group row">
                    <label
                        htmlFor="inputName"
                        className="col-sm-2 col-form-label"
                    >
                        Name
                    </label>
                    <div className="col-sm-10">
                        <input
                            type="email"
                            className="form-control"
                            id="inputName"
                            value={user.name}
                            disabled
                        />
                    </div>
                </div>
                <div className="form-group row">
                    <label
                        htmlFor="inputEmail"
                        className="col-sm-2 col-form-label"
                    >
                        Email
                    </label>
                    <div className="col-sm-10">
                        <input
                            type="email"
                            className="form-control"
                            id="inputEmail"
                            value={user.email}
                            disabled
                        />
                    </div>
                </div>
                <div className="form-group row">
                    <label
                        htmlFor="inputName2"
                        className="col-sm-2 col-form-label"
                    >
                        Phone Number
                    </label>
                    <div className="col-sm-10">
                        <input
                            type="text"
                            className="form-control"
                            id="inputName2"
                            placeholder="Phone Number"
                        />
                    </div>
                </div>
                <div className="form-group row">
                    <div className="offset-sm-2 col-sm-10 col-md-3">
                        <Button type="submit" theme="success">
                            Change Password
                        </Button>
                    </div>
                    <div className="col-sm-10 col-md-3">
                        <Button type="submit" theme="primary" >
                           Save
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default SettingsTab;
