class ProfileInfo {
  image: string;
  profilePicture: string;
  profileDesc: string;
  tagName: string;
  displayName: string;
  followCount:Number;
  beingFollowCount:Number;
  tweetCount:Number;
  constructor(
    image: string,
    profilePicture: string,
    profileDesc: string,
    tagName: string,
    displayName: string,
    followCount:Number,
     beingFollowCount:Number,
     tweetCount:Number,
  ) {
  this.image=image;
  this.profilePicture=profilePicture;
  this.profileDesc=profileDesc;
  this.tagName=tagName;
  this.displayName=displayName;
  this.followCount=followCount;
  this.beingFollowCount=beingFollowCount;
  this.tweetCount=tweetCount;
}
}
export { ProfileInfo };

