function generateDataModel() {
    return {
        productNames: ["cola cao 500g", "roomba aspirador", "puntero laser"],
        name: "inés",
        age: Math.floor(Math.random() * 1000),
        marks: [10, 9, 8, 8],
        showButton: false,
        bootcamp: "<span>IronHack WebDev</span>"
    }
}

exports.default = generateDataModel