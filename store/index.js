import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		/**
		 * 是否需要强制登录
		 */
		forcedLogin: false,
		hasLogin: false,
		userName: '',
		avatarUrl: '',
		token: '',
		gender: 0
	},
	mutations: {
		login(state, provider) {
			console.log('state: %s', JSON.stringify(state))
			console.log('provider: %s', JSON.stringify(provider))
			
			state.userName = provider.nickName || '新用户';
			state.hasLogin = true;
			state.avatarUrl = provider.avatarUrl;
			state.token = provider.token;
			state.gender = provider.gender;
			
		},
		logout(state) {
			state.userName = '';
			state.hasLogin = false;
			state.token = '';
			state.avatarUrl = '';
			state.gender = 0;
		}
	},
	actions:{
		login ( context, provider ) {
			console.log('context, %s', JSON.stringify(context))
			context.commit('login', provider)
		},
		logout (context) {
			context.commit('logout')
		}
	}
})

export default store