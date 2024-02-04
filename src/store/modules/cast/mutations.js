// import cast from "../../"
export default {
    saveCast(state, payload){
        state.cast = payload
        // window.localStorage.cast=(payload)
        window.localStorage.cast=JSON.stringify(payload)
    }
}