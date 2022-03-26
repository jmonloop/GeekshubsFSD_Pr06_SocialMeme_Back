## Endpoints

* [POSTS](#posts)

* USERS

[Register](#register)

[Login](#login)

[Get User](#get-user)

[Update User Email](#update-user-email)

[Delete User](#delete-user)

[Get User Average Rating](#get-user-average-rating)

[Follow Another User](#follow-another-user)

[Unfollow Another User](#unfollow-another-user)




### REGISTER

    https://socialmeme.herokuapp.com/users/register (post)

    Body example:
    {
        "email":"juan@gmail.com",
        "password":"1234",
         "nickname": "juan",
         "rating": [],
         "avatar": "",
         "followed": []
    }

### LOGIN

     https://socialmeme.herokuapp.com/users/login (post)

    Body example:
    {
        "email":"juanma3@gmail.com",
        "password":"1234"
    }

### GET USER

     https://socialmeme.herokuapp.com/users/get (get)

    {
        "id":"623a19e12be74bc5a33f6df2"
    }

### UPDATE USER EMAIL

     https://socialmeme.herokuapp.com/users/updateEmail (put) AUTH

     {
        "id":"623a19e12be74bc5a33f6df2",
        "email":"nuevo@gmail.com"
    }

### DELETE USER

    https://socialmeme.herokuapp.com/users/profile/delete (delete) AUTH

    {
        "id": "623ae01662104984869490a6"
    }

### GET USER AVERAGE RATING

    https://socialmeme.herokuapp.com/users/getRating (get)

    {
        "id":"623a1a762be74bc5a33f6df5"
    }   

### FOLLOW ANOTHER USER

    https://socialmeme.herokuapp.com/users/actions/follow (put) AUTH

    {
        "followedId":"623ae01662104984869490a6",
        "followedNickname":"aida",
        "userId":"623ae0e26612cdd3fb8a9838"
    }

### UNFOLLOW ANOTHER USER

    https://socialmeme.herokuapp.com/users/actions/unfollow (put) AUTH

    {
        "followedId":"623ae01662104984869490a6",
        "userId":"623ae0e26612cdd3fb8a9838"
    }


## POSTS

[Create](#create)

[Get](#get)

[Delete](#delete)

[Update](#update)

[Update Title](#update-title)

[Update Image](#update-image)

[Update Text](#update-text)

[Add Rating](#add-rating)

[Get Average Rating](#get-average-rating)

[Update Keywords](#update-keywords)

[Add Comment](#add-comment)

[Get All Comments](#get-all-comments)

[Get Specific Comment](#get-specific-comment)

[Delete Comment](#delete-comment)

[Update Comment](#update-comment)

[Add Comment Rating](#add-comment-rating)

[Get Comment Average Rating](#get-comment-average-rating)

[Add Answer To Comment](#add-answer-to-comment)

[Delete Answer](#delete-answer)

[Update Answer](#update-answer)

[Get Specific Answer From a Comment](#get-specific-answer-from-a-comment)

[Get All Answers From a Comment](#get-all-answers-from-a-comment)

[Get All Posts From a User](#get-all-posts-from-a-user)

[Find Users And Posts By Term](#find-users-and-posts-by-term)




### CREATE

https://socialmeme.herokuapp.com/posts/create

    {
        "ownerId": "623a1a762be74bc5a33f6df5",
        "ownerNickname": "javidafacker",
        "title": "TITULO DEL POST",
        "img": "https://i.imgur.com/vEP1qu8.jpg",
        "text": "Soy el contenido del post",
        "keywords":["animales", "nieve", "navidad"]
    }

### GET
https://socialmeme.herokuapp.com/posts/get

    {
        "postId": "623db28dd29d9acbb2a94b47"
    }

### DELETE
https://socialmeme.herokuapp.com/posts/delete

    {
        "postId": "623db28dd29d9acbb2a94b47"
    }

### UPDATE

Generic for updating any field except Ids or owner.
https://socialmeme.herokuapp.com/posts/update

    {
        "postId": "623db28dd29d9acbb2a94b47",
        "title": "MOD",
        "img": "https://i.imgur.com/vEP1qu8.jpg",
        "text": "TITULO MOD",
        "keywords":["animales", "nieve", "navidad"]
    }


### UPDATE TITLE
https://socialmeme.herokuapp.com/posts/actions/updateTitle

    {
        "postId": "623e189585f0553698ee33e2",
        "title": "New Title"
    }


### UPDATE IMAGE
https://socialmeme.herokuapp.com/posts/actions/updateImg

    {
        "postId": "623e189585f0553698ee33e2",
        "img": "httpxzcccccjpg"
    }

### UPDATE TEXT
https://socialmeme.herokuapp.com/posts/actions/updateText

    {
        "postId": "623e189585f0553698ee33e2",
        "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris"
    }

### ADD RATING
https://socialmeme.herokuapp.com/posts/actions/addRating

    {
        "postId": "623e189585f0553698ee33e2",
        "raterId": "623adacbe296c2eaecfd3867",
        "raterNickname": "roberto",
        "rate": 5
    }


### GET AVERAGE RATING
https://socialmeme.herokuapp.com/posts/actions/getRating

    {
        "postId": "623db28dd29d9acbb2a94b47"
    }

### UPDATE KEYWORDS
https://socialmeme.herokuapp.com/posts/actions/updateKeywords

    {
        "postId": "623e189585f0553698ee33e2",
        "keywords": ["mode", "mod2"]
    }


### ADD COMMENT
https://socialmeme.herokuapp.com/posts/actions/addComment

    {
        "postId": "623e189585f0553698ee33e2",
        "ownerId": "623a1a762be74bc5a33f6df5",
        "ownerNickname": "juanmadafacker",
        "comment": "This is the first post comment"
    }

### GET ALL COMMENTS
https://socialmeme.herokuapp.com/posts/actions/getAllComments

    {
        "postId": "623e189585f0553698ee33e2"
    }


### GET SPECIFIC COMMENT
https://socialmeme.herokuapp.com/posts/actions/getComment

    {
        "postId": "623e189585f0553698ee33e2",
        "commentId": "623e301e4faf01f3fe17a0c1"
    }


### DELETE COMMENT
https://socialmeme.herokuapp.com/posts/actions/deleteComment

    {
        "postId": "623e189585f0553698ee33e2",
        "commentId": "623e284faadceea976ee54bf"
    }


### UPDATE COMMENT
https://socialmeme.herokuapp.com/posts/actions/updateComment

    {
        "postId": "623e189585f0553698ee33e2",
        "commentId": "623e301e4faf01f3fe17a0c1",
        "comment": "This is an updated commentary"
    }

### ADD COMMENT RATING
https://socialmeme.herokuapp.com/posts/actions/addCommentRating

    {
        "postId": "623e189585f0553698ee33e2",
        "commentId": "623e301e4faf01f3fe17a0c1",
        "raterId": "623adacbe296c2eaecfd3867",
        "raterNickname": "robertofacker",
        "rate": 5
    }

### GET COMMENT AVERAGE RATING
https://socialmeme.herokuapp.com/posts/actions/getCommentRating

    {
        "postId": "623e189585f0553698ee33e2",
        "commentId": "623e301e4faf01f3fe17a0c1"
    }

### ADD ANSWER TO COMMENT
https://socialmeme.herokuapp.com/posts/actions/addCommentAnswer

    {
        "postId": "623e189585f0553698ee33e2",
        "commentId": "623e301e4faf01f3fe17a0c1",
        "ownerId": "623adae1e296c2eaecfd386d",
        "ownerNickname": "Raquel",
        "answer": "Ahora responda Raquel"
    }

### DELETE ANSWER
https://socialmeme.herokuapp.com/posts/actions/deleteCommentAnswer

    {
        "postId": "623e189585f0553698ee33e2",
        "commentId": "623e301e4faf01f3fe17a0c1",
        "answerId": "623e4912fe186462bd33eae8"
    }

### UPDATE ANSWER
https://socialmeme.herokuapp.com/posts/actions/updateCommentAnswer

    {
        "postId": "623e189585f0553698ee33e2",
        "commentId": "623e301e4faf01f3fe17a0c1",
        "answerId": "623e493afe186462bd33eaeb",
        "answer": "soy la modificación de la respuesta!!!!!"
    }

### GET SPECIFIC ANSWER FROM A COMMENT
https://socialmeme.herokuapp.com/posts/actions/getCommentAnswer

    {
        "postId": "623e189585f0553698ee33e2",
        "commentId": "623e301e4faf01f3fe17a0c1",
        "answerId": "623e493afe186462bd33eaeb"
    }

### GET ALL ANSWERS FROM A COMMENT
https://socialmeme.herokuapp.com/posts/actions/getAllCommentAnswers

    {
        "postId": "623e189585f0553698ee33e2",
        "commentId": "623e301e4faf01f3fe17a0c1"
    }

### GET ALL POSTS FROM A USER
https://socialmeme.herokuapp.com/posts/actions/getPostsByUser

    {
        "ownerId": "623a1a762be74bc5a33f6df5"
    }

### FIND USERS AND POSTS BY TERM
Searches introduced string chain in all fields of users, posts, comments and answers.
https://socialmeme.herokuapp.com/posts/actions/find
    {
    "term": "de"
    }

