
class FormattBoldStringCode {
    string
    originalString

    constructor(string) {
        this.originalString = string
        this.string = `\`\`\`\ ${string}\ \`\`\``
        return this.string
    }
    
    split(splitter) {
        const start = `\`\``
        const end = `\`\``
        const strings = this.originalString.split(splitter)

        this.string = strings.map(string => ` ${start}${string}${end} `).join(splitter)
        return this.string
    }
}

module.exports = { FormattBoldStringCode }
