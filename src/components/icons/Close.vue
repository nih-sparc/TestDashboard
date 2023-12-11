<template>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      :width="width"
      :height="height"
      :fill="color"
      :direction="dir"
      viewBox="0 0 24 24"
    >
    <circle id="Oval" fill="#8300BF" cx="12" cy="12" r="12"></circle>
    <g id="Group-13" stroke-linecap="square" transform="translate(12.000000, 12.000000) rotate(45.000000) translate(-12.000000, -12.000000) translate(4.000000, 4.000000)" fill="#FFFFFF">
    <path pid="0" d="M9,-4.54747351e-13 L9,6.999 L16,7 L16,9 L9,8.999 L9,16 L7,16 L7,8.999 L4.54747351e-13,9 L4.54747351e-13,7 L7,6.999 L7,-4.54747351e-13 L9,-4.54747351e-13 Z"/>
    </g>
   </svg>
  </template>
  
  <script>
  export default {
    name: "Close",
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
        default: "currentColor",
      },
      dir:{
        type:String,
        default: "ltr"
      }
    },
  };
  </script>
  
  