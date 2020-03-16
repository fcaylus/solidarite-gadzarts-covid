module.exports = {
    poweredByHeader: false,
    env: {
        appName: "Solidarité Covid-19",
        keywords: "covid, coronavirus, gadz, gadzarts, solidarite, ensam, enfants, garde, alumni",
        description: process.env.npm_package_description,
        defaultPort: "1234",
        // Do not use SAMPLE_WEBSITE on use app, use process.env.sampleWebsite instead
        sampleWebsite: process.env.SAMPLE_WEBSITE
    }
};
