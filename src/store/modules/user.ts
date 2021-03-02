/**
 * 系统用户信息状态
 */
const state = () => ({
  userInfo: {},
  token: 'token',
});
const getters = {};
const mutations = {};
const actions = {};

const user = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};

export default user;
