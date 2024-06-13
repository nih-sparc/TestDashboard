<template>

    <svg
      :width="width"
      :height="height"

      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 23"
    >
        <path d="M11 8L8 11L5 8" :stroke="color" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M8 11V4" :stroke="color" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M8 2C8.55228 2 9 1.55228 9 1C9 0.447715 8.55228 0 8 0C7.44772 0 7 0.447715 7 1C7 1.55228 7.44772 2 8 2Z" :fill="color"/>
        <path d="M15 15V15H1V15" :stroke="color" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round"/>
    </svg>
  </template>
  
  <script>
  export default {
    name: "DownloadIcon",
    props: {
      width: {
        type: Number,
        default: 23,
      },
      height: {
        type: Number,
        default: 24,
      },
      color: {
        type: String,
        default: "black",
      },
    },
  };
  </script>