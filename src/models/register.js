import { register } from '../services/api';
import { setAuthority } from '../utils/authority';
import { reloadAuthorized } from '../utils/Authorized';

export default {
  namespace: 'register',

  state: {
    status: undefined,
  },

  effects: {
    *submit({ payload }, { call, put }) {
      const response = yield call(register, payload);
      yield put({
        type: 'registerHandle',
        payload: response,
      });
      // TODO: Redirect to success page.
      // if(response.status === 'ok') {
      //   reloadAuthorized();
      //   yield put(routerRedux.push('/'));
      //   // yield put(routerRedux.push('/user/register-result'))
      // }
    },
  },

  reducers: {
    registerHandle(state, { payload }) {
      // TODO: Define authority level
      setAuthority('user');
      reloadAuthorized();
      return {
        ...state,
        status: payload.status,
      };
    },
  },
};
