import { initDataApi } from "../api/progress";

export default {
  namespace: "progress",
  state: {
    dataSource: {}
  },
  effects: {
    *initData({ payload }, { call, put }) {
      const result = yield call(initDataApi, payload);
      // if (result.status === 200) {
      //   yield put({
      //     type: "initDataSuccess",
      //     dataSource: result.data
      //   });
      // } else {
      //   console.log("error-------", result.message);
      // }
      return result;
    }
  },
  reducers: {
    // initDataSuccess(state, { dataSource }) {
    //   return {
    //     ...state,
    //     dataSource
    //   };
    // }
  }
};
