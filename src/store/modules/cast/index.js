import getters from './getters'
import mutations from './mutations'

export default {
    // namespaced: true,
    state() {
        return {
            cast: null,
        }
    },
    getters,
    mutations,
}