<script setup>
import ActionPanel from './components/ActionPanel.vue';
import VideoPlayer from './components/VideoPlayer.vue';

  function getInstance(art) {
      this.art = art;
  }

  let style={ width: "100%", height: "400px" }
  let art= null

</script>

<template>

 <div class="full-grid">
    <div id="item-1" class="bg-blueGray border ">
      <ActionPanel />
      <VideoPlayer
        class="video_player"
        art=null
        :style="style"
        url="./assets/movie/1.mp4"
        :class="m-auto"
      />
    </div>
    <div id="item-2" class="bg-blueGray border">
      <ActionPanel />
      2
    </div>
    <div id="resizer"></div>
    <div id="item-3" class="bg-blueGray border">
      <ActionPanel />
      3
    </div>
 </div>

</template>

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
