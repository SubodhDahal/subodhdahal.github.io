<template>
  <div class="container blog-page my-10">
    <div class="prose max-w-none dark:text-gray-50">
      <p>ABOUT</p>
      <h1 class="mb-1 dark:text-gray-50">Subodh Dahal</h1>

      <div class="md:flex md:flex-row-reverse">
        <div class="w-1/2 md:w-1/3 md:ml-10 not-prose mt-5">
          <img src="/images/me.jpg" class="max-w-full h-auto" alt="Subodh Dahal" />
        </div>

        <ContentDoc class="md:w-2/3" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const title: string = 'About me'
const description: string = 'About Subodh Dahal'
const image: string = ''
const path: string = '/about'

useHead({
  title,
  meta: createSEOMeta({ title, description, image, url: path }),
  link: [
    {
      rel: 'canonical',
      href: `https://subodhdahal.com${path}`,
    },
  ],
})
</script>

<style lang="scss" scoped>

</style>