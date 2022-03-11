import { all } from "redux-saga/effects";
import { SagaAuthWorker } from "@app/store/saga/auth";
import { SagaDopWorker } from "@app/store/saga/dopSaga";
import { SagaScopeWorker } from "@app/store/saga/scopeSaga";
import { SagaSiteConditionWorker } from "@app/store/saga/siteConditionSaga";
import { SagaScopeOrderWorker } from "@app/store/saga/scopeOrderSaga";
import { SagaWorFlowWorker } from "@app/store/saga/workFLowSaga";
import { SagaSiteListDeliveryWorker } from "@app/store/saga/siteListDeliveryRequestSaga";
import { SagaLogistikFormWorker } from "@app/store/saga/logistikFormSaga";

export function* allSaga() {
    yield all([SagaAuthWorker(),SagaDopWorker(),SagaScopeWorker(),SagaSiteConditionWorker(),SagaScopeOrderWorker(),SagaWorFlowWorker(),SagaSiteListDeliveryWorker(),SagaLogistikFormWorker()]);
}
