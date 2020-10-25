const historyConverter = require('./src/history/HistoryConverter')
const subscriptionConverter = require('./src/subscriptions/SubscriptionConverter')
const pockettubeConverter = require('./src/addons/PockettubeConverter')

function main(arguments) {
    console.log('The following arguments were supplied:', arguments)
    if (arguments.length === 3 && arguments[2] === '-help') {
        // todo add help
        console.log('Welcome to the FreeTube Legacy Converter help page.')
        console.error('Before proceeding, it is advised, to make a backup of the old and new files, just in case something goes wrong.')
        console.log('Currently the converter supports watch history and subscriptions')
        console.log('---------------------Watched History-------------------------------')
        console.log('If you want to convert your old history file to the new format or simply add the old history to your already existing new history, you need the following command:')
        console.log('./converter -history -op path/to/old/file/videoHistory.db -np path/to/new/file/history.db')
        console.log('\n---------------------Subscriptions-------------------------------')
        console.log('If you want to convert your old subscription file to the new format or simply add the old susbscriptions to your already existing profiles, you need the following command:')
        console.log('./converter -subs -op path/to/old/file/susbcriptions.db -np path/to/new/file/profiles.db -toProfiles true/false')
        console.log('The last option -toProfiles tells the program how to interact with the profiles. If you use the value "true", the program will add the channels to the profiles they belonged to in the old FreeTube and create any missing profile. (Recommended)')
        console.log('If you use the value "false", the program will add all channels to one new profile.\a')
        console.log('\n---------------------PocketTube-------------------------------')
        console.log('If you want to convert your subscriptions from the PocketTube export file to the new format, you need the following command:')
        console.log('./converter -pocket -op path/to/pockettube/file/susbcriptions.json -np path/to/new/file/profiles.db -toProfiles true/false')
        console.log('However, this function always adds all the profiles to FreeTube, regardless of whether a such profile name already exists.')
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
        let oldFtFilePath = null
        let newFtFilePath = null
        let writeToSeparateProfiles = null
        for (let i = 3; i < arguments.length; i+=2) {
            if (arguments[i] === '-op') {
                oldFtFilePath = arguments[i+1]
            } else if (arguments[i] === '-np') {
                newFtFilePath = arguments[i+1]
            } else if(arguments[i] === '-toProfiles') {
                if (arguments[i+1] === 'true') {
                    writeToSeparateProfiles = true
                } else if (arguments[i+1] === 'false') {
                    writeToSeparateProfiles = false
                } else {
                    console.error('Aborting: Wrong value for -toProfiles supplied.')
                    process.exit(1)
                }
            }else {
                console.error('Aborting: Wrong arguments supplied.')
                process.exit(1)
            }
        }
        console.log('Starting to convert subscription files')
        subscriptionConverter.convertOldSubscriptionsToNewSubscriptions(oldFtFilePath, newFtFilePath, writeToSeparateProfiles)
        console.log('Conversion of files finished. Enjoy your subscriptions and profiles in the FreeTube rewrite')
    } else if(arguments[2] === '-pocket') {
        let pocketTubeFilePath = null
        let newFtFilePath = null
        for (let i = 3; i < arguments.length; i+=2) {
            if (arguments[i] === '-op') {
                pocketTubeFilePath = arguments[i+1]
            } else if (arguments[i] === '-np') {
                newFtFilePath = arguments[i+1]
            } else {
                console.error('Aborting: Wrong arguments supplied.')
                process.exit(1)
            }
        }
        console.log('Starting to convert subscription files')
        pockettubeConverter.convertProfiles(pocketTubeFilePath, newFtFilePath).then(r => console.log('Conversion of files finished. Enjoy your subscriptions and profiles in the FreeTube rewrite'))
    }else {
        console.error('Aborting: Wrong second argument.')
        process.exit(1)
    }

}

const arguments = process.argv
main(arguments)
