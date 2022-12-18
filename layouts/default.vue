<template>
  <div>
    <TheHeader />
    <Nuxt />
    <TheFooter />
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Lato&family=Source+Sans+Pro&family=Source+Serif+Pro:wght@400;600&display=swap');

html {
  font-family:
    'Lato',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  @apply text-gray-700;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.container {
  @apply mx-auto px-10 md:px-0;
}

a {
  @apply text-blue-500;
}

table {
  @apply table-auto;
}
table thead {
  @apply bg-gray-200;
}
table th,
table td {
  @apply border border-gray-50;
  @apply px-5 py-3;
  @apply text-left;
}
ul.list {
  @apply list-disc;
  @apply list-inside;
}
ul.list li {
  @apply ml-5 mb-2;
}
</style>
