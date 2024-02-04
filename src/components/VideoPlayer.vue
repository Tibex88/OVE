<script>

import Artplayer from "artplayer";

export default{
  props: ["art"],
    data() {
        return {
          instance: null,
        };
  },
  mounted() {
    this.instance = new Artplayer({
      url: "/assets/movie/1.mp4",
      title: "VV",
      // style:{width:"100%", height:"500px"},
      // customType: {
      //   // mkv: function (video, url) {
      //   //   console.log(matroska);
      //   //   console.log({ video }, { url });
      //   // },
      //   mkv: function () {
      //     console.log(11);

      //     // let mkvDemuxer = new mkvdemuxjs.MkvDemux();
      //     // console.log({ video });
      //     // mkvDemuxer.push(video);
      //     // let part = null;
      //     // while ((part == mkvDemuxer.demux()) !== null) {
      //     //   // Do something with part
      //     //   return part;
      //   },

      //   //   // shaka.polyfill.installAll();
      //   //   // var player = new shaka.Player(video);
      //   //   // player.load(url);
      //   // },
      // },
      // poster: "/assets/sample/poster.jpg",
      volume: 0.5,
      isLive: false,
      muted: false,
      autoplay: false,
      pip: true,
      autoSize: true,
      autoMini: true,
      screenshot: true,
      setting: true,
      loop: true,
      flip: true,
      playbackRate: true,
      aspectRatio: true,
      fullscreen: true,
      fullscreenWeb: true,
      subtitleOffset: true,
      miniProgressBar: true,
      mutex: true,
      backdrop: true,
      playsInline: true,
      autoPlayback: true,
      airplay: true,
      theme: "#23ade5",
      lang: navigator.language.toLowerCase(),
      whitelist: ["*"],
      moreVideoAttr: {
        crossOrigin: "anonymous",
      },
      settings: [
        // {
        //   width: 200,
        //   html: "Subtitle",
        //   tooltip: "Bilingual",
        //   icon: '<img width="22" heigth="22" src="/assets/images/subtitles.svg">',
        //   selector: [
        //     {
        //       html: "Display",
        //       tooltip: "Show",
        //       switch: true,
        //       onSwitch: function (item) {
        //         item.tooltip = item.switch ? "Hide" : "Show";
        //         this.instance.subtitle.show = !item.switch;
        //         return !item.switch;
        //       },
        //     },
        //     {
        //       default: true,
        //       html: "Bilingual",
        //       url: "/assets/sample/subtitle.srt",
        //     },
        //     {
        //       html: "Chinese",
        //       url: "/assets/sample/subtitle.cn.srt",
        //     },
        //     {
        //       html: "Japanese",
        //       url: "/assets/sample/subtitle.jp.srt",
        //     },
        //   ],
        //   onSelect: function (item) {
        //     art.subtitle.switch(item.url, {
        //       name: item.html,
        //     });
        //     return item.html;
        //   },
        // },
        // {
        //   html: "Switcher",
        //   icon: '<img width="22" heigth="22" src="/assets/images/switch.svg">',
        //   tooltip: "OFF",
        //   switch: false,
        //   onSwitch: function (item) {
        //     item.tooltip = item.switch ? "OFF" : "ON";
        //     console.info("You clicked on the custom switch", item.switch);
        //     return !item.switch;
        //   },
        // },
        // {
        //   html: "Slider",
        //   icon: '<img width="22" heigth="22" src="/assets/img/state.svg">',
        //   tooltip: "5x",
        //   range: [5, 1, 10, 0.1],
        //   onRange: function (item) {
        //     return item.range + "x";
        //   },
        // },
      ],
      contextmenu: [
        {
          html: "Custom menu",
          click: function (contextmenu) {
            console.info("You clicked on the custom menu");
            contextmenu.show = false;
          },
        },
      ],
      layers: [
        // {
        //   html: '<img width="100" src="/assets/sample/layer.png">',
        //   click: function () {
        //     window.open("https://aimu.app");
        //     console.info("You clicked on the custom layer");
        //   },
        //   style: {
        //     position: "absolute",
        //     top: "20px",
        //     right: "20px",
        //     opacity: ".9",
        //   },
        // },
      ],
      thumbnails: {
        url: "/assets/sample/thumbnails.png",
        number: 60,
        column: 10,
      },
      subtitle: {
        url: "assets/English.srt",
        type: "srt",
        style: {
          color: "#fe9200",
          fontSize: "20px",
        },
        encoding: "utf-8",
      },
      highlight: [
        {
          time: 15,
          text: "One more chance",
        },
        {
          time: 30,
          text: "谁でもいいはずなのに",
        },
        {
          time: 45,
          text: "夏の想い出がまわる",
        },
        {
          time: 60,
          text: "こんなとこにあるはずもないのに",
        },
        {
          time: 75,
          text: "终わり",
        },
      ],
      controls: [
        {
          position: "right",
          html: "Control",
          index: 1,
          tooltip: "Control Tooltip",
          style: {
            marginRight: "20px",
          },
          click: function () {
            console.info("You clicked on the custom control");
          },
        },
      ],
      icons: {
        loading: '<img src="/assets/images/play.svg">',
        state: '<img width="150" heigth="150" src="/assets/images/play.svg">',
        indicator: '<img width="16" heigth="16" src="/assets/images/play.svg">',
      },
      // url: this.url,
      container: this.$refs.artRef,
    });

    this.$nextTick(() => {
      this.$emit("get-instance", this.instance);
    });
  },
  beforeUnmount() {
    if (this.instance && this.instance.destroy) {
      this.instance.destroy(false);
    }
  },
}

</script>

<template>
     <div ref="artRef" accesskey="k"></div>
</template>

<style>
</style>
