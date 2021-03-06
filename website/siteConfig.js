/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// See https://docusaurus.io/docs/site-config for all the possible
// site configuration options.

// List of projects/orgs using your project for the users page.
const users = [
    {
        caption: 'User1',
        // You will need to prepend the image path with your baseUrl
        // if it is not '/', like: '/test-site/img/image.jpg'.
        image: '/img/undraw_open_source.svg',
        infoLink: 'https://www.facebook.com',
        pinned: true,
    },
];

const siteConfig = {
    title: 'Piex Store', // Title for your website.
    tagline: '基于 Hooks 的状态管理工具',
    url: 'https://piex.github.io/piex-store/', // Your website URL
    baseUrl: '/piex-store/', // Base URL for your project */
    // For github.io type URLs, you would set the url and baseUrl like:
    //   url: 'https://facebook.github.io',
    //   baseUrl: '/test-site/',

    // Used for publishing and more
    projectName: 'piex-store',
    organizationName: 'piex',
    // For top-level user or org sites, the organization is still the same.
    // e.g., for the https://JoelMarcey.github.io site, it would be set like...
    //   organizationName: 'JoelMarcey'

    // For no header links in the top nav bar -> headerLinks: [],
    headerLinks: [
        { doc: 'intro/intro', label: '指南' },
        { doc: 'api/reference', label: 'API' },
        // { page: 'help', label: 'Help' },
        // { blog: true, label: 'Blog' },
    ],

    // If you have users set above, you add it here:
    users,

    /* path to images for header/footer */
    // headerIcon: 'img/favicon.ico',
    // footerIcon: 'img/favicon.ico',
    // favicon: 'img/favicon.ico',

    /* Colors for website */
    colors: {
        primaryColor: '#D4041C',
        secondaryColor: '#FCEA8D',
        accentColor1: "#717171",
        accentColor2: "#F3EAFF",
        accentColor3: "#D2B9F3",
        accentColor4: "#ECF4F9",
        accentColor5: "#CBDDEA",
        accentColor6: "#2F5773",
    },

    /* Custom fonts for website */
    /*
fonts: {
myFont: [
"Times New Roman",
"Serif"
],
myOtherFont: [
"-apple-system",
"system-ui"
]
},
*/

    // This copyright info is used in /core/Footer.js and blog RSS/Atom feeds.
    copyright: 'Copyright (c) 2015-present Mervyn Zhang and the Piex Store documentation authors.',

    highlight: {
        // Highlight.js theme to use for syntax highlighting in code blocks.
        theme: 'monokai',
    },

    // Add custom scripts here that would be placed in <script> tags.
    // scripts: ['https://buttons.github.io/buttons.js'],

    // On page navigation for the current documentation page.
    onPageNav: 'separate',
    // No .html extensions for paths.
    cleanUrl: true,

    // Open Graph and Twitter card images.
    ogImage: 'img/undraw_online.svg',
    twitterImage: 'img/undraw_tweetstorm.svg',

    // Show documentation's last contributor's name.
    // enableUpdateBy: true,

    // Show documentation's last update time.
    // enableUpdateTime: true,

    // You may provide arbitrary config keys to be used as needed by your
    // template. For example, if you need your repo's URL...
    repoUrl: 'https://github.com/piex/piex-store',
};

module.exports = siteConfig;
