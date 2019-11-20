'use strict';

module.exports = {
    chainWebpack: (config) => {
        config.plugin('html').tap((args) => {
            args[0].template = 'index.html';
            return args;
        });
    },
    pluginOptions: {
        i18n: {
            locale: 'fr',
            fallbackLocale: 'fr',
            localeDir: 'assets/locales',
            enableInSFC: false
        }
    }
};
