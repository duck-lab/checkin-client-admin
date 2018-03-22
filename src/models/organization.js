import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { createOrganization } from '../services/api';

export default {
  namespace: 'organization',

  state: {
    status: undefined,
  },

  effects: {
    *submitCreate({ payload }, { call, put }) {
      const response = yield call(createOrganization, payload);
      if (response) {
        yield put(routerRedux.push('/organization/management'));
        message.success('组织创建成功');
      }
    },
  },

  reducers: {},
};
