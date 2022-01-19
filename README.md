# <p align="center"><img src="https://github.com/imvincenth/RingIn/blob/master/app/assets/images/namelogo.svg" /></p>
<a href="https://ringedin.herokuapp.com/#/" target="_blank"><img style="width: 100%" src="https://github.com/imvincenth/RingIn/blob/master/app/assets/images/homepage.gif" /></a>

<strong>RingIn</strong> is a full stack LinkedIn clone themed around J. R. R. Tolkien's <em>The Lord of the Rings</em> series. Users are able to create their own accounts, to which they are able to add their work <em>experience</em>, <em>education</em>, a <em>profile picture</em> and a <em>banner photo</em>. Like LinkedIn, users can create <em>posts</em> and <em>comments</em> with optionally attached photo or video, and make <em>reactions</em> to their own posts/comments or the posts/comments of other users. Users can use the <em>search feature</em> to find other users, see their profile, experiences, and education, as well as send them a <em>connection request</em>. Users are able to utilize the <em>network manager</em> component to see their sent and received connection requests, from which they are also able to accept or ignore incoming requests or withdraw their pending sent connections.

<strong>Check out [RingIn](https://ringedin.herokuapp.com/#/)!</strong>

## Technologies
* React, Redux, Javascript, HTML, CSS
* Ruby, Ruby on Rails
* PostgreSQL
* Amazon S3
* Webpack, Babel

## Features

### User Authentication

Users create their accounts by going through a multi-step sign up process. During which, they also either create a work experience or education that will be displayed on their profile for other users to see.

* The first page requires a valid email address and password of at least 6 characters.
* The second page prompts the user for their first and last names.
* The third page for the user's location details.
* The last page is where the user can choose between signing up with either an experience or an education.
<img style="width: 100%" src="https://github.com/imvincenth/RingIn/blob/master/app/assets/images/signup.gif" />

### User Feed

This is where users can view posts made by other users, create posts, attach a photo or video to their post, edit or delete their own posts, comment on posts, reply to comments, edit or delete their own comments.
