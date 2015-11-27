import Firebase from 'firebase';

var ref = new Firebase('https://relate-chat.firebaseio.com');
var cachedUser = null;
var defaultAvatar = "https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=0ahUKEwj8vP-89qvJAhUFND4KHZUcCfsQjRwIBw&url=https%3A%2F%2Fwww.windowssearch-exp.com%2Fimages%2Fsearch%3Fq%3DGeneric%2BAvatar%2BIcon%26FORM%3DRESTAB&bvm=bv.108194040,d.dmo&psig=AFQjCNHfwa9pdTV5GiKX4Uor0iwuf-0u-Q&ust=1448552965480820";

var addNewUserToFB = function(newUser){
  var key = newUser.uid;
  ref.child('users').child(key).set(newUser);
};

var firebaseAuthUtils = {
  createUser: function(user, cb) {
    ref.createUser(user, function(err) {
      if (err) {
        switch (err.code) {
          case "EMAIL_TAKEN":
            console.log("The new user account cannot be created because the email is already in use.");
            break;
          case "INVALID_EMAIL":
            console.log("The specified email is not a valid email.");
            break;
          default:
            console.log("Error creating user:", err);
        }
      } else {
          console.log("Successfully created user account with uid:", userData.uid)
          this.loginWithPW(user, function(authData){
            addNewUserToFB({
              avatar: defaultAvatar,
              email: user.email,
              name: user.name,
              uid: authData.uid,
              token: authData.token
            });
          }, cb); // all this callback does when you call createUser from somewhere, is pass in function(result){ if(result) // change state to dashboard}
      }
    }.bind(this));
  },
  loginWithPW: function(userObj, cb, cbOnRegister){ // this cb needs to be - change the route to the dashboard when the user successfully logs in, pass that user through
    ref.authWithPassword(userObj, function(err, authData){
      if(err){
        console.log('Error on login:', err.message);
        cbOnRegister && cbOnRegister(false);
      } else {
        console.log('This user is logged in, hooray! And here is their authData:', authData)
        authData.email = userObj.email;
        cachedUser = authData;
        cb(authData);
        this.onChange(true);
        cbOnRegister && cbOnRegister(true);
      }
    }.bind(this));
  },
  isLoggedIn: function(){
    return cachedUser && true || ref.getAuth() || false;
  },
  logout: function(){
    ref.unauth();
    cachedUser = null;
    this.onChange(false);
  }
};

module.exports = firebaseAuthUtils;


// Notes from Tyler's talk on Auth and Firebase - https://www.youtube.com/watch?v=jzkQXlvpvHU

// var saveNewUser = function(userObj) {
//   ref.child('users').child(userObj.id).set(userObj);
// }
//
// this.isLoggedIn = function() {
//   return !!ref.getAuth();
// }
//
// this.loginWithPW = function(userObj, cb, cbOnReg) {
//   ref.authWithPassword(userObj, function(err, authData) {
//     if (err) {
//       console.log("error!");
//     } else {
//       authData.email = userObj.email;
//       this.user = authData;
//       // this callback user routes to the next route, the dashboard of the logged in user
//       cb(authData);
//       cbOnReg && cbOnReg(true); // if this is passed in, which happens only on register, invoke it
//     }
//   }.bind(this));
// }
//
// // here is the cb function
// loginWithPW(userObj, function() {
//   // change routes to the dashboard when the user is logged in
// })
//
// // user here is just an object with email and password
// this.createUser = function(user, cb) {
//   ref.createUser(user, function(error, userData) {
//     if (error) {
//       switch (error.code) {
//         case "EMAIL_TAKEN":
//           console.log("The new user account cannot be created because the email is already in use.");
//           break;
//         case "INVALID_EMAIL":
//           console.log("The specified email is not a valid email.");
//           break;
//         default:
//           console.log("Error creating user:", error);
//       }
//     } else {
//         console.log("Successfully created user account with uid:", userData.uid)
//         this.loginWithPW(user, function(authData){
//           saveNewUser(authData);
//         }, cb); // all this callback does when you call createUser from somewhere, is pass in function(result){ if(result) // change state to dashboard}
//     }
//   }.bind(this));
// }
