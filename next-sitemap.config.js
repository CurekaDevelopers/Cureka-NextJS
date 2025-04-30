/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://beta.cureka.com',
    generateRobotsTxt: true,
    changefreq: 'daily',
    priority: 0.7,
    sitemapSize: 5000,
    exclude: ['/server-sitemap.xml'], // optional
  };
  