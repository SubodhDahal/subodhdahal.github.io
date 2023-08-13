<template>
  <div class="bg-gray-100 dark:bg-gray-800 dark:text-gray-50">
    <header class="container flex justify-between mx-auto px-5 pt-5">
      <div class="text-2xl font-bold mb-4">
        <NuxtLink to="/">
          <svg
            width="80.688"
            height="47.118"
            viewBox="0 0 21.349 12.467"
            xmlns="http://www.w3.org/2000/svg"
            class="logo"
            :class="$colorMode.preference === 'dark' ? 'fill-gray-50 stroke-gray-50' : 'fill-gray-700 stroke-gray-700'">
            <g transform="translate(-13.999 -74.065)">
              <path d="m18.285 76.065c-1.2594 0-2.286 1.0372-2.286 2.2966 0 1.27 1.0266 2.2966 2.286 2.2966h3.8841c0.86783 0 1.5769 0.70908 1.5769 1.5875 0 0.86783-0.70908 1.5769-1.5769 1.5769h-6.1701v0.70908h6.1701c1.2594 0 2.2966-1.0266 2.2966-2.286 0-1.27-1.0372-2.2966-2.2966-2.2966h-3.8841c-0.86783 0-1.5769-0.70908-1.5769-1.5875 0-0.86783 0.70908-1.5769 1.5769-1.5769h7.1253v-0.71967z" stroke-width=".52917" style="white-space:pre"/>
              <path d="m30.172 76.065h-4.2333v0.71967h4.2333c1.9368 0 3.5137 1.5769 3.5137 3.5137 0 1.9473-1.5769 3.5242-3.5137 3.5242h-3.5242v-3.8735h-0.70908v4.5826h4.2333c2.3283 0 4.2333-1.8944 4.2333-4.2333 0-2.3283-1.905-4.2333-4.2333-4.2333z" stroke-width=".52917" style="white-space:pre"/>
            </g>
          </svg>
        </NuxtLink>
      </div>
      <ul class="text-xl mt-1 flex list-none">
        <li class="mr-5">
          <NuxtLink to="/blog" class="hover:text-blue-500">
            Blog
          </NuxtLink>
        </li>
        <li class="mr-5">
          <NuxtLink to="/library" class="hover:text-blue-500">
            Library
          </NuxtLink>
        </li>
        <li class="mr-5">
          <NuxtLink to="/about" class="hover:text-blue-500">
            About
          </NuxtLink>
        </li>
        <li>
          <ColorMode />
        </li>
      </ul>
    </header>
  </div>
</template>

