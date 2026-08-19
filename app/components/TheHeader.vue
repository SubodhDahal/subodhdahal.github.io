<template>
  <div class="dark:text-secondary-50">
    <div class="border-b border-secondary-200 dark:border-secondary-700">
      <header class="md:container flex justify-between mx-auto px-5 py-4">
      <div class="mb-4">
        <NuxtLink to="/" aria-label="Home">
          <IconLogo class="h-12 w-12 transition-transform hover:scale-105" />
        </NuxtLink>
      </div>
      <div class="md:hidden">
        <button
          @click="isMobileNavOpen = !isMobileNavOpen"
          type="button"
          aria-label="Open navigation menu"
          class="flex items-center min-h-[44px] min-w-[44px] justify-center p-3 border-2 rounded-md dark:text-secondary-50 dark:border-secondary-600 text-secondary-800 border-secondary-300 hover:bg-secondary-200 dark:hover:bg-secondary-700 transition-colors"
        >
          <svg
            class="fill-current h-4 w-4"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Mobile Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v2z" />
          </svg>
        </button>
      </div>
      <ul
        class="hidden text-lg mt-1 flex flex-col md:flex-row list-none md:block md:flex items-center gap-6"
      >
        <li>
          <NuxtLink
            to="/blog/"
            :class="['nav-link', { 'is-active': isBlogActive }]">
            Blog
          </NuxtLink>
        </li>
        <li>
          <NuxtLink
            to="/library/"
            :class="['nav-link', { 'is-active': isLibraryActive }]">
            Library
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/#about" class="nav-link"> About </NuxtLink>
        </li>
        <li>
          <ColorMode />
        </li>
      </ul>
      <div
        class="navbar-menu relative z-50"
        :class="{ block: isMobileNavOpen, hidden: !isMobileNavOpen }"
      >
        <div class="navbar-backdrop fixed inset-0 bg-secondary-800/60 dark:bg-secondary-900/70"></div>
        <nav
          class="fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-secondary-100 dark:bg-secondary-800 overflow-y-auto transform transition-transform duration-300 ease-in-out"
        >
          <div class="flex items-center mb-8">
            <NuxtLink to="/" class="mr-auto" aria-label="Home">
              <IconLogo class="h-15 w-15" />
            </NuxtLink>
            <button
              type="button"
              aria-label="Close navigation menu"
              class="navbar-close p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full hover:bg-secondary-200 dark:hover:bg-secondary-700 transition-colors"
              @click="isMobileNavOpen = false"
            >
              <svg
                class="h-6 w-6 text-secondary-400 cursor-pointer hover:text-secondary-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
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
                  to="/blog/"
                  :class="['nav-link text-lg', { 'is-active': isBlogActive }]"
                  @click="isMobileNavOpen = false">
                  Blog
                </NuxtLink>
              </li>
              <li class="mb-5">
                <NuxtLink
                  to="/library/"
                  :class="['nav-link text-lg', { 'is-active': isLibraryActive }]"
                  @click="isMobileNavOpen = false">
                  Library
                </NuxtLink>
              </li>
              <li class="mb-5">
                <NuxtLink
                  to="/#about"
                  class="nav-link text-lg"
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

<script setup>
const route = useRoute();

// /blog/ and /blog/<slug>/ are sibling routes in the router tree, so
// NuxtLink's active-class only matches the exact /blog/ path. Check the
// URL prefix instead so the link stays active on individual posts too.
// Normalize the trailing slash so /library and /library/ both match.
const normalizedPath = computed(() => {
  const p = route.path;
  return p.length > 1 && p.endsWith('/') ? p.slice(0, -1) : p;
});
const isBlogActive = computed(() => normalizedPath.value === '/blog' || normalizedPath.value.startsWith('/blog/'));
const isLibraryActive = computed(() => normalizedPath.value === '/library' || normalizedPath.value.startsWith('/library/'));

const isMobileNavOpen = ref(false);
</script>
