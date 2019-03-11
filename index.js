var Twitter = require('twitter');
const {consumer_key, consumer_secret, access_token_key, access_token_secret} = require('./config');

var client = new Twitter({
  consumer_key: consumer_key,
  consumer_secret: consumer_secret,
  access_token_key: access_token_key,
  access_token_secret: access_token_secret
});

var params = {screen_name: 'SaumyaTiwari29'};
var one_way_following = [];
var users_to_display = [];
client.get('followers/ids', params, function(error, followers_result, response) {
  if (error)
    throw error;

  followers = followers_result.ids;

  client.get('friends/ids', params, function(error, following_result, response){
    if(error)
      throw error;

  following = following_result.ids;

  following.forEach(function(person) {
    if(followers.indexOf(person) === -1) {
      one_way_following.push(person);
    }
  });

  //One take first hundred users
  one_way_following = one_way_following.slice(0,99);
  //Turn array into a string
  one_way_following_string = one_way_following.join();

  client.get('users/lookup', {user_id: one_way_following_string}, function(error, user_results, response){
    user_results.forEach(function(user){
      var userObject = {
        name: user.name,
        screen_name: user.screen_name,
        avatar: user.profile_image_url
      };
      users_to_display.push(userObject);
    });
    console.log(users_to_display);
  });
  });
});

//Get a list of followers
//Get a list of following
//Iterate through the following,seeing who is not a follower
//Display the list