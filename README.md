## Purpose
This project feeds data to FSD Geekshubs Academy Bootcamp, <a href='https://github.com/suku60/frontend-project-6'>Project 6</a>

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

     https://socialmeme.herokuapp.com/users/get?id=<userID> (get)



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

    https://socialmeme.herokuapp.com/users/getRating?id=<userID> (get)
 

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

https://socialmeme.herokuapp.com/posts/create (post)

    {
        "ownerId": "623a1a762be74bc5a33f6df5",
        "ownerNickname": "javidafacker",
        "title": "Santa's secret",
        "img": "https://i.imgur.com/vEP1qu8.jpg",
        "text": "All Through the House, Love Death and Robots episode",
        "keywords":["santa", "secret", "christmas"]
    }

### GET

    https://socialmeme.herokuapp.com/posts/get?postId=<postID> (get)


### DELETE

    https://socialmeme.herokuapp.com/posts/delete?postId=<postID> (delete)


### UPDATE

Generic for updating any field except Ids or owner.

    https://socialmeme.herokuapp.com/posts/update (put)

    {
        "postId": "623db28dd29d9acbb2a94b47",
        "title": "MOD",
        "img": "https://i.imgur.com/vEP1qu8.jpg",
        "text": "MOD TITLE",
        "keywords":["animals", "nature", "mountain"]
    }


### UPDATE TITLE

    https://socialmeme.herokuapp.com/posts/actions/updateTitle (put)

    {
        "postId": "623e189585f0553698ee33e2",
        "title": "New Title"
    }


### UPDATE IMAGE

    https://socialmeme.herokuapp.com/posts/actions/updateImg (put)

    {
        "postId": "623e189585f0553698ee33e2",
        "img": "https://i.imgur.com/vEP1qu8.jpg"
    }

### UPDATE TEXT

    https://socialmeme.herokuapp.com/posts/actions/updateText (put)

    {
        "postId": "623e189585f0553698ee33e2",
        "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris"
    }

### ADD RATING

    https://socialmeme.herokuapp.com/posts/actions/addRating (put)

    {
        "postId": "623e189585f0553698ee33e2",
        "raterId": "623adacbe296c2eaecfd3867",
        "raterNickname": "robert",
        "rate": 5
    }


### GET AVERAGE RATING

    https://socialmeme.herokuapp.com/posts/actions/getRating?postId=<postID> (get)


### UPDATE KEYWORDS

    https://socialmeme.herokuapp.com/posts/actions/updateKeywords (put)

    {
        "postId": "623e189585f0553698ee33e2",
        "keywords": ["mode", "mod2"]
    }


### ADD COMMENT

    https://socialmeme.herokuapp.com/posts/actions/addComment (put)

    {
        "postId": "623e189585f0553698ee33e2",
        "ownerId": "623a1a762be74bc5a33f6df5",
        "ownerNickname": "juanma",
        "comment": "This is the first post comment"
    }

### GET ALL COMMENTS

    https://socialmeme.herokuapp.com/posts/actions/getAllComments?postId=<postID> (get)


### GET SPECIFIC COMMENT

    https://socialmeme.herokuapp.com/posts/actions/getComment?postId=<postID>&commentId=<commentID> (get)



### DELETE COMMENT

    https://socialmeme.herokuapp.com/posts/actions/deleteComment?postId=<postID>&commentID=<commentID> (put)



### UPDATE COMMENT

    https://socialmeme.herokuapp.com/posts/actions/updateComment (put)

    {
        "postId": "623e189585f0553698ee33e2",
        "commentId": "623e301e4faf01f3fe17a0c1",
        "comment": "This is an updated commentary"
    }

### ADD COMMENT RATING

    https://socialmeme.herokuapp.com/posts/actions/addCommentRating (put)

    {
        "postId": "623e189585f0553698ee33e2",
        "commentId": "623e301e4faf01f3fe17a0c1",
        "raterId": "623adacbe296c2eaecfd3867",
        "raterNickname": "robert",
        "rate": 5
    }

### GET COMMENT AVERAGE RATING

    https://socialmeme.herokuapp.com/posts/actions/getCommentRating?postId=<postID>&commentId=<commentID> (get)


### ADD ANSWER TO COMMENT

    https://socialmeme.herokuapp.com/posts/actions/addCommentAnswer (put)

    {
        "postId": "623e189585f0553698ee33e2",
        "commentId": "623e301e4faf01f3fe17a0c1",
        "ownerId": "623adae1e296c2eaecfd386d",
        "ownerNickname": "Raquel",
        "answer": "Now Raquel answers"
    }

### DELETE ANSWER

    https://socialmeme.herokuapp.com/posts/actions/deleteCommentAnswer?postId=<postID>&commentId=<commentID>&answerId=<answerID> (put)


### UPDATE ANSWER

    https://socialmeme.herokuapp.com/posts/actions/updateCommentAnswer (put)

    {
        "postId": "623e189585f0553698ee33e2",
        "commentId": "623e301e4faf01f3fe17a0c1",
        "answerId": "623e493afe186462bd33eaeb",
        "answer": "I am an updated answer"
    }

### GET SPECIFIC ANSWER FROM A COMMENT

    https://socialmeme.herokuapp.com/posts/actions/getCommentAnswer?postId=<postID>&commentId=<commentID>&answerId=<answerID> (get)


### GET ALL ANSWERS FROM A COMMENT

    https://socialmeme.herokuapp.com/posts/actions/getAllCommentAnswers?postId=<postID>&commentId=<commentID> (get)


### GET ALL POSTS FROM A USER

    https://socialmeme.herokuapp.com/posts/actions/getPostsByUser?ownerId=<ownerID> (get)

### FIND USERS AND POSTS BY TERM
Searches introduced string chain into users, posts, comments and answers fields.

    https://socialmeme.herokuapp.com/posts/actions/find?tern=<searchingterm> (get)


