const getRecipientEmail = (user,userLoggedIn) => 
    user?.filter((userToFilter) => userToFilter !== userLoggedIn?.email)[0];
    // console.log(user.filter((user) => userLoggedIn !== userLoggedIn.email))
    // console.log(userLoggedIn)
   


// user?.filter(user => user !==userLoggedIn?.email[0] )

export default getRecipientEmail;