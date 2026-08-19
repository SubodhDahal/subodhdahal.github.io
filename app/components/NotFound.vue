<template>
  <div
    class="lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 items-center flex justify-center flex-col gap-12 mb-16"
  >
    <IconWordmark class="h-14 w-auto text-secondary-800 dark:text-secondary-100" />
    <div class="w-full xl:w-1/2 relative pb-12 lg:pb-0 text-center">
      <h1 class="my-2 font-bold text-2xl text-secondary-800 dark:text-secondary-100">
        Oops! You've stumbled into a wormhole in my website's code.
      </h1>
      <p class="my-2 mb-8 text-secondary-600 dark:text-secondary-300">
        I am working to decode the anomaly and send you back to your dimension.<br>
        In the meantime, ponder the possibilities of interdimensional travel.
      </p>
      <NuxtLink
        to="/"
        class="sm:w-full lg:w-auto my-2 border rounded-md py-4 px-8 text-center bg-secondary-600 dark:bg-secondary-700 text-white hover:bg-secondary-700 dark:hover:bg-secondary-600 focus:outline-none focus:ring-2 focus:ring-secondary-700 focus:ring-opacity-50"
      >
        Take me there!
      </NuxtLink>
    </div>
  </div>
</template>
