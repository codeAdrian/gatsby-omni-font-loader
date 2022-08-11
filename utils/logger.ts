
const warn = (function (environment) {
    if (environment === "production") {
        return () => { }
    }
    return (...args) => {
        console.warn(...args)
    }
})(process.env.NODE_ENV);

const info = (function (environment) {
    if (environment === "production") {
        return () => { }
    }
    return (...args) => {
        console.info(...args)
    }
})(process.env.NODE_ENV);

export { warn, info }