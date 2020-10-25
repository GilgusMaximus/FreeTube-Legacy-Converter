const ytch = require('yt-channel-info')
const fs = require('fs')

class PockettubeConverter {
    static generateId(length) {
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        let result = ''
        for(let i = 0; i < length; i++){
            result += alphabet.charAt(Math.floor(Math.random() * alphabet.length))
        }
        return result
    }
    static async convertProfiles(pocketTubeFilePath, ftFilePath) {
        const data = JSON.parse(fs.readFileSync(pocketTubeFilePath, {encoding: 'utf-8'}))
        const jsonObjectKeys = Object.keys(data)
        const profileList = []
        for (let i = 0; i < jsonObjectKeys.length; i++) {
            if (jsonObjectKeys[i] === "ysc_collection") {
                break
            }
            const profile = jsonObjectKeys[i]
            const channelArray = data[profile]
            const newProfile = {
                name: profile,
                bgColor: '#C51162',
                textColor: '#FFFFFF',
                subscriptions: [],
                _id: this.generateId(16)
            }
            for (let j = 0; j <channelArray.length; j++) {
                let channelId = channelArray[j]
                const channelData = await this.getChannelInformation(channelId)
                    const channel = {
                        id: channelId,
                        name: channelData.author,
                        thumbnail: channelData.authorThumbnails[0].url
                    }
                    newProfile.subscriptions.push(channel)
            }
            profileList.push(newProfile)
        }
        this.writeSubscriptionsToNewProfile(profileList, ftFilePath)
    }
    static async getChannelInformation(channelId){
        const data = await ytch.getChannelInfo(channelId)
        return data
    }
    // adds the subscriptions all into one profile instead of to the dedicated profiles
    static writeSubscriptionsToNewProfile(jsonProfiles, filepath) {
        jsonProfiles.forEach((jsonProfile) => {
            fs.appendFile(filepath, JSON.stringify(jsonProfile) + '\n', (err) => {
                if (err) throw err;
            });
        })
    }
}
module.exports = PockettubeConverter


