import { all } from "redux-saga/effects";
import { SagaAuthWorker } from "@app/store/saga/auth";
import { SagaDopWorker } from "@app/store/saga/dopSaga";
import { SagaScopeWorker } from "@app/store/saga/scopeSaga";

export function* allSaga() {
    yield all([SagaAuthWorker(),SagaDopWorker(),SagaScopeWorker()]);
}
