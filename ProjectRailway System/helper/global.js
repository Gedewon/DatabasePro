var user ={
    userId : 'null', 
    userType : 'null'
}


module.exports = {
    set : function(id,type) {
        user.userId=id
        user.userType = type 
    },
    get : function(){return user}
}