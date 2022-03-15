import React, {useState, useEffect, useCallback, createContext} from "react"
import {Route, Switch} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import {Gatekeeper} from "gatekeeper-client-sdk"
import {loadUser, logoutUser} from "@store/reducers/auth"
import {toggleSidebarMenu} from "@app/store/reducers/ui"

import Dashboard from "@pages/Dashboard"
import Blank from "@pages/Blank"
import SubMenu from "@pages/SubMenu"
import Profile from "@pages/profile/Profile"
import mMaterialCategory from "@pages/mMaterialCategory/mMaterialCategory"
import mSubMaterialCategory from "@pages/mSubMaterialCategory/mSubMaterialCategory"
import mMaterial from "@pages/mMaterial/mMaterial"
import mDeliveryType from "@pages/mDeliveryType/MDeliveryType"
import mOrderType from "@pages/mOrderType/MOrderType"
import mDOP from "@pages/mDOP/mDOP"
import mScope from "@pages/mScope/mScope"
import mDOP2 from "../../pages/dop2/index"
import Scope2 from "@app/pages/scope2/scope2"
import POCreation from "@pages/POCreation/POCreation"
import POScope from "@pages/POScope/POScope"
import siteCondition from "../../pages/mSiteCondition/mSiteCondition"
import ScopeOrderType from "@app/pages/mScopeOrderType/index"
// import mMaterialCategory from '@pages/mMaterialCategory/mordertype';
// import mMaterialCategory from '@pages/mMaterialCategory/mMaterialCategory';

import Header from "./header/Header"
import Footer from "./footer/Footer"
import MenuSidebar from "./menu-sidebar/MenuSidebar"
import PageLoading from "../../components/page-loading/PageLoading"
import CardHeader from "../../components/cardheader/cardheader"
import WorkFlow from "@app/pages/mWorkFlow/index"
import SiteListDeliveryRequestType from "@app/pages/siteListDeliveryRequestType/index"
import DismantleForm from "@app/pages/siteListDeliveryRequestType/DismantleForm"
import DismantleFormEdit from "@app/pages/siteListDeliveryRequestType/DismantleFormEdit"
import MaterialOrder from "@app/pages/siteListDeliveryRequestType/MaterialOrder"
import LogisticForm from "@app/pages/siteListDeliveryRequestType/LogistikForm"
import Logistic from "@app/pages/siteListDeliveryRequestType/Logistic"
import TableAproval from "@app/pages/approvel/tableAproval"
import AprovalTaskPendingForm from "../../pages/approvel/aprovalTaskPendingForm"
import OrderRequestDraft from "../../pages/orderRequestDraft/orderRequestDraft"

