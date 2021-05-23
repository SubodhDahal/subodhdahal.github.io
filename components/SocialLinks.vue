<template>
  <div>
    <a
      href="https://www.linkedin.com/in/subodhdahal"
      target="_blank"
      rel="noopener noreferrer"
    >
      <font-awesome-icon :icon="faLinkedin" class="text-3xl mr-2 text-gray-900" />
    </a>
    <a
      href="https://www.xing.com/profile/Subodh_Dahal"
      target="_blank"
      rel="noopener noreferrer"
    >
      <font-awesome-icon :icon="faXingSquare" class="text-3xl mr-2 text-gray-900" />
    </a>
    <a
      href="https://github.com/SubodhDahal"
      target="_blank"
      rel="noopener noreferrer"
    >
      <font-awesome-icon :icon="faGithubSquare" class="text-3xl mr-2 text-gray-900" />
    </a>
    <a
      href="https://stackoverflow.com/users/1083422/sub0dh"
      target="_blank"
      rel="noopener noreferrer"
    >
      <font-awesome-icon :icon="faStackOverflow" class="text-3xl mr-2 text-gray-900" />
    </a>
    <a
      href="https://instagram.com/sub0dh_d"
      target="_blank"
      rel="noopener noreferrer"
    >
      <font-awesome-icon :icon="faInstagramSquare" class="text-3xl mr-2 text-gray-900" />
    </a>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {
  faLinkedin,
  faXingSquare,
  faGithubSquare,
  faStackOverflow,
  faInstagramSquare
} from '@fortawesome/free-brands-svg-icons'

export default Vue.extend({
  computed: {
    faLinkedin () {
      return faLinkedin
    },
    faXingSquare () {
      return faXingSquare
    },
    faGithubSquare () {
      return faGithubSquare
    },
    faStackOverflow () {
      return faStackOverflow
    },
    faInstagramSquare () {
      return faInstagramSquare
    }
  }
})
</script>
