const fs = require('fs')
class HistoryConverter {

    static getJSONDataFromFile(filepath) {
        const data = fs.readFileSync(filepath, {encoding: 'utf-8'})
        const dataArray = data.split('\n')
        const jsonArray = []
        const videoIdArray = []
        dataArray.forEach((historyElement) => {
            if (historyElement === '') {
                // filter a potential empty line out
                return
            }
            const jsonData = JSON.parse(historyElement)
            videoIdArray.push(jsonData.videoId)
            jsonArray.push(jsonData)
        })
        return [jsonArray, videoIdArray]
    }

    static getOldFreeTubeData(filepath) {
        if (!fs.existsSync(filepath)) {
            console.error('Aborting: Filepath for old FreeTube history file does not exist')
            process.exit(1)
        }
        return this.getJSONDataFromFile(filepath)
    }


    static getNewFreeTubeData(filepath) {
        if (!fs.existsSync(filepath)) {
            console.error('Aborting: Filepath for new FreeTube history file does not exist')
            process.exit(1)
        }
        return this.getJSONDataFromFile(filepath)
    }


    static addOldFreeTubeDataToNewFreeTubeData(oldFreeTubeJSON, newFreeTubeVideoIds, newFreeTubeFilePath) {
        oldFreeTubeJSON.forEach((videoElement) => {
            if (newFreeTubeVideoIds.indexOf(videoElement.videoId) !== -1 ||videoElement.published === undefined) {
                // prevent adding videos multiple times and videos that are already in the new file
                return
            }
            delete videoElement.videoThumbnails
            delete videoElement.publishedText
            fs.appendFileSync(newFreeTubeFilePath, JSON.stringify(videoElement) + '\n')
        })
    }

    static convertOldHistoryToNewHistory(oldFreeTubeFilePath, newFreeTubeFilePath) {
        // here we do not need the videoId array
        const oldFreeTubeData = this.getOldFreeTubeData(oldFreeTubeFilePath)[0]
        // here we only need the videoId array
        const newFreeTubeDataVideoIds = this.getNewFreeTubeData(newFreeTubeFilePath)[1]
        this.addOldFreeTubeDataToNewFreeTubeData(oldFreeTubeData, newFreeTubeDataVideoIds, newFreeTubeFilePath)
    }
}
module.exports = HistoryConverter


