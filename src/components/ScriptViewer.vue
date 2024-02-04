<template>
    <div class="script-container">
      <ActionPanel />
      <div class="script-menu">
        <button @click="copyToClipboard">Copy</button>
        <!-- <button @click="saveSub()">Save</button> -->
        <div>
          <div ref="dropDown" class="drop-down">
            <button>with table</button>
            <button>with video</button>
          </div>
        </div>
        <div>
          <button @click="toggleFullscreen">FullScreen</button>
        </div>
      </div>
      <div class="main" accesskey="s" ref="script">
        <div v-if="subtitle" ref="line" class="line">
          <span
            ref="content"
            v-for="line in subtitle"
            :id="line.id + 1"
            :key="line.id"
            class="para"
          >
            <!-- <a :href="`#T${line.id}`"></a> -->
            <p v-if="line.markScene" class="marked-scene">
              <b>{{ line.adjTime }}</b>
              <br />
            </p>
  
            <p v-if="line.by && line.by != ''" class="speaker">
              <b>{{ line.by }}</b>
            </p>
            <span
              v-if="line.text"
              class="script-text"
              :title="line.startTime + ',' + line.endTime"
            >
              {{ line.text }}
            </span>
          </span>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { timestampToSeconds } from "./../assets/js";
  
  
  export default {
    components: {},
    props: ["subtitle"],
    data() {
      return {
        screen: { w: window.innerWidth, h: window.innerHeight },
        current: 0,
        lineH: 54,
        player: this.$refs.audio,
        fullScreen: false,
      };
    },
    computed: {
      lines() {
        return this.$refs.line;
      },
      finalSubtitle() {
        var final = ``;
        for (let line in this.subtitle) {
          final += `${line.markedScene ? line.startTime : ""}`;
        }
        return final;
      },
      // subtitle: {
      //   get: function () {
      //     return this.$store.getters["subtitle"];
      //   },
      // },
    },
    mounted() {
      console.log("script viewer...")
      // this.init();
      // // this.player.onplaying = (e) => {
      // //   console.log(e);
      // // };
      // this.initLines();
      // // this.anime();
      // this.download();
    },
    methods: {
      timestampToSeconds,
      toggleFullscreen() {
        if (!this.fullScreen) {
          let elem = this.$refs.script;
          if (elem.requestFullscreen) {
            elem.requestFullscreen();
          } else if (elem.webkitRequestFullscreen) {
            /* Safari */
            elem.webkitRequestFullscreen();
          } else if (elem.msRequestFullscreen) {
            /* IE11 */
            elem.msRequestFullscreen();
          }
          this.fullScreen = true;
        } else {
          if (document.exitFullscreen) {
            document.exitFullscreen();
          } else if (document.webkitExitFullscreen) {
            /* Safari */
            document.webkitExitFullscreen();
          } else if (document.msExitFullscreen) {
            /* IE11 */
            document.msExitFullscreen();
          }
          this.fullScreen = false;
        }
      },
      copyToClipboard() {
        var copyText = this.$refs.content.map((val) => {
          return val.textContent;
        });
        console.log(copyText[1]);
        copyText = copyText.join(" ");
        navigator.clipboard.writeText(copyText);
        alert("Copied the text: \n" + copyText);
        // document.execCommand("copy");
        // function listener(e) {
        //   e.clipboardData.setData("text/html", copyText);
        //   e.clipboardData.setData("text/plain", copyText);
        //   e.preventDefault();
        // }
        // document.addEventListener("copy", listener);
        // document.removeEventListener("copy", listener);
      },
      toggleSubMenu() {
        console.log(this.$refs.dropDown.classList);
        // this.$refs.dropDown.classList.toggle("active");
      },
      bolden(val) {
        return `<strong>${val}</strong>`;
      },
      saveSub() {
        this.$store.commit("saveSubtitle", this.subtitle);
      },
      // initLines() {
      //   console.log(this.$refs.line);
      //   console.log(this.line);
      //   //   this.lines[0].classList.add("current");
      //   //   this.lines.forEach((l, i) => {
      //   //     l.style.top = i * this.lineH + "px";
      //   //     // blur
      //   //     if (i > this.current) {
      //   //       Object.assign(l.style, {
      //   //         filter: "blur(" + (1 + (i - this.current) / 6) + "px)",
      //   //       });
      //   //     } else {
      //   //       l.style.filter = "";
      //   //     }
      //   //   });
      //   //
      // },
      // moveLines() {
      //   this.lines.forEach((l, i) => {
      //     const top = (i - this.current) * 54;
      //     if (i === this.current) {
      //       l.classList.add("current");
      //       Object.assign(l.style, {
      //         transitionDuration: "0.2s",
      //         transitionDelay: "0",
      //         top: top + "px",
      //         filter: "",
      //       });
      //     } else l.classList.remove("current");
      //     if (i > this.current && top < screen.h) {
      //       Object.assign(l.style, {
      //         transitionDuration: "0.15s",
      //         transitionDelay: (i - this.current) / 50.0 + "s",
      //         top: top + "px",
      //       });
      //       // blur
      //       if (i > this.current) {
      //         Object.assign(l.style, {
      //           filter: "blur(" + (1 + (i - this.current) / 6) + "px)",
      //         });
      //       } else {
      //         l.style.filter = "";
      //       }
      //     } else {
      //       if (i !== this.current) {
      //         l.style.transitionDuration = "0s";
      //         l.style.transitionDelay = "0s";
      //         l.style.top = top + "px";
      //       }
      //     }
      //   });
      // },
      // anime() {
      //   let time = 20;
      //   let timer = setInterval(() => {
      //     this.current++;
      //     time--;
      //     if (time > 0) this.moveLines();
      //     else window.clearInterval(timer);
      //   }, 1500);
      // },
      // download(url) {
      //   var xhr = new XMLHttpRequest();
      //   xhr.open("POST", url, true);
      //   xhr.setRequestHeader("Content-Type", "application/mpeg");
      //   xhr.responseType = "blob";
      //   xhr.onload = () => {
      //     if (this.status === 200) {
      //       var type = xhr.getResponseHeader("Content-Type");
      //       var blob = new Blob([this.response], { type: type });
      //       this.player.srcobject = blob;
      //     }
      //   };
      //   xhr.send();
      // },
      // init() {
      //   window.onresize = () => {
      //     this.screen = { w: window.innerWidth, h: window.innerHeight };
      //   };
      // },
    },
  };
  
  // var player = document.querySelector("audio");
  </script>
  
  <style scoped>
  .drop-down button {
    min-width: max-content;
    padding: 15px;
  }
  
  .drop-down {
    display: none;
    position: absolute;
  }
  
  .menuitem:hover .drop-down {
    display: block;
  }
  .active {
    display: block;
  }
  .script-container {
    position: relative;
  }
  .script-menu {
    display: flex;
    justify-content: initial;
    align-items: center;
    text-align: left;
    position: fixed;
    background: black;
    width: 48.5%;
    z-index: 2;
    margin: 0 0 5px 0;
    /* overflow: hidden; */
  }
  
  .script-menu button {
    cursor: pointer;
    background: black;
    border: none;
    padding: 0.3rem;
  }
  .script-menu button:hover {
    background: grey;
  }
  .script-text {
    display: inline;
  }
  .speaker {
    display: block;
    white-space: no-wrap;
  }
  .marked-scene {
    display: block;
  }
  .para {
    display: inline;
  }
  
  audio {
    visibility: hidden;
  }
  
  .controller {
    right: 0;
    width: 30px;
    height: 30px;
    background: pink;
    position: absolute;
    left: 0;
  }
  
  .bg {
    z-index: -1;
    position: fixed;
    top: -5%;
    left: -5%;
    background-image: url("//images.pexels.com/photos/4394221/pexels-photo-4394221.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500");
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    filter: blur(40px);
    width: 110%;
    height: 110%;
  }
  
  .main {
    /* position: fixed; */
    /* width: 100%; */
    /* padding: 2rem; */
    background: rgba(0, 0, 0, 0.5);
    overflow: hidden auto;
  }
  /* .main:after {
    z-index: 10;
    content: "";
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(transparent 30%, rgba(128, 128, 128, 0.4) 100%);
    position: fixed;
  } */
  
  .line {
    padding: 40px 20px;
    font-size: 20px;
    font-weight: bold;
    color: #ddd;
    /* white-space: wrap; */
    /* z-index: 5; */
    /* position: fixed; */
    /* top: 100vh; */
    transition-property: all;
  }
  .line.current {
    color: white;
    transform: scale(1.2) translateX(7.5%);
  }
  
  .line-0 {
    /* top: 0px; */
  }
  
  /* .line-1 {
    top: 54px;
  }
  
  .line-2 {
    top: 108px;
  }
  
  .line-3 {
    top: 162px;
  }
  
  .line-4 {
    top: 216px;
  }
  
  .line-5 {
    top: 270px;
  }
  
  .line-6 {
    top: 324px;
  }
  
  .line-7 {
    top: 378px;
  }
  
  .line-8 {
    top: 432px;
  }
  
  .line-9 {
    top: 486px;
  }
  
  .line-10 {
    top: 540px;
  } */
  </style>
  