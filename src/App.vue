<template>

 <div class="full-grid">
    <div id="item-1" class="bg-blueGray border ">
      <ActionPanel :art="art" v-model:subtitle="subtitle" />
      <VideoPlayer
        class="video_player"
        :art="art"
        :style="style"
        url="./assets/movie/1.mp4"
        :class="m-auto"
      />
    </div>
    <div id="item-2" class="bg-blueGray border">
      <!-- <ActionPanel /> -->
      <ScriptViewerVue v-model:subtitle="subtitle" />
    </div>
    <div id="resizer"></div>
    <div id="item-3" class="bg-blueGray border">
      <!-- <ActionPanel /> -->
      <EditorTableVue 
        :art="art"
        v-model:subtitle="subtitle"
        :subtitle2="subtitle2" />
      
    </div>
 </div>

</template>

<script setup>
import ActionPanel from './components/actionpanel.vue';
import VideoPlayer from './components/VideoPlayer.vue';
import EditorTableVue from "./components/EditorTable.vue";
import ScriptViewerVue from "./components/ScriptViewer.vue";

import { fromVtt } from './assets/js';
import { onMounted,computed, } from 'vue';
import {useStore} from 'vuex'

import srt from "./assets/srt"; //dev data
import srt2 from "./assets/srt2"; //dev data
import casts from "./assets/cast"; //dev data

  // setup(props){
const store =useStore();
// let casts;
// let srt;
// let srt2;
let style={ width: "100%", height: "400px" }
let art= null
let subObj = null;
let srtParser;
let vvtParser;
let isDragging = false;
// let style = { width = "100%", height: "400px" };
let multiple= [
  {
    keyCode: 65,
    modifiers: ["shiftKey"],
    preventDefault: true,
  },
]
  // };
  // setup(){
  // }
 function  toSubtitle(srt) {
      try {
        let subtitle = fromVtt(srt);
        return subtitle;
      } catch (err) {
        console.log(err);
      }
    }
onMounted(() => {
  // console.log(1)
  // let subtitle = JSON.parse(window.localStorage.getItem("subtitle"));
  // let subtitle2 = JSON.parse(localStorage.getItem("subtitle2"));
  // let cast = JSON.parse(localStorage.getItem("cast"));
  // let movie = JSON.parse(localStorage.getItem("movie"));

  // if (subtitle && subtitle instanceof Object) {
  //   console.log("is instance of object");
  //   store.commit("saveSubtitle", JSON.stringify(subtitle));
  // } else {
    store.commit("saveSubtitle", toSubtitle(srt)); //def data
  // }

  // if (subtitle2 && subtitle2 instanceof Object) {
  //   console.log("is instance of object");
  //   store.commit("saveSubtitle2", subtitle2);
  // } else {
    store.commit("saveSubtitle2", toSubtitle(srt2)); //def data
  // }

  // if (cast && cast instanceof Array) {
  //   console.log("is instance of array");
  //   store.commit("saveCast", cast);
  // } else {
    store.commit("saveCast", casts); //def data
  // }

  // if (movie) {
  //   console.log("is instance of string");
  //   store.commit("saveMovie", movie);
  // } else {
    store.commit("saveMovie", "./src/assets/sample/1.mp4"); //def data
  // }
  })
let movie = computed(() => {
  return store.getters["movie"];
})
let cast = computed(() => {
  return store.getters["cast"];
})
let subtitle2 = computed(() => {
  return store.getters["cast"];
})
let subtitle = computed({
  get(){
        return store.getters["subtitle"];
    },
  set(value) {
        if (value.upd == "subtitle") {
          store.commit("updateSubtitle", value);
        } else if (value.upd == "speaker") {
          store.commit("updateSpeaker", value);
        }
      }
})

</script>


<style scoped>

.full-grid {
  height: 100vh !important;
  width:100vw;
  display: grid;

  grid-template-rows: 1fr 1fr;
  grid-template-columns: 48.5% 0.5% 48.5%;

  grid-template-areas:
    "video resizer sub"
    "panel resizer sub";

  gap: 0px;
  height: 100%;
}

#item-1 {
  /* background-color: #7966bb; */
  grid-area: video;
}

#item-2 {
  /* background-color: #ee5ba7; */
  grid-area: panel;
  overflow: hidden auto;
  width: 100%;
}

#item-3 {
  /* background-color: #758ec5; */
  grid-area: sub;
  overflow: hidden auto;
}

#resizer {
  background-color: hsl(205, 30%, 40%);
  cursor: col-resize;
  grid-area: resizer;
  width: 100%;
}

</style>
