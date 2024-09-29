// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    // Tells vue to not parse the <doc> </doc> tag for component documentation.
    build: {
        extend(config, { isDev, isClient }) {
            const vueLoader = config.module.rules.find((rule) => rule.loader === "vue-loader")
            if (vueLoader) {
                vueLoader.options.compilerOptions = {
                    customBlocks: ["doc"], // Add custom block here
                }
            }
        },
    },

    // components: [{ path: "~/components", pathPrefix: false }],
    devtools: { enabled: true },

    compatibilityDate: "2024-09-28",
})
