export default {
    saveSubtitle(state, payload){
        state.subtitle = payload
        // console.log({payload});
        window.localStorage.subtitle=JSON.stringify(payload)
    },
}