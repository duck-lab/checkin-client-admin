import { fakeRegister } from '../services/api';
import { setAuthority } from '../utils/authority';
import { reloadAuthorized } from '../utils/Authorized';

export default {
  namespace: 'register',

  state: {
    status: undefined,
  },

  effects: {
    *submit(info, { call, put }) {
      const { payload } = info;
      const response = yield call(fakeRegister, payload);
      yield put({
        type: 'registerHandle',
        payload: response,
      });
      // TODO: Redirect to success page.
      // if(response.status === 'ok') {
      //   console.log('>>> in jump')
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
