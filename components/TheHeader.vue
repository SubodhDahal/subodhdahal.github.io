<template>
  <div class="bg-gray-100 dark:bg-gray-800 dark:text-gray-50">
    <header class="md:container flex justify-between mx-auto px-5 pt-5">
      <div class="mb-4">
        <NuxtLink to="/">
          <IconLogo class="h-12 w-12" />
        </NuxtLink>
      </div>
      <div class="md:hidden">
        <button
          @click="isMobileNavOpen = !isMobileNavOpen"
          class="flex items-center px-3 py-2 border rounded dark:text-gray-50 dark:border-gray-50 text-gray-800 border-gray-300"
        >
          <svg
            class="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Mobile Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v15z" />
          </svg>
        </button>
      </div>
      <ul
        class="hidden text-xl mt-1 flex flex-col md:flex-row list-none md:block md:flex"
      >
        <li class="mr-5">
          <NuxtLink to="/blog" class="hover:text-blue-500"> Blog </NuxtLink>
        </li>
        <li class="mr-5">
          <NuxtLink to="/library" class="hover:text-blue-500">
            Library
          </NuxtLink>
        </li>
        <li class="mr-5">
          <NuxtLink to="/#about" class="hover:text-blue-500"> About </NuxtLink>
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
          class="fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-gray-100 dark:bg-gray-800 overflow-y-auto"
        >
          <div class="flex items-center mb-8">
            <NuxtLink to="/" class="mr-auto">
              <IconLogo class="h-15 w-15" />
            </NuxtLink>
            <button class="navbar-close" @click="isMobileNavOpen = false">
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
                <NuxtLink to="/blog" class="hover:text-blue-500" @click="isMobileNavOpen = false">
                  Blog
                </NuxtLink>
              </li>
              <li class="mb-5">
                <NuxtLink to="/library" class="hover:text-blue-500" @click="isMobileNavOpen = false">
                  Library
                </NuxtLink>
              </li>
              <li class="mb-5">
                <NuxtLink to="/#about" class="hover:text-blue-500" @click="isMobileNavOpen = false">
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
