export default {
  modules: ['@nuxtjs/seo'],
  seo: {
    // Optional global configuration
    name: 'Subodh Dahal',
    title: 'Subodh Dahal\'s musings on software engineering, automation, photography and more',
    description: 'Subodh Dahal - Software Engineer, Automation Enthusiast, Hobbyist Photographer & Avid Ponderer',
    canonical: 'https://subodhdahal.com',
    openGraph: {
      type: 'website',
      url: 'https://subodhdahal.com',
      title: 'Subodh Dahal\'s musings on software engineering, automation, photography and more',
      description: 'Subodh Dahal - Software Engineer, Automation Enthusiast, Hobbyist Photographer & Avid Ponderer',
      image: 'https://subodhdahal.com/twitter-card.png'
    },
    twitter: {
      card: 'summary_large_image',
      site: '@SubodhDahal',
      title: 'Subodh Dahal\'s musings on software engineering, automation, photography and more',
      description: 'Subodh Dahal - Software Engineer, Automation Enthusiast, Hobbyist Photographer & Avid Ponderer',
      image: 'https://subodhdahal.com/twitter-card.png'
    }
  }
}
