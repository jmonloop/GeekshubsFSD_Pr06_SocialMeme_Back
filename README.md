## Endpoints
* USERS

REGISTER

    https://socialmeme.herokuapp.com/users/register (post)

    Body required:
        {
        "email":"juan@gmail.com",
        "password":"1234",
         "nickname": "juan",
         "rating": [],
         "avatar": "",
         "followed": []
    }

LOGIN

     https://socialmeme.herokuapp.com/users/login (post)

    Body required:
    {
        "email":"juanma3@gmail.com",
        "password":"1234"
    }

GET USER

     https://socialmeme.herokuapp.com/users/profile/<userId> (get)

MODIFY USER

     https://socialmeme.herokuapp.com/users/profile/<userId> (put)

DELETE USER

    https://socialmeme.herokuapp.com/users/profile/<userId> (delete)

GET USER AVERAGE RATING

     https://socialmeme.herokuapp.com/users/profile/rating/<userId> (get)

FOLLOW USER

    https://socialmeme.herokuapp.com/users/actions/follow?followedId=<followedUserId>&userId=<userId> (put)

UNFOLLOW USER

    https://socialmeme.herokuapp.com/users/actions/unfollow?unfollowedId=<followedUserId>Id=<userId>