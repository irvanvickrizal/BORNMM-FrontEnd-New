import { postDataSite } from '@app/store/action/siteConditionAction';
import React,{useState} from 'react'
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux';
import { Button } from '@app/components/index';

export default function Panel() {
    const [isActive,setIsActive] = useState(false);
    const [siteName,setSiteName] = useState('');
    const dispatch = useDispatch()

    const handlePost = () => {
        dispatch(postDataSite({siteName,isActive}))
    }
    return (
        <div className="card-body">
            <div className='row g-3'>
                <div className='col-md-12 '>
                    <div class="input-group mb-3">
                        <span class="input-group-text col-md-3" id="basic-addon1">Site Name </span>
                        <input value={siteName} onChange={(e) => setSiteName(e.target.value)} placeholder='Add Site Name' type="text" class="form-control col-md-9" aria-label="Username" aria-describedby="basic-addon1"/>
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text col-md-3" id="basic-addon1">Is Active </span>
                        <div class="form-control col-md-9">
                            <Form.Check 
                                type="switch"
                                id="isMainCWH"
                                onChange={(e) => setIsActive(e.target.checked)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  
}
