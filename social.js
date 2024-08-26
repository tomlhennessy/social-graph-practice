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
    // initialise the queue with the starting user's follows
    const queue = [...this.getFollows(userID)]; // spread operator to clone spread into array
    const visited = new Set(queue); // to keep track of visited users (initialised with immediate follows)
    const recommended = new Set(); // to collect recommended users

    // perform BFS up to the specified degree
    for (let i = 0; i < degrees; i++) {
      const levelSize = queue.length // number of users to explore at this level
      for (let j = 0; j < levelSize; j++) {
        const currentUser = queue.shift(); // dequeue the next user
        const follows = this.getFollows(currentUser); // get their follows

        // add follows to the queue and recommended set
        for (let follow of follows) {
          if (!visited.has(follow) && follow !== userID) { // exclude visited and the user themselves
            visited.add(follow); // mark as visited
            queue.push(follow); // enqueue for further exploration
            recommended.add(follow); // add to recommended users
          }
        }
      }
    }

    return Array.from(recommended);
  }

}

module.exports = SocialNetwork;