const Main = () => {
    const dispatch = useDispatch()
    const isSidebarMenuCollapsed = useSelector(
        (state) => state.ui.isSidebarMenuCollapsed
    )

    const screenSize = useSelector((state) => state.ui.screenSize)
    const [isAppLoaded, setIsAppLoaded] = useState(false)

    const handleToggleMenuSidebar = () => {
        dispatch(toggleSidebarMenu())
    }

    const fetchProfile = async () => {
        try {
            //const response = await Gatekeeper.getProfile();
            //dispatch(loadUser(response));
            setIsAppLoaded(true)
        } catch (error) {
            dispatch(logoutUser())
            setIsAppLoaded(true)
        }
    }

    useEffect(() => {
        document.getElementById("root").classList.remove("register-page")
        document.getElementById("root").classList.remove("login-page")
        document.getElementById("root").classList.remove("hold-transition")

        document.getElementById("root").classList.add("sidebar-mini")
        document.getElementById("root").classList.add("layout-fixed")

        fetchProfile()
        return () => {
            document.getElementById("root").classList.remove("sidebar-mini")
            document.getElementById("root").classList.remove("layout-fixed")
        }
    }, [])

    useEffect(() => {
        document.getElementById("root").classList.remove("sidebar-closed")
        document.getElementById("root").classList.remove("sidebar-collapse")
        document.getElementById("root").classList.remove("sidebar-open")
        if (isSidebarMenuCollapsed && screenSize === "lg") {
            document.getElementById("root").classList.add("sidebar-collapse")
        } else if (isSidebarMenuCollapsed && screenSize === "xs") {
            document.getElementById("root").classList.add("sidebar-open")
        } else if (!isSidebarMenuCollapsed && screenSize !== "lg") {
            document.getElementById("root").classList.add("sidebar-closed")
            document.getElementById("root").classList.add("sidebar-collapse")
        }
    }, [screenSize, isSidebarMenuCollapsed])

    const getAppTemplate = useCallback(() => {
        if (!isAppLoaded) {
            return <PageLoading />
        }
        return (
            <>
                <Header toggleMenuSidebar={handleToggleMenuSidebar} />
                <MenuSidebar />
                <div className="content-wrapper">
                    <div className="pt-3" />
                    <section className="content">
                        <div className="container-fluid">
                            <div className="card">
                                <div className="card-header">
                                    {/* <h3 className="card-title"> </h3> */}
                                    <CardHeader />
                                    <div className="card-tools">
                                        {/* <button
                                            type="button"
                                            className="btn btn-tool"
                                            data-widget="collapse"
                                            data-toggle="tooltip"
                                            title="Collapse"
                                        >
                                            <i className="fa fa-minus" />
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-tool"
                                            data-widget="remove"
                                            data-toggle="tooltip"
                                            title="Remove"
                                        >
                                            <i className="fa fa-times" />
                                        </button> */}
                                    </div>
                                </div>
                                <div className="card-body">
                                    <Switch>
                                        <Route
                                            exact
                                            path="/sub-menu-2"
                                            component={Blank}
                                        />
                                        <Route
                                            exact
                                            path="/sub-menu-1"
                                            component={SubMenu}
                                        />
                                        <Route
                                            exact
                                            path="/blank"
                                            component={Blank}
                                        />
                                        <Route
                                            exact
                                            path="/profile"
                                            component={Profile}
                                        />
                                        <Route
                                            exact
                                            path="/"
                                            component={Dashboard}
                                        />
                                        <Route
                                            exact
                                            path="/master/materialcategory"
                                            component={mMaterialCategory}
                                        />
                                        <Route
                                            exact
                                            path="/master/submaterialcategory"
                                            component={mSubMaterialCategory}
                                        />
                                        <Route
                                            exact
                                            path="/master/material"
                                            component={mMaterial}
                                        />
                                        <Route
                                            exact
                                            path="/master/deliverytype"
                                            component={mDeliveryType}
                                        />
                                        <Route
                                            exact
                                            path="/master/ordertype"
                                            component={mOrderType}
                                        />
                                        <Route
                                            exact
                                            path="/master/dop"
                                            component={mDOP}
                                        />
                                        <Route
                                            exact
                                            path="/master/dop2"
                                            component={mDOP2}
                                        />
                                        <Route
                                            exact
                                            path="/master/scope2"
                                            component={Scope2}
                                        />
                                        <Route
                                            exact
                                            path="/master/scope"
                                            component={mScope}
                                        />
                                        <Route
                                            exact
                                            path="/po/creation"
                                            component={POCreation}
                                        />
                                        <Route
                                            exact
                                            path="/po/scope"
                                            component={POScope}
                                        />
                                        <Route
                                            exact
                                            path="/master/sitecondition"
                                            component={siteCondition}
                                        />
                                        <Route
                                            exact
                                            path="/master/scopeordertype"
                                            component={ScopeOrderType}
                                        />
                                        <Route
                                            exact
                                            path="/master/workflow"
                                            component={WorkFlow}
                                        />
                                        <Route
                                            exact
                                            path="/mm/sitelistdr"
                                            component={
                                                SiteListDeliveryRequestType
                                            }
                                        />
                                        <Route
                                            exact
                                            path="/sitelist/dismantleedit/"
                                            component={DismantleFormEdit}
                                        />
                                        <Route
                                            exact
                                            path="/sitelist/sitedetail/"
                                            component={DismantleForm}
                                        />
                                        <Route
                                            exact
                                            path="/sitelist/materialorder/"
                                            component={MaterialOrder}
                                        />
                                        <Route
                                            exact
                                            path="/sitelist/logistikform/"
                                            component={LogisticForm}
                                        />
                                        <Route
                                            exact
                                            path="/sitelist/logistic/"
                                            component={Logistic}
                                        />
                                        <Route
                                            exact
                                            path="/sitelist/aprovaltaskpending/"
                                            component={TableAproval}
                                        />
                                        <Route
                                            exact
                                            path="/sitelist/aprovaltaskpendingform/"
                                            component={AprovalTaskPendingForm}
                                        />
                                        <Route
                                            exact
                                            path="/mm/orderrequestdraft/"
                                            component={OrderRequestDraft}
                                        />
                                    </Switch>
                                </div>
                                <div className="card-footer"></div>
                            </div>
                        </div>
                    </section>
                </div>
                <Footer />
                <div
                    id="sidebar-overlay"
                    role="presentation"
                    onClick={handleToggleMenuSidebar}
                    onKeyDown={() => {}}
                />
            </>
        )
    }, [isAppLoaded])

    return <div className="wrapper">{getAppTemplate("test")}</div>
}

export default Main
