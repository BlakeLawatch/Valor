export class Video{
    constructor(data){
        this.id = data.id
        this.videoUrl = data.videoUrl
        this.accountId = data.accountId
        this.title = data.title || 'Untitled Video'
    }
}