export default {
    saveSubtitle(state, payload){
        console.log(payload);
        state.subtitle = payload
        window.localStorage.subtitle=JSON.stringify(payload)
        // window.localStorage.subtitle=(payload)
    },
    saveSubtitle2(state, payload){
        console.log(payload);
        state.subtitle2 = payload
        window.localStorage.subtitle2=JSON.stringify(payload)
        // window.localStorage.subtitle2=(payload)
    },
    updateSubtitle(state,payload){
        state.subtitle[payload.index].text= payload.value;
        window.localStorage.subtitle=JSON.stringify(state.subtitle)
    },
    updateSpeaker(state,payload){
        state.subtitle[payload.index]['by']= payload.value;
        window.localStorage.subtitle=JSON.stringify(state.subtitle)
    }
}