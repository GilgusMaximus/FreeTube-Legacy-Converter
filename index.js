const historyConverter = require('./src/history/HistoryConverter')
function main(arguments) {
    console.log('The following arguments were supplied:', arguments)
    if (arguments.length === 3 && arguments[2] === '-help') {
        // todo add help
        process.exit(0)
    }
    if (arguments.length < 6) {
        console.error('Aborting: Wrong number of arguments were supplied. Expected 5, got', arguments.length-2)
        process.exit(1)
    }
    if (arguments[2] === '-history') {
        let oldFtFilePath = null
        let newFtFilePath = null
        for (let i = 3; i < arguments.length; i+=2) {
            if (arguments[i] === '-op') {
                oldFtFilePath = arguments[i+1]
            } else if (arguments[i] === '-np') {
                newFtFilePath = arguments[i+1]
            } else {
                console.error('Aborting: Wrong arguments supplied.')
                process.exit(1)
            }
        }
        console.log('Starting to convert history files')
        historyConverter.convertOldHistoryToNewHistory(oldFtFilePath, newFtFilePath)
        console.log('Conversion of history files is done. Enjoy your complete history in the FreeTube rewrite')
        process.exit(0)
    } else if (arguments[2] === '-subs') {

    } else {
        console.error('Aborting: Wrong second argument.')
        process.exit(1)
    }

}

const arguments = process.argv
main(arguments)
