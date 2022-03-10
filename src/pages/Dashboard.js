import React,{useEffect} from 'react';
import SmallBox from '../components/small-box/SmallBox';
import Chart from 'chart.js/auto';



const Dashboard = () => {

    useEffect(() => {
        
    },[])

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-3 col-6">
                    <SmallBox
                        count={0}
                        title="SDR Done"
                        type="info"
                        icon="fas fa-list"
                        navigateTo="/"
                    />
                </div>
                <div className="col-lg-3 col-6">
                    <SmallBox
                        count={0}
                        title="LTR Done"
                        type="success"
                        icon="fas fa-list"
                        navigateTo="/"
                    />
                </div>
                <div className="col-lg-3 col-6">
                    <SmallBox
                        count={0}
                        title="PMR Done"
                        type="warning"
                        icon="fas fa-list"
                        navigateTo="/"
                    />
                </div>
                <div className="col-lg-3 col-6">
                    <SmallBox
                        count={0}
                        title="Order Rejection"
                        type="danger"
                        icon="fas fa-list"
                        navigateTo="/"
                    />
                </div>
            </div>
        </div>
        
    );
};

export default Dashboard;
