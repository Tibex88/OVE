<template>
  <!-- <AVWaveform v-if="art" :audio-controls="false" :src="art.url" /> -->
  <table v-if="subtitle" class="border ml-1">
    <tr class="border" accesskey="t">
      <th></th>
      <th>Timeline</th>
      <!-- <th>Scene</th> -->
      <th>By</th>
      <th>Main Subtitle ({{ subtitle.length }})</th>
      <th v-if="subtitle2">Secondary Subtitle ({{ subtitle2.length }})</th>
    </tr>

    <tr
      class="border"
      v-for="(obj, index) in subtitle"
      :key="obj.id"
      :id="`T${obj.id}`"
      :class="{
        time:
          timestampToSeconds(obj.startTime) <
          currentTime <
          timestampToSeconds(obj.endTime),
        'bg-darkTeal2': index % 2 === 0,
      }"
    >
      <td>
        <button class="block" @click="delRow(index)">Del</button>
        <button class="block" @click="newRow(index)">New</button>
        <button class="block" @click="merge(index)">Merge</button>

        <!-- <div class=""><button @click="$event">New</button></div> -->
      </td>
      <td
        @dblclick="seek({ s: obj.startTime, e: obj.endTime, id: obj.id }, 2)"
        @keyup.enter="seek({ s: obj.startTime, e: obj.endTime, id: obj.id }, 2)"
        @keyup.space="seek({ s: obj.startTime, e: obj.endTime, id: obj.id }, 1)"
        @click="seek({ s: obj.startTime, e: obj.endTime, id: obj.id }, 1)"
        class="relative group"
      >
        <input
          type="checkbox"
          class="absolute top-0 left-0 border-none group-hover:block"
          :class="{ block: obj.markScene, hidden: !obj.markScene }"
          @click="toggleCheck(index)"
          :ref="`check${index}`"
          name="time"
          :checked="obj.markScene"
        />
        <button>
          <p>
            {{ obj.startTime }}
          </p>
          <p>
            {{ obj.endTime }}
          </p>
        </button>
      </td>
      <td class="w-fit">
        <div class="text-container">
          <!-- <input list="airports" name="airports" /> -->
          <input
            type="text"
            list="castList"
            multiple
            @change="
              $emit('update:subtitle', {
                upd: 'speaker',
                value: $event.target.value,
                index,
              })
            "
            :value="obj.by ? obj.by : ''"
            :ref="`inp${index}`"
            class="text-slate-900 bg-blueGray font-black border min-w-max w-fit"
          />

          <datalist id="castList">
            <option value=" " />
            <option v-for="cast in casts" :key="cast" :value="cast + ':-'" />
          </datalist>
        </div>
      </td>
      <td>
        <!-- {{ index ? index : "No ID" }} -->
        <BaseToolTip content="" placement="right">
          <div name="buttons" class="flex justify-around">
            <!-- <Button @click="test" class="border p-2">L</Button> -->
            <!-- <Button
              @click="splitByCursor($event.target, index)"
              class="border px-2"
              >S</Button> -->

            <!-- <Button @click="test" class="border p-2">L</Button> -->
          </div>
        </BaseToolTip>

        <TextAreaVue
          autocomplete
          @keyup.esc="swap($event.target)"
          @keyup.exact.ctrl.enter="splitByCursor($event.target, index)"
          :value="obj.text"
          @change="
            $emit('update:subtitle', {
              upd: 'subtitle',
              value: $event.target.value,
              index,
            })
          "
        />
      </td>
      <td v-if="subtitle2">
        {{ index ? index : "No ID" }}
        <TextAreaVue :value="subtitle2[index] ? subtitle2[index].text : ''" />
      </td>
    </tr>
  </table>
</template>

<script>
// import autoSize from "autoSize";
// import { AVWaveform } from "vue-audio-visual";
import BaseToolTip from "./BaseToolTip.vue";
import TextAreaVue from "./TextArea.vue";
import { timestampToSeconds } from "../assets/js";
// import { timestampToSeconds } from "./../../src/js";

import { useKeypress } from "vue3-keypress";
import { ref } from "vue";

