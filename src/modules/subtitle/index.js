    import getters from './getters'
import mutations from './mutations'

export default {
    // namespaced: true,
    state() {
        return {
            subtitles: [],
            subtitle:null,
            subtitle2:null,
        }
    },
    getters,
    mutations,
}