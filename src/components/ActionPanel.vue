<script>
import { fromVtt } from "../assets/js";
import cast from "../assets/cast";
import srt from "../assets/srt"; //main subtitle file
import srtParser from "srt-parser-2";
import { saveAs } from "file-saver";
// import ffmpeg from "ffmpeg";
// import path from "path";

export default {
  props: ["art", "subtitle"],
  data() {
    return {
      srt,
      content: null,
      slider: this.$refs,
      syncValue: 0,
    };
  },
  computed: {
    movie() {
      return this.$store.getters["movie"];
    },
    // subtitle() {
    //   return this.$store.getters["subtitle"];
    // },
    cast() {
      return this.$store.getters["cast"];
    },
    // syncValue() {
    //   return this.$store.getters["syncValue"];
    // },
    // final() {
    //   return this.subtitle ? this.parser(this.subtitle) : null;
    // },
  },
  beforeUnmount() {
    console.log("being unmounted");
    this.saveSub();
  },
  beforeUpdate() {
    console.log("being updated");
    this.saveSub();
  },
  methods: {
    fromVtt,
    resetCast() {
      this.$store.commit("saveCast", cast);
    },
    saveAs() {
      const parser = new srtParser();
      var blob = new Blob([parser.toSrt(this.subtitle)], {
        type: "text/plain;charset=utf-8",
      });
      saveAs(blob, "Subtitle.srt");
    },
    snr() {
      let search = this.$refs.search.value;
      let replace = this.$refs.replace.value;
      this.subtitle.forEach((val) => {
        val.text.includes(search)
          ? val.text.replace(replace)
          : console.log(false);
      });
      this.saveSub();
      console.log(search, replace);
    },
    // syncSub() {
    //   var syncValue = this.$refs.sync.value;
    //   this.subtitle = this.subtitle.map((val) => {
    //     this.timeStampToSeconds(val.startTime) - syncValue;
    //   });
    //   this.saveSub();
    // },
    toggleMenu() {
      this.$refs.menu.classList.toggle("active");
    },
    getSub(isMain) {
      console.log("is main", isMain);
      const reader = new FileReader();
      let example = isMain ? this.$refs.sub.files[0] : this.$refs.sub2.files[0];
      let url = URL.createObjectURL(example, example.name);
      console.log({ url });
      this.art.subtitle.switch(`${url}`, {
        name: example.name,
        style: {
          color: "white",
          "font-size": "24px",
        },
      });

      if (example.name.includes(".txt") || example.name.includes(".srt")) {
        reader.onload = (res) => {
          isMain
            ? this.$store.commit(
                "saveSubtitle",
                this.fromVtt(res.target.result)
              )
            : this.$store.commit(
                "saveSubtitle2",
                this.fromVtt(res.target.result)
              );
        };
        reader.onerror = (err) => console.log(err);
        reader.readAsText(example);
      } else {
        // this.content = "check the console for file output";
        // reader.onload = (res) => {
        // console.log(res.target.result);
        // };
        reader.onerror = (err) => console.log(err);
        reader.readAsText(example);
      }
    },
    getMovie() {
      try {
        let example = this.$refs.movie.files[0];
        // if (example.name.includes(".mp4")) {
        // new ffmpeg(URL.createObjectURL(example), (err, video) => {
        //   console.log(err);
        //   console.log(video);
        // });
        console.log(
          MediaSource.isTypeSupported(
            'video/mkv; codecs="avc1.4D4028, mp4a.40.2"'
          )
        ); // true
        this.art.switchUrl(URL.createObjectURL(example), example.name);
        // } else {
        //   this.art.notice.show = "Does not support playback";
        //   console.log("Video type not supported");
        // }
      } catch (err) {
        console.log("Unsupported file type");
        console.log(err);
      }
      // }
    },
    seeStore() {
      console.log(this.art.url);
    },
    // parser(data) {
    //   if (!(data instanceof Array)) return "";
    //   var res = "";

    //   for (var i = 0; i < data.length; i++) {
    //     var s = data[i];

    //     if (!isNaN(s.startTime) && !isNaN(s.endTime)) {
    //       // s.startTime = msTime(parseInt(s.startTime, 10));
    //       // s.endTime = msTime(parseInt(s.endTime, 10));
    //     }

    //     res += s.markScene ? "\r\n" + s.startTime + "\r\n" : "";
    //     res += s.by ? `${s.by} \r\n` : "";
    //     res += s.text.replace("\n", "\r\n") + "";
    //   }

    //   return res;
    // },
    addCast() {
      let val = this.$refs.cast.value;
      if (val && val !== "") {
        if (this.cast) {
          this.cast.push(val);
          this.saveCast();
        } else {
          console.log("cannot get cast list");
        }
        this.$refs.cast.value = null;
      }
    },
    // getSubtitle(path = "./assets/sample/English.srt") {
    //   try {
    //     console.log(path);
    //     // var parser = new this.srtParser();
    //     // console.log(typeof parser);
    //     // console.log(typeof this.srt);
    //     // this.subObj = parser.fromSrt(this.srt);
    //     // this.subObj = vvtParser.fromVtt(this.srt);

    //     // let subtitle= JSON.parse(store.get('subtitle'))
    //     // if(subtitle){}

    //     let subtitle = this.fromVtt(this.srt);
    //     // store.set("subtitle", subtitle);
    //     console.log({ sl: subtitle.length });
    //   } catch (err) {
    //     console.log(err);
    //   }
    // },
    saveSub() {
      this.$store.commit("saveSubtitle", this.subtitle);
    },
    saveCast() {
      this.$store.commit("saveCast", this.cast);
    },
    sync() {
      this.syncValue = this.$refs.slider.value;
      this.$store.commit("saveSyncValue", this.$refs.slider.value);
    },
    // saveMovie(movie) {
    //   console.log(movie);
    //   this.$store.commit("saveMovie", movie);
    // },
  },
};</script>

<template>

    <div class="border">
        <!-- <div class="border border-red-600"> -->
            <div class="flex flex-wrap">
               
            <div class="border group flex-1">
                <div class="relative">
                    <button @click="saveAs()">
                        Save As Srt
                    </button>
                </div>
            </div>
               
            <div class="border group flex-1">
                <div class="relative">
                    <label for="movie">Select Movie</label>
                    <input
                    @input="getMovie"
                    ref="movie"
                    type="file"
                    name="movie file"
                    accept="video/mp4"
                    id="movie"
                    class="hidden"
                    />
                </div>
            </div>
               
            <div class="border group flex-1">
                <label for="sub">Select Subtitle</label>
                <input
                @input="getSub(true)"
                ref="sub"
                type="file"
                name="sub file"
                id="sub"
                class="hidden"
                />
            </div>
               
            <div class="border group flex-1">
                <label for="sub2">Select Second Subtitle</label>
                <input
                @input="getSub(false)"
                ref="sub2"
                type="file"
                name="sub file"
                id="sub2"
                class="hidden"
                />
            </div>

            </div>
        <!-- </div> -->
    </div>

</template>


<style>

</style>