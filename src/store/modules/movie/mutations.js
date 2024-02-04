export default {
    saveMovie(state, payload){
        state.movie = payload
        // window.localStorage.movie=(payload)
        window.localStorage.movie=JSON.stringify(payload)
    },
    saveSyncValue(state, payload){
        state.syncValue = payload
        // window.localStorage.syncValue=(payload)
        window.localStorage.syncValue=JSON.stringify(payload)
    }
}