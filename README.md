## Endpoints
* USERS

REGISTER (through body)

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

LOGIN (through body)

     https://socialmeme.herokuapp.com/users/login (post)

    Body required:
    {
        "email":"juanma3@gmail.com",
        "password":"1234"
    }

GET USER (through params)

     https://socialmeme.herokuapp.com/users/profile/<userId> (get)

UPDATE USER (through body)

     https://socialmeme.herokuapp.com/users/profile/update/<userId> (put)

DELETE USER (through params)

    https://socialmeme.herokuapp.com/users/profile/delete/<userId> (delete)

GET USER AVERAGE RATING (through params)

     https://socialmeme.herokuapp.com/users/profile/rating/<userId> (get)

FOLLOW USER (through query)

    https://socialmeme.herokuapp.com/users/actions/follow?followedId=<followedUserId>&userId=<userId> (put)

UNFOLLOW USER (through query)

    https://socialmeme.herokuapp.com/users/actions/unfollow?unfollowedId=<followedUserId>userId=<userId>
