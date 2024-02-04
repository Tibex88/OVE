<template>
  <textarea
    class="p-2 resize-none form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-blueGray bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
    @focus="autoResize"
    @input="autoResize"
  >
  </textarea>
</template>

<script>
export default {
  methods: {
    autoResize(event) {
      event.target.style.height = "auto";
      event.target.style.height = `${event.target.scrollHeight}px`;
    },
  },
};
</script>

<style></style>
