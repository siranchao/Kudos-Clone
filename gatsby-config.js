module.exports = {
  proxy: {
    prefix: "/api",
    url: "http://localhost:5000",
  },

  siteMetadata: {
    title: `Kudos`,
    description: `Welcome to Kudos App - Designed and developed by RPDU`,
    author: `RPDU`,
    siteUrl: `https://ashy-bay-0ac315a10.2.azurestaticapps.net/`,
  },
  flags: {
    DEV_SSR: true
  },
  plugins: [
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/RPDUlogo.jpg`, // This path is relative to the root of the site.
      },
    },
  ],
}
