export default class AssetManager {

    static ASSETS_BASE_PATH = "/assets"

    static getImg(assetName: string) {
        return `${AssetManager.ASSETS_BASE_PATH}/img/${assetName}.png`
    }

    static getMp3(assetName: string) {
        return `${AssetManager.ASSETS_BASE_PATH}/mp3/${assetName}.mp3`
    }

}