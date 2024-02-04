export function timestampToSeconds (srtTimestamp) {
    const [rest, millisecondsString] = srtTimestamp.split(",");
    const milliseconds = parseInt(millisecondsString);
    const [hours, minutes, seconds] = rest.split(":").map((x) => parseInt(x));
    return milliseconds * 0.001 + seconds + 60 * minutes + 3600 * hours;
};

export function  fromVtt  (data, timeFormat, isYoutubeAutoTranscript) {
    var useYoutubeAutoTranscript = isYoutubeAutoTranscript ? true : false;
    data = data.replace(/\r/g, "");
    var regex = /(\d+)?\n?(\d{2}:\d{2}:\d{2}[,.]\d{3}) --> (\d{2}:\d{2}:\d{2}[,.]\d{3}).*\n/g;
    data = data.split(regex);
    data.shift();
    var items = [];
    console.log(data);
    for (var i = 0; i < data.length; i += 4) {
      var text = data[i + 3];
    //   console.log({text});
      if (useYoutubeAutoTranscript) {
        text = text.split("\n");
        text.shift();
        text = text.join("\n");
      }
    //   console.log(text);
      if (text.trim().length === 0) continue;
      items.push({
        id: data[i] ? data[i].trim() : items.length + 1,
        startTime: changeTimeFormat(data[i + 1].trim(), timeFormat),
        endTime: changeTimeFormat(data[i + 2].trim(), timeFormat),
        text: text.trim(),
      });
    }
    return items;
  };

  var changeTimeFormat = function (time, format) {
    if (format === "ms") {
      return timeMs(time);
    } else if (format === "s") {
      return timeMs(time) / 1000;
    } else {
      return time;
    }
  };

  var timeMs = function (val) {
    var regex = /(\d+):(\d{2}):(\d{2})[,.](\d{3})/;
    var parts = regex.exec(val);

    if (parts === null) {
      return 0;
    }

    for (var i = 1; i < 5; i++) {
      parts[i] = parseInt(parts[i], 10);
      if (isNaN(parts[i])) parts[i] = 0;
    }

    // hours + minutes + seconds + ms
    return parts[1] * 3600000 + parts[2] * 60000 + parts[3] * 1000 + parts[4];
  };

// export {timestampToSeconds, fromVtt}
