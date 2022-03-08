import { combineReducers } from "redux";
import { authSlice } from "@app/store/reducers/auth";
import { uiSlice } from "@app/store/reducers/ui";
import { pagetextSlice } from "@app/store/reducers/pagetext";
import { dopSlice } from "@app/store/reducers/dop";
import { scopeSlice } from "@app/store/reducers/scope";
import { dopReducer } from "@app/store/reducers/dopReducer";
import { scopeReducer } from "@app/store/reducers/scopeReducer";
import { poScopeReducer } from "@app/store/reducers/poScopeReducer";
import { siteConditionReducer } from "@app/store/reducers/siteConditionReducer";
import { scopeOrderReducer } from "@app/store/reducers/scopeOrderReducer";
import { workFlowReducer } from "@app/store/reducers/workFlowReducer";

export const allReducer = combineReducers({
    auth: authSlice.reducer,ui: uiSlice.reducer,
    pagetext: pagetextSlice.reducer,
    dop: dopSlice.reducer,
    scope: scopeSlice.reducer,
    dopReducer,
    scopeReducer,
    poScopeReducer,
    siteConditionReducer,
    scopeOrderReducer,
    workFlowReducer
});
