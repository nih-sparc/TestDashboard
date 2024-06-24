
/* eslint-disable */
<template>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      :width="width"
      :height="height"

      viewBox="0 0 24 24"
    >
        <circle pid="0" cx="12" cy="12" r="12" :fill="background"/>
        <path pid="1" :fill="color" d="M18.364 7.05L13.414 12l4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636l4.95 4.95 4.95-4.95 1.414 1.414z" stroke-linecap="square" />

  </svg>
  </template>
  
  <script>
  export default {
    name: "CloseIcon",
    props: {
      width: {
        type: Number,
        default: 16,
      },
      height: {
        type: Number,
        default: 16,
      },
      color: {
        type: String,
        default: "#000000",
      },
      background: {
        type: String,
        default: "#ffffff00",
      }
    },
  };
  </script>