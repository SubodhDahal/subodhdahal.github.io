<template>
  <div class="bg-gray-100 dark:bg-gray-600" id="about">
    <div class="container pt-16 pb-20">
      <div class="relative mb-12">
        <h2 class="text-3xl font-serif font-bold text-center text-gray-800 dark:text-gray-100">
          About Me
        </h2>
        <div class="absolute w-24 h-1 bg-primary-500 bottom-0 left-1/2 transform -translate-x-1/2 mt-4"></div>
      </div>
      <div class="grid md:grid-cols-2 gap-8 mb-12">
        <!-- Professional Background -->
        <div class="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 transform hover:-translate-y-1 transition-transform duration-300">
          <h2 class="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Professional Journey</h2>
          <div class="space-y-4 text-gray-600 dark:text-gray-300">
            <p>An experienced software engineer with a strong passion for technology and a growing interest in Large Language Models (LLMs).</p>
            <p>Over a decade of experience with various programming languages including Python, Javascript, Typescript, NodeJS, and PHP.</p>
            <p class="font-medium">Currently working as an Engineering Manager, leading teams and mentoring developers.</p>
          </div>
        </div>

        <!-- Education & Background -->
        <div class="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 transform hover:-translate-y-1 transition-transform duration-300">
          <h2 class="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Education & Background</h2>
          <div class="space-y-4 text-gray-600 dark:text-gray-300">
            <p>Master's in Information Engineering from Germany, specializing in:</p>
            <ul class="list-disc list-inside space-y-2 ml-4">
              <li>Intelligent Systems</li>
              <li>Machine Learning</li>
            </ul>
            <p>Been in Germany since 2017, bringing a global perspective to technology solutions.</p>
          </div>
        </div>
      </div>

      <!-- Leadership & Interests -->
      <div class="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 max-w-3xl mx-auto transform hover:-translate-y-1 transition-transform duration-300">
        <h2 class="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Beyond Code</h2>
        <div class="space-y-4 text-gray-600 dark:text-gray-300">
          <p>As a team lead and mentor, I prioritize effective communication and teamwork for success. I'm dedicated to making technology accessible and supporting the open-source community.</p>
          <p>In my spare time, I enjoy:</p>
          <div class="grid grid-cols-3 gap-4 mt-4">
            <div class="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <span class="block text-xl mb-2">🏃‍♂️</span>
              <span>Exploring Nature</span>
            </div>
            <div class="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <span class="block text-xl mb-2">📸</span>
              <span>Photography</span>
            </div>
            <div class="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <span class="block text-xl mb-2">📚</span>
              <span>Science Fiction</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
