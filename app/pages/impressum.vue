<script setup lang="ts">
const title = 'Impressum'
const description = 'Impressum (legal notice) for subodhdahal.com.'
const url = 'https://subodhdahal.com/impressum/'

useHead({ title, link: [{ rel: 'canonical', href: url }] })
useSeoMeta({ title, description, ogTitle: title, ogDescription: description, ogUrl: url })
</script>

<template>
  <main class="container my-10">
    <article class="blog-page">
      <h1>Impressum</h1>
      <p class="font-sans text-sm">
        <a href="#de">Deutsch</a> · <a href="#en">English</a>
      </p>

      <section id="de" lang="de">
        <h2>Angaben gemäß § 5 DDG und § 18 Abs. 1 MStV</h2>
        <p>
          {{ LEGAL.name }}<br />
          {{ LEGAL.street }}<br />
          {{ LEGAL.city }}<br />
          {{ LEGAL.country }}
        </p>

        <h3>Kontakt</h3>
        <p>E-Mail: <a :href="`mailto:${LEGAL.email}`">{{ LEGAL.email }}</a></p>

        <h3>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h3>
        <p>{{ LEGAL.name }}, Anschrift wie oben.</p>

        <p>
          Informationen zum Umgang mit personenbezogenen Daten stehen in der
          <NuxtLink to="/privacy/">Datenschutzerklärung</NuxtLink>.
        </p>
      </section>

      <section id="en" lang="en">
        <h2>Legal notice (English)</h2>
        <p>
          This is a translation for convenience. The German version above is the legally binding one.
        </p>
        <p>
          {{ LEGAL.name }}<br />
          {{ LEGAL.street }}<br />
          {{ LEGAL.city }}<br />
          {{ LEGAL.countryEn }}
        </p>
        <p>Email: <a :href="`mailto:${LEGAL.email}`">{{ LEGAL.email }}</a></p>
        <p>
          Responsible for the content under § 18(2) MStV: {{ LEGAL.name }}, address as above. How this site handles
          personal data is described in the <NuxtLink to="/privacy/">privacy policy</NuxtLink>.
        </p>
      </section>
    </article>
  </main>
</template>
