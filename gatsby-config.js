const quote = (str) => `"${str}"`;

module.exports = {
  siteMetadata: {
    title: 'New Relic Developers',
    titleTemplate: '%s | New Relic Developers',
    description:
      'Do more on our platform and make New Relic your own with APIs, SDKs, code snippets, tutorials, and more developer tools.',
    author: 'New Relic',
    repository: 'https://github.com/newrelic/developer-website',
    siteUrl: 'https://developer.newrelic.com',
    branch: 'develop',
  },
  plugins: [
    'gatsby-plugin-sharp',
    {
      resolve: '@newrelic/gatsby-theme-newrelic',
      options: {
        gaTrackingId: 'UA-3047412-33',
        layout: {
          contentPadding: '2rem',
          maxWidth: '1700px',
          component: require.resolve('./src/layouts'),
        },
        prism: {
          languages: ['yaml', 'sass', 'scss', 'java'],
        },
        splitio: {
          core: {
            authorizationKey: process.env.SPLITIO_AUTH_KEY,
          },
          env: {
            development: {
              features: {
                'developer-website_global-header-gh-buttons': 'on',
                'developer-website_right-rail-buttons': 'outline',
              },
              core: {
                authorizationKey: process.env.SPLITIO_AUTH_KEY || 'localhost',
              },
            },
          },
        },
        relatedResources: {
          swiftype: {
            resultsPath: `${__dirname}/src/data/related-pages.json`,
            refetch: Boolean(process.env.BUILD_RELATED_CONTENT),
            engineKey: 'Ad9HfGjDw4GRkcmJjUut',
            limit: 5,
            getSlug: ({ node }) => node.frontmatter.path,
            getParams: ({ node }) => {
              const { tags, title } = node.frontmatter;

              return {
                q: tags ? tags.map(quote).join(' OR ') : title,
                search_fields: {
                  page: ['tags^10', 'body^5', 'title^1.5', '*'],
                },
                filters: {
                  page: {
                    type: ['!blog', '!forum'],
                    document_type: [
                      '!views_page_menu',
                      '!term_page_api_menu',
                      '!term_page_landing_page',
                    ],
                  },
                },
              };
            },
            filter: ({ node }) => node.frontmatter.template === 'GuideTemplate',
          },
        },
        newrelic: {
          configs: {
            production: {
              instrumentationType: 'proAndSPA',
              accountId: '10175106',
              trustKey: '1',
              agentID: '22273498',
              licenseKey: '23448da482',
              applicationID: '22273498',
              beacon: 'staging-bam.nr-data.net',
              errorBeacon: 'staging-bam.nr-data.net',
            },
            staging: {
              instrumentationType: 'proAndSPA',
              accountId: '10175106',
              trustKey: '1',
              agentID: '22273531',
              licenseKey: '23448da482',
              applicationID: '22273531',
              beacon: 'staging-bam.nr-data.net',
              errorBeacon: 'staging-bam.nr-data.net',
            },
          },
        },
      },
    },
    'gatsby-plugin-sass',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'gatsby-starter-default',
        short_name: 'starter',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'src/images/favicon.png',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'markdown-pages',
        path: `${__dirname}/src/markdown-pages`,
      },
    },
    'gatsby-remark-images',
    'gatsby-transformer-remark',
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxHeight: 400,
              maxWidth: 1200,
              fit: 'inside',
              linkImagesToOriginal: false,
            },
          },
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              icon:
                '<svg xmlns="http://www.w3.org/2000/svg" focusable="false" width="1rem" height="1rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 7h3a5 5 0 0 1 5 5 5 5 0 0 1-5 5h-3m-6 0H6a5 5 0 0 1-5-5 5 5 0 0 1 5-5h3"></path><line x1="8" y1="12" x2="16" y2="12"></line></svg>',
            },
          },
        ],
      },
    },
    {
      resolve: 'gatsby-source-newrelic-sdk',
      options: {
        release: 'release-2046',
      },
    },
    'gatsby-plugin-meta-redirect',
    {
      resolve: 'gatsby-plugin-gdpr-tracking',
      options: {
        debug: false,
        googleAnalytics: {
          trackingId: 'UA-3047412-33',
          autoStart: false,
          anonymize: true,
          controlCookieName: 'newrelic-gdpr-consent',
        },
        environments: ['production', 'development'],
      },
    },
  ],
};
