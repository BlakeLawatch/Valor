export class Profile{
    constructor(data){
        this.id = data.id
        this.name = data.name
        this.picture = data.picture
        this.bio = data.bio
        this.coverImg = data.coverImg || 'https://images.unsplash.com/photo-1620870300436-a70b605f6ebe?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fGJhbWJvb3xlbnwwfHwwfHx8MA%3D%3D'
        this.twitchUrl = data.twitchUrl
        this.youtubeUrl = data.youtubeUrl
        this.twitterUrl = data.twitterUrl
        this. facebookUrl = data.facebookUrl
        this.instagramUrl = data.instagramUrl
        this.websiteUrl = data.websiteUrl
    }
}