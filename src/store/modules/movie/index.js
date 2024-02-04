import getters from './getters'
import mutations from './mutations'

export default {
    // namespaced: true,
    state() {
        return {
            movie: null,
            syncValue:0,
        }
    },
    getters,
    mutations,
}