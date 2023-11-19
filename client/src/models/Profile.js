export class Profile{
    constructor(data){
        this.id = data.id
        this.name = data.name
        this.picture = data.picture
        this.bio = data.bio
        this.coverImg = data.coverImg || '/src/assets/img/valorPanda.png'
        this.twitchUrl = data.twitchUrl
        this.youtubeUrl = data.youtubeUrl
        this.twitterUrl = data.twitterUrl
        this.facebookUrl = data.facebookUrl
        this.instagramUrl = data.instagramUrl
        this.websiteUrl = data.websiteUrl
    }

    get hasSocials(){
      if(this.twitchUrl || this.youtubeUrl || this.twitterUrl || this.facebookUrl || this.instagramUrl || this.websiteUrl){
        return true
      }
      return false
    }
}