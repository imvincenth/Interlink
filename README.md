# <p align="center"><img src="https://github.com/imvincenth/RingIn/blob/master/app/assets/images/namelogo.svg" /></p>
<a href="https://ringedin.herokuapp.com/#/" target="_blank"><img style="width: 100%" src="https://github.com/imvincenth/RingIn/blob/master/app/assets/images/homepage.gif" /></a>

<strong>RingIn</strong> is a full stack LinkedIn clone themed around J. R. R. Tolkien's <em>The Lord of the Rings</em> series. Users are able to create their own accounts, to which they are able to add their work <em>experience</em>, <em>education</em>, a <em>profile picture</em> and a <em>banner photo</em>. Like LinkedIn, users can create <em>posts</em> and <em>comments</em> with optionally attached photo or video, and make <em>reactions</em> to their own posts/comments or the posts/comments of other users. Users can use the <em>search feature</em> to find other users, see their profile, experiences, and education, as well as send them a <em>connection request</em>. Users are able to utilize the <em>network manager</em> component to see their sent and received connection requests, from which they are also able to accept or ignore incoming requests or withdraw their pending sent connections.

<p align="center"><strong>Check out <a href="https://ringedin.herokuapp.com/#/">RingIn</a>!</strong></p>

## Technologies
* React, Redux, Javascript, HTML, CSS
* Ruby, Ruby on Rails
* PostgreSQL
* Amazon S3
* Webpack, Babel

## Features

### User Authentication (Users: Create, Read)

Users create their accounts by going through a multi-step sign up process. During which, they also either create a work experience or education that will be displayed on their profile for other users to see.

* The first page requires a valid email address and password of at least 6 characters.
* The second page prompts the user for their first and last names.
* The third page for the user's location details.
* The last page is where the user can choose between signing up with either an experience or an education.

<img style="width: 100%" src="https://github.com/imvincenth/RingIn/blob/master/app/assets/images/signup.gif" />

### Search Bar (Connections: CRUD)

Users can utilize the search bar to find and connect with other users.

* When there is no input into the search field, a list of recommended results will appear
* As the user fills in the search field, suggestions will display a filtered list users matching the input
* Clicking on a search result in the suggestions box will bring the current user to that user's profile page
* Hitting enter or choosing the <em>see all results</em> option will open the search results page
* From the search results page the user can send/accept/ignore connection requests

<img style="width: 100%" src="https://github.com/imvincenth/RingIn/blob/master/app/assets/images/signup.gif" />

### User Feed (Posts, Comments, Reactions: CRUD)

This is where users can view posts made by other users, create posts, attach a photo or video to their post, edit or delete their own posts, comment on posts, reply to comments, edit or delete their own comments. Users may also choose to create, change, or remove a reaction to a post or comment.

* Selecting the <em>Start a post</em> option will open a modal from which the user can draft their post, add a photo, or video.
* The photo and video options underneath will immediately prompt the user to add their chosen media type to a post.
* If a post/comment is made by the current user, they will be able to access the edit option through the dropdown menu opened from the three dots at the top right.
* Clicking on an image or video attached to the post will open a post show modal.
* Hovering over the <em>Like</em> option will open a dock from which the user can select or change their reaction to a post or comment.
* The user can see the number of comments on a post, the number of replies to a comment, the number of reactions on the post/comment, whether or not the post/comment has been edited, as well as how long ago the post/comment was created.

<img style="width: 100%" src="https://github.com/imvincenth/RingIn/blob/master/app/assets/images/signup.gif" />

### Network Manager (Connections: Read, Update, Delete)

From the network tab, users will be able to accept or ignore incoming connection requests, view all their existing connections and disconnect them, view all their sent connection request and withdraw them.

* The starting page is where the user is able to accept or ignore connection requests sent to the current user.
* If there are more than 3 incoming requests a <em>Show more</em> tab will be toggleable.
* Clicking on the <em>Connections</em> option under Manage my network redirects the user to the connections page.
* <em>See all</em> redirects the user to the invitations page from which they can select and view all received or sent connection requests.

<img style="width: 100%" src="https://github.com/imvincenth/RingIn/blob/master/app/assets/images/signup.gif" />

### Profile (Users: Update)(Connections, Experiences, Educations: CRUD)

Users can add a profile picture or banner to their own profiles, create, edit, and delete their own work experiences and educations, and view the profiles of other users.

* To change the banner, the user can select an image file from the top right camera icon.
* To change the profile, the user can select an image file by clicking on the existing profile picture (or where the profile picture should be)
* From the profile edit modal that is opened by clicking on the quill, the user can change their first and last names, headline, and location.
* From the <em>Add section</em> dropdown menu or by clicking the plus sign, the user can choose to add an experience or education to their profile.
* In the list of experiences and educations, the user can choose to edit or delete their experience and/or education by clicking on the quill.

<img style="width: 100%" src="https://github.com/imvincenth/RingIn/blob/master/app/assets/images/signup.gif" />
