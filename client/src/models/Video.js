export class Video{
    constructor(data){
        this.id = data.id
        this.videoUrl = `${data.videoUrl}&parent=localhost`
        this.accountId = data.accountId
        this.title = data.title || 'Untitled Video'
        this.createdAt = new Date(data.createdAt)
    }
}