<template>
  <div class="dark:text-gray-50">
    <div class="shadow-sm border-b border-gray-200 dark:border-gray-700">
      <header class="md:container flex justify-between mx-auto px-5 py-4">
      <div class="mb-4">
        <NuxtLink to="/">
          <IconLogo class="h-12 w-12 transition-transform hover:scale-105" />
        </NuxtLink>
      </div>
      <div class="md:hidden">
        <button
          @click="isMobileNavOpen = !isMobileNavOpen"
          class="flex items-center p-3 border-2 rounded-md dark:text-gray-50 dark:border-gray-600 text-gray-800 border-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          <svg
            class="fill-current h-4 w-4"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Mobile Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v15z" />
          </svg>
        </button>
      </div>
      <ul
        class="hidden text-lg mt-1 flex flex-col md:flex-row list-none md:block md:flex items-center gap-6"
      >
        <li>
          <NuxtLink
            to="/blog"
            active-class="text-blue-500 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-500"
            class="hover:text-blue-500 relative pb-1 font-medium transition-all hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:w-full hover:after:h-0.5 hover:after:bg-blue-500">
            Blog
          </NuxtLink>
        </li>
        <li>
          <NuxtLink
            to="/library"
            active-class="text-blue-500 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-500"
            class="hover:text-blue-500 relative pb-1 font-medium transition-all hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:w-full hover:after:h-0.5 hover:after:bg-blue-500">
            Library
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/#about" class="hover:text-blue-500 font-medium transition-colors"> About </NuxtLink>
        </li>
        <li>
          <ColorMode />
        </li>
      </ul>
      <div
        class="navbar-menu relative z-50"
        :class="{ block: isMobileNavOpen, hidden: !isMobileNavOpen }"
      >
        <div class="navbar-backdrop fixed inset-0 bg-gray-800 dark:bg-gray-600 opacity-25"></div>
        <nav
          class="fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-gray-100 dark:bg-gray-800 overflow-y-auto transform transition-transform duration-300 ease-in-out"
        >
          <div class="flex items-center mb-8">
            <NuxtLink to="/" class="mr-auto">
              <IconLogo class="h-15 w-15" />
            </NuxtLink>
            <button class="navbar-close p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors" @click="isMobileNavOpen = false">
              <svg
                class="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                ß
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>
          <div>
            <ul>
              <li class="mb-5">
                <NuxtLink
                  to="/blog"
                  active-class="text-blue-500 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-500"
                  class="hover:text-blue-500 relative pb-1 inline-block text-lg font-medium transition-all"
                  @click="isMobileNavOpen = false">
                  Blog
                </NuxtLink>
              </li>
              <li class="mb-5">
                <NuxtLink
                  to="/library"
                  active-class="text-blue-500 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-500"
                  class="hover:text-blue-500 relative pb-1 inline-block text-lg font-medium transition-all"
                  @click="isMobileNavOpen = false">
                  Library
                </NuxtLink>
              </li>
              <li class="mb-5">
                <NuxtLink
                  to="/#about"
                  class="hover:text-blue-500 text-lg font-medium transition-colors"
                  @click="isMobileNavOpen = false">
                  About
                </NuxtLink>
              </li>
              <li>
                <ColorMode />
              </li>
            </ul>
          </div>
          <div class="mt-auto">
            <div class="pt-6">
              <SocialLinks />
            </div>
          </div>
        </nav>
      </div>
      </header>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isMobileNavOpen: false,
    };
  },
};
</script>
