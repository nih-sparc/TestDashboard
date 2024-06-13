<template>

    <svg
      :width="width"
      :height="height"

      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 23"
    >
        <path d="M17 13.75C19.2091 13.75 21 11.9591 21 9.75C21 7.54086 19.2091 5.75 17 5.75C14.7909 5.75 13 7.54086 13 9.75C13 11.9591 14.7909 13.75 17 13.75Z" :stroke="color" fill="white" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round"/>
        <path d="M7 20.25C8.38071 20.25 9.5 19.1307 9.5 17.75C9.5 16.3693 8.38071 15.25 7 15.25C5.61929 15.25 4.5 16.3693 4.5 17.75C4.5 19.1307 5.61929 20.25 7 20.25Z" :stroke="color" fill="white" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round"/>
        <path d="M4.5 6.75C5.32843 6.75 6 6.07843 6 5.25C6 4.42157 5.32843 3.75 4.5 3.75C3.67157 3.75 3 4.42157 3 5.25C3 6.07843 3.67157 6.75 4.5 6.75Z" :stroke="color" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round"/>
        <path d="M5 6.75L6 14.75" :stroke="color" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round"/>
        <path d="M14.338 12.781L9.03796 16.938" :stroke="color" stroke-width="2" stroke-miterlimit="10"/>
    </svg>
  </template>
  
  <script>
  export default {
    name: "GraphIcon",
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