// Implement the SocialNetwork class here
class SocialNetwork {

  constructor() {
    this.users = {};    // to store user objects { id: 1, name: `John Doe` }
    this.follows = {};  // to store follow relationships { 1: Set {2, 3}}
    this.currentID = 0; // to assign unique IDs incrementally
  }

  addUser(name) {
    this.currentID += 1; // increment ID
    const userID = this.currentID;
    this.users[userID] = { id: userID, name }; // store user object
    this.follows[userID] = new Set(); // initialise an empty set for follows
    return userID;
  }

  getUser(userID) {
    return this.users[userID] || null;
  }

  follow(userID1, userID2) {
    if (this.users[userID1] && this.users[userID2]) {
      this.follows[userID1].add(userID2); // add userID2 to the follow set of userID1
      return true;
    }
    return false;
  }

  getFollows(userID) {
    return this.follows[userID] || new Set();
  }

  getFollowers(userID) {
    const followers = new Set();

    for (let followerID in this.follows) {
      if (this.follows[followerID].has(userID)) {
        followers.add(parseInt(followerID));
      }
    }

    return followers;
  }

  getRecommendedFollows(userID, degrees) {
    // Your code here
  }
}

module.exports = SocialNetwork;
