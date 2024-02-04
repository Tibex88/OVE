    import getters from './getters'
import mutations from './mutations'

export default {
    // namespaced: true,
    state() {
        return {
            transcript: null,
        }
    },
    getters,
    mutations,
}