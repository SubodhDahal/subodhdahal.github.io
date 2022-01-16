<template>
  <div class="self-center ">
    <a
      href="https://www.linkedin.com/in/subodhdahal"
      title="LinkedIn"
      target="_blank"
      rel="noopener noreferrer"
    >
      <font-awesome-icon :icon="faLinkedin" class="text-3xl mr-2 text-gray-700" />
    </a>
    <a
      href="https://www.xing.com/profile/Subodh_Dahal"
      title="Xing"
      target="_blank"
      rel="noopener noreferrer"
    >
      <font-awesome-icon :icon="faXingSquare" class="text-3xl mr-2 text-gray-700" />
    </a>
    <a
      href="https://github.com/SubodhDahal"
      title="GitHub"
      target="_blank"
      rel="noopener noreferrer"
    >
      <font-awesome-icon :icon="faGithubSquare" class="text-3xl mr-2 text-gray-700" />
    </a>
    <a
      href="https://stackoverflow.com/users/1083422/sub0dh"
      title="Stackoverflow"
      target="_blank"
      rel="noopener noreferrer"
    >
      <font-awesome-icon :icon="faStackOverflow" class="text-3xl mr-2 text-gray-700" />
    </a>
    <a
      href="https://instagram.com/sub0dh_d"
      title="Instagram"
      target="_blank"
      rel="noopener noreferrer"
    >
      <font-awesome-icon :icon="faInstagramSquare" class="text-3xl mr-2 text-gray-700" />
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
