<script setup lang="ts">
const title = 'Impressum'
const description = 'Impressum (legal notice) for subodhdahal.com.'
const url = 'https://subodhdahal.com/impressum/'

useHead({ title, link: [{ rel: 'canonical', href: url }] })
useSeoMeta({ title, description, ogTitle: title, ogDescription: description, ogUrl: url })

const label =
  'font-sans text-xs font-medium uppercase tracking-[0.06em] text-secondary-500 dark:text-secondary-400 sm:pt-1.5'
const labelEn = 'mt-1 block font-normal normal-case tracking-normal'
const value = 'm-0 font-serif text-lg leading-relaxed text-secondary-800 dark:text-secondary-100'
</script>

<template>
  <main class="container my-10 pb-10">
    <header class="mb-12 text-center">
      <h1 class="text-3xl font-serif font-bold text-secondary-800 dark:text-secondary-100">Impressum</h1>
      <div class="w-24 h-1 bg-primary-500 mx-auto mt-4" />
      <p class="font-serif italic text-secondary-600 dark:text-secondary-300 mt-4 text-pretty">
        Angaben gemäß § 5 DDG und § 18 Abs. 1 MStV
        <span lang="en" class="block">Legal notice under German law</span>
      </p>
    </header>

    <dl
      class="mx-auto max-w-2xl divide-y divide-secondary-200 border-y border-secondary-200 dark:divide-secondary-700 dark:border-secondary-700"
    >
      <div class="grid gap-2 py-6 sm:grid-cols-[13rem_1fr] sm:gap-8">
        <dt :class="label">
          Anschrift
          <span lang="en" :class="labelEn">Address</span>
        </dt>
        <dd :class="value">
          <address class="not-italic">
            {{ LEGAL.name }}<br />
            {{ LEGAL.street }}<br />
            {{ LEGAL.city }}<br />
            {{ LEGAL.country }}
          </address>
        </dd>
      </div>

      <div class="grid gap-2 py-6 sm:grid-cols-[13rem_1fr] sm:gap-8">
        <dt :class="label">
          Kontakt
          <span lang="en" :class="labelEn">Contact</span>
        </dt>
        <dd :class="value">
          <a :href="`mailto:${LEGAL.email}`" class="link-hit -my-2.5 text-primary-700 dark:text-primary-300">
            <span class="link-underline">{{ LEGAL.email }}</span>
          </a>
        </dd>
      </div>

      <div class="grid gap-2 py-6 sm:grid-cols-[13rem_1fr] sm:gap-8">
        <dt :class="label">
          Verantwortlich für den Inhalt
          <span lang="en" :class="labelEn">Responsible for content</span>
        </dt>
        <dd :class="value">
          {{ LEGAL.name }}, Anschrift wie oben
          <span class="block text-sm font-sans text-secondary-600 dark:text-secondary-300 mt-1">
            nach § 18 Abs. 2 MStV
          </span>
        </dd>
      </div>

      <div class="grid gap-2 py-6 sm:grid-cols-[13rem_1fr] sm:gap-8">
        <dt :class="label">
          Datenschutz
          <span lang="en" :class="labelEn">Privacy</span>
        </dt>
        <dd :class="value">
          <NuxtLink to="/privacy/" class="link-hit -my-2.5 text-primary-700 dark:text-primary-300">
            <span class="link-underline">Datenschutzerklärung / Privacy policy</span>
            <span aria-hidden="true">&nbsp;→</span>
          </NuxtLink>
        </dd>
      </div>
    </dl>
  </main>
</template>