export default {
  props: ["art", "subtitle", "subtitle2"],
  components: {
    TextAreaVue,
    BaseToolTip,
    // AVWaveform,
  },
  setup() {
    const pressedKeyCode = ref(null);
    const isSuccess = ref(false);
    const isActiveRef = ref(true);

    const someSuccessCallback = ({ keyCode }) => {
      isSuccess.value = true;
    };

    const someWrongKeyCallback = ({ event }) => {
      isSuccess.value = false;
    };

    const someAnyKeyCallback = ({ event }) => {
      // console.log(event, event.keyCode);
      pressedKeyCode.value = event.keyCode;
    };

    useKeypress({
      keyEvent: "keyup",
      keyBinds: [
        {
          keyCode: 192, // or keyCode as integer, e.g. 37
          modifiers: ["ctrlKey"],
          success: someSuccessCallback,
          preventDefault: true, // the default is true
        },
        // {
        //   keyCode: "right", // or keyCode as integer, e.g. 39
        //   modifiers: ["shiftKey"],
        //   success: someSuccessCallback,
        //   preventDefault: true, // the default is true
        // },
      ],
      onWrongKey: someWrongKeyCallback,
      onAnyKey: someAnyKeyCallback,
      isActive: isActiveRef,
    });

    return {};
  },
  data() {
    return {
      currentTime: null,
    };
  },
  computed: {
    casts() {
      console.log(this.$store.getters["cast"]);
      return this.$store.getters["cast"];
    },
    syncValue() {
      return this.$store.getters["syncValue"];
    },
  },
  methods: {
    timestampToSeconds,
    splitByCursor(input, index) {
      let pos = this.getCursorPos(input);
      let text = input.value.substring([pos.start], input.value.length);

      if (text == "") {
        return;
      }
      this.subtitle[index].text = input.value.substring(0, [pos.start]);
      this.newRow(index, text);
    },
    test(event) {
      console.log(event.target);
    },
    merge(index) {
      let nextRow = index + 1;
      this.subtitle[index].text =
        this.subtitle[index].text + " " + this.subtitle[nextRow].text;
      this.delRow(nextRow);
    },
    swap(input) {
      let pos = this.getCursorPos(input);

      input.value =
        input.value.substring([pos.start], input.value.length) +
        " " +
        input.value.substring(0, [pos.start]);
    },
    getCursorPos(input) {
      if ("selectionStart" in input && document.activeElement == input) {
        return {
          start: input.selectionStart,
          end: input.selectionEnd,
        };
      } else if (input.createTextRange) {
        var sel = document.selection.createRange();
        if (sel.parentElement() === input) {
          var rng = input.createTextRange();
          rng.moveToBookmark(sel.getBookmark());
          for (
            var len = 0;
            rng.compareEndPoints("EndToStart", rng) > 0;
            rng.moveEnd("character", -1)
          ) {
            len++;
          }
          rng.setEndPoint("StartToStart", input.createTextRange());
          for (
            var pos = { start: 0, end: len };
            rng.compareEndPoints("EndToStart", rng) > 0;
            rng.moveEnd("character", -1)
          ) {
            pos.start++;
            pos.end++;
          }
          return pos;
        }
      }
      return -1;
    },
    autoResize(event) {
      event.target.style.height = "auto";
      event.target.style.height = `${event.target.scrollHeight}px`;
    },
    delRow(index) {
      this.subtitle.splice(index, 1);
      this.saveSub();
    },
    newRow(index, text = "") {
      let intermObj = {
        id: parseInt(index) + 5000,
        by: "",
        markedScene: false,
        startTime: this.subtitle[index].endTime,
        endTime: this.subtitle[index + 1].startTime,
        text,
      };
      this.subtitle.splice(index + 1, 0, intermObj);
      this.saveSub();
    },
    seek(time, clicks = 1) {
      console.log(clicks);
      let newTime = this.timestampToSeconds(time.s) - this.syncValue;
      this.art.currentTime = newTime;
      if (clicks === 1) this.art.play();
      else if (clicks === 2) this.art.pause();
      // this.$router.push(`/#${time.id}`);
      console.log({ time: this.syncValue });
      // console.log( (time.s));
      console.log(
        "seeking at " +
          new Date(newTime * 1000).toISOString().substring(11, 19),
        new Date(newTime * 1000).toISOString()
      );
    },
    toggleCheck(index) {
      this.subtitle[index]["markScene"] =
        this.$refs[`check${index}`][0]["checked"];

      this.subtitle[index]["adjTime"] = new Date(
        (this.timestampToSeconds(this.subtitle[index].startTime) -
          this.syncValue) *
          1000
      )
        .toISOString()
        .substring(11, 19);
    },
    duration(startTime, endTime) {
      //not needed rIght now
      return (
        (
          this.timestampToSeconds(endTime) - this.timestampToSeconds(startTime)
        ).toFixed(2) + " sec"
      );
    },
    saveSub() {
      this.$store.commit("saveSubtitle", this.subtitle);
    },

    // sync() {
    //   this.currentTime = this.art.currentTime.toFixed(2);
    //   console.log(this.currentTime.toFixed(2));
    // },

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

    // selectCast(index) {
    //   // let index = id - 1;
    //   let castName = this.$refs[`inp${index}`][0]["value"];
    //   this.subtitle[index]["by"] = castName;
    // },
  },
};
</script>

<style>
/* tr td {
  background-color: #fff;
}

tr:nth-child(even) td:nth-child(odd),
tr:nth-child(odd) td:nth-child(even) {
  background-color: #ccc;
} */
</style>
