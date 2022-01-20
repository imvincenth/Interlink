# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'open-uri'

User.destroy_all
Experience.destroy_all
Education.destroy_all
Connection.destroy_all
Post.destroy_all
Comment.destroy_all
Reaction.destroy_all

# U S E R S

# Gandalf
demo_user = User.create(
  email: 'gandalf@the.grey', 
  password: 'password', 
  first_name: 'Gandalf', 
  last_name: 'the Grey', 
  headline: 'Servant of the Secret Fire | Wielder of the flame of Anor', 
  country_region: 'Middle-earth', 
  city_district: 'The Shire'
)

fellowshipbanner = open('https://ringin-dev.s3.us-west-1.amazonaws.com/gandalfthewhite.gif')
demo_user.banner.attach(io: fellowshipbanner, filename: 'gandalfthewhite.gif')

gandalf = open('https://ringin-dev.s3.us-west-1.amazonaws.com/gandalf.png')
demo_user.profile_picture.attach(io: gandalf, filename: 'gandalf.png')

demo_exp = Experience.create(
  user_id: 1,
  title: 'Guide',
  employment_type: 'Full-time',
  company: 'Fellowship of the Ring', 
  location: 'Middle-earth',
  start_date: "May 2014", 
  current_role: false, 
  end_date: "May 2020", 
  industry: 'Hero',
  headline: 'Wizard',
  description: 'Protect Frodo'
)

demo_edu = Education.create(
  user_id: 1,
  school: "Hogwarts",
  degree: "Auror",
  subject: "Magic",
  start_date: "August 2014",
  end_date: "October 2020",
  grade: "A",
  extracurriculars: "Quidditch"
)

# Frodo
frodo = User.create(
  email: 'frodo@the.shire', 
  password: 'password', 
  first_name: 'Frodo', 
  last_name: 'Baggins', 
  headline: 'Least Valuable Hobbit', 
  country_region: 'Middle-earth', 
  city_district: 'The Shire'
)

frodobanner = open('https://ringin-dev.s3.us-west-1.amazonaws.com/frodobanner.gif')
frodo.banner.attach(io: frodobanner, filename: 'frodobanner.gif')

frodoportrait = open('https://ringin-dev.s3.us-west-1.amazonaws.com/frodo.jpg')
frodo.profile_picture.attach(io: frodoportrait, filename: 'frodo.jpg')

frodo_exp = Experience.create(
  user_id: 2,
  title: 'Useless Ring Bearer',
  employment_type: 'Full-time',
  company: 'Fellowship of the Ring', 
  location: 'Middle-earth',
  start_date: "May 2014", 
  current_role: false, 
  end_date: "May 2020", 
  industry: 'Getting Carried',
  headline: 'Useless and lost',
  description: 'Protect the Ring'
)

# Samwise
samwise = User.create(
  email: 'samwise@the.shire', 
  password: 'password', 
  first_name: 'Samwise', 
  last_name: 'Gamgee', 
  headline: 'Most Valuable Hobbit', 
  country_region: 'Middle-earth', 
  city_district: 'The Shire'
)

samwisebanner = open('https://ringin-dev.s3.us-west-1.amazonaws.com/samwisebanner.jpg')
samwise.banner.attach(io: samwisebanner, filename: 'samwisebanner.jpg')

samwiseportrait = open('https://ringin-dev.s3.us-west-1.amazonaws.com/samwise.jpg')
samwise.profile_picture.attach(io: samwiseportrait, filename: 'samwise.jpg')

samwise_exp = Experience.create(
  user_id: 3,
  title: 'Bearer of the Ring Bearer',
  employment_type: 'Full-time',
  company: 'Fellowship of the Ring', 
  location: 'Middle-earth',
  start_date: "May 2014", 
  current_role: false, 
  end_date: "May 2020", 
  industry: 'Transportation',
  headline: 'Ring Bearer Bearer',
  description: 'Protect the Ring Bearer'
)

# Aragorn
aragorn = User.create(
  email: 'aragorn@not.strider', 
  password: 'password', 
  first_name: 'Aragorn', 
  last_name: 'II Elessar', 
  headline: 'King of Gondor | Swordmanship | Archery | Fluent Elvish | Bodyguard', 
  country_region: 'Middle-earth', 
  city_district: 'Rivendell'
)

aragornbanner = open('https://ringin-dev.s3.us-west-1.amazonaws.com/aragornbanner.gif')
aragorn.banner.attach(io: aragornbanner, filename: 'aragornbanner.gif')

aragornportrait = open('https://ringin-dev.s3.us-west-1.amazonaws.com/aragorn.jpg')
aragorn.profile_picture.attach(io: aragornportrait, filename: 'aragorn.jpg')

aragorn_exp = Experience.create(
  user_id: 4,
  title: 'Ranger',
  employment_type: 'Self-employed',
  company: 'Funemployed', 
  location: 'Middle-earth',
  start_date: "April 2000", 
  current_role: false, 
  end_date: "May 2014", 
  industry: 'Entrepeneurship',
  headline: 'S T R I D E R',
  description: 'Killed many orcs'
)

aragorn_exp2 = Experience.create(
  user_id: 4,
  title: 'Sword',
  employment_type: 'Full-time',
  company: 'Fellowship of the Ring', 
  location: 'Middle-earth',
  start_date: "May 2014", 
  current_role: false, 
  end_date: "May 2020", 
  industry: 'Security',
  headline: 'Swordsman',
  description: 'Protect the Ring Bearer'
)

aragorn_exp3 = Experience.create(
  user_id: 4,
  title: 'King of Gondor',
  employment_type: 'Full-time',
  company: 'Gondor Kingdomship', 
  location: 'Middle-earth',
  start_date: "May 2020", 
  current_role: true, 
  end_date: "Present", 
  industry: 'Royalty',
  headline: 'Last Chieftain of the Dúnedain of the North, the 26th King of Arnor, 35th King of Gondor and first High King of Gondor and Arnor',
  description: 'Protect the Realm'
)

# Legolas
legolas = User.create(
  email: 'legolas@elf.prince', 
  password: 'password', 
  first_name: 'Legolas', 
  last_name: 'Greenleaf', 
  headline: 'Prince of the Woodland Realm | Archery | React | Node.js | Express | Mongo DB | JavaScript | Ruby | Ruby on Rails | HTML | CSS', 
  country_region: 'Middle-earth', 
  city_district: 'Mirkwood'
)

legolasbanner = open('https://ringin-dev.s3.us-west-1.amazonaws.com/legolasbanner.gif')
legolas.banner.attach(io: legolasbanner, filename: 'legolasbanner.jpg')

legolasportrait = open('https://ringin-dev.s3.us-west-1.amazonaws.com/legolas.jpg')
legolas.profile_picture.attach(io: legolasportrait, filename: 'legolas.jpg')

legolas_exp = Experience.create(
  user_id: 5,
  title: 'Blacksmith',
  employment_type: 'Full-time',
  company: 'Black Pearl Crew', 
  location: 'England',
  start_date: "May 2000", 
  current_role: false, 
  end_date: "May 2014", 
  industry: 'Piracy',
  headline: 'Son of Bootstrap Bill',
  description: 'Defeated Davy Jones and took on his curse'
)

legolas_exp2 = Experience.create(
  user_id: 5,
  title: 'Bow',
  employment_type: 'Full-time',
  company: 'Fellowship of the Ring', 
  location: 'Middle-earth',
  start_date: "May 2014", 
  current_role: false, 
  end_date: "May 2020", 
  industry: 'Security',
  headline: 'Archer',
  description: 'Defeated more orcs than Gimli'
)

legolas_edu = Education.create(
  user_id: 5,
  school: "Woodland Realm",
  degree: "Diplomacy and Archery",
  subject: "Elven Prince",
  start_date: "August 1980",
  end_date: "October 1990",
  grade: "A",
  extracurriculars: ""
)

# Gimli
gimli = User.create(
  email: 'gimli@best.dwarf', 
  password: 'password', 
  first_name: 'Gimli', 
  last_name: 'son of Gloin', 
  headline: "Legolas' BFF", 
  country_region: 'Middle-earth', 
  city_district: 'Mirkwood'
)

gimlibanner = open('https://ringin-dev.s3.us-west-1.amazonaws.com/gimlibanner.jpg')
gimli.banner.attach(io: gimlibanner, filename: 'gimlibanner.jpg')

gimliportrait = open('https://ringin-dev.s3.us-west-1.amazonaws.com/gimli.gif')
gimli.profile_picture.attach(io: gimliportrait, filename: 'gimli.gif')

gimli_exp = Experience.create(
  user_id: 6,
  title: 'Axe',
  employment_type: 'Full-time',
  company: 'Fellowship of the Ring', 
  location: 'Middle-earth',
  start_date: "May 2014", 
  current_role: false, 
  end_date: "May 2020", 
  industry: 'Security',
  headline: 'Axeman',
  description: 'Defeated more orcs than Legolas'
)

# Gollum
gollum= User.create(
  email: 'gollum@not.sméagol', 
  password: 'password', 
  first_name: 'Gollum', 
  last_name: 'Trahald', 
  headline: 'my precious', 
  country_region: 'Middle-earth',
  city_district: 'Gollums cave, Misty Mountains'
)

gollumbanner = open('https://ringin-dev.s3.us-west-1.amazonaws.com/gollumbanner.gif')
gollum.banner.attach(io: gollumbanner, filename: 'gollumbanner.gif')

gollumportrait = open('https://ringin-dev.s3.us-west-1.amazonaws.com/gollum.jpg')
gollum.profile_picture.attach(io: gollumportrait, filename: 'gollum.jpg')

gollum_exp = Experience.create(
  user_id: 7,
  title: 'Stoor Hobbit',
  employment_type: 'Fishing',
  company: 'Hobbit of Stoor',
  location: 'Middle-earth',
  start_date: "April 2000",
  current_role: false, 
  end_date: "May 2014", 
  industry: 'Fisherman',
  headline: '',
  description: 'ate many fishes'
)

gollum_exp2 = Experience.create(
  user_id: 7,
  title: 'Gollum',
  employment_type: 'Ring Bearer',
  company: 'The One Ring',
  location: 'Middle-earth',
  start_date: "April 2000",
  current_role: false,
  end_date: "May 2014",
  industry: 'my precious',
  headline: '',
  description: 'petting the One Ring'
)

gollum_exp3 = Experience.create(
  user_id: 7,
  title: 'Gollum',
  employment_type: 'Guide',
  company: 'Quest of the Ring',
  location: 'Middle-earth',
  start_date: "April 2000",
  current_role: false,
  end_date: "May 2014",
  industry: 'my precious',
  headline: '',
  description: 'Guide to Morder'
)

# Saruman
saruman= User.create(
  email: 'saruman@white.wizard',
  password: 'password',
  first_name: 'Saruman', 
  last_name: 'the White', 
  headline: 'Wizard Watcher of Isengard', 
  country_region: 'Middle-earth',
  city_district: 'Isengard'
)

sarumanbanner = open('https://ringin-dev.s3.us-west-1.amazonaws.com/sarumanbanner.jpg')
saruman.banner.attach(io: sarumanbanner, filename: 'sarumanbanner.jpg')

sarumanportrait = open('https://ringin-dev.s3.us-west-1.amazonaws.com/saruman.gif')
saruman.profile_picture.attach(io: sarumanportrait, filename: 'saruman.gif')

saruman_exp = Experience.create(
  user_id: 8,
  title: 'Watcher of Isengard',
  employment_type: 'Wizard',
  company: 'Isengard',
  location: 'Middle-earth',
  start_date: "April 2000",
  current_role: false, 
  end_date: "May 2014", 
  industry: 'Wizardry',
  headline: 'Spells | Horserider | Swordsman',
  description: ''
)

# Theoden
theoden= User.create(
  email: 'theoden@king.ofrohan', 
  password: 'password', 
  first_name: 'Théoden', 
  last_name: 'Ednew', 
  headline: 'King of Rohan', 
  country_region: 'Middle-earth',
  city_district: 'Helms Deep'
)

theodenbanner = open('https://ringin-dev.s3.us-west-1.amazonaws.com/theodenbanner.jpg')
theoden.banner.attach(io: theodenbanner, filename: 'theodenbanner.jpg')

theodenportrait = open('https://ringin-dev.s3.us-west-1.amazonaws.com/theoden.png')
theoden.profile_picture.attach(io: theodenportrait, filename: 'theoden.png')

theoden_exp = Experience.create(
  user_id: 9,
  title: 'King of Rohan',
  employment_type: 'King',
  company: 'Rohan',
  location: 'Middle-earth',
  start_date: "April 2000",
  current_role: false, 
  end_date: "May 2014", 
  industry: 'Royalty',
  headline: 'Swordsman | Horserider | Father',
  description: 'Saved many a women and children'
)

# Boromir
boromir= User.create(
  email: 'boromir@warrior.gondor',
  password: 'password',
  first_name: 'Boromir',
  last_name: 'son of Denethor II', 
  headline: 'Warrior of Gondor', 
  country_region: 'Middle-earth',
  city_district: 'Gondor'
)

boromirbanner = open('https://ringin-dev.s3.us-west-1.amazonaws.com/boromirbanner.jpg')
boromir.banner.attach(io: boromirbanner, filename: 'boromirbanner.jpg')

boromirportrait = open('https://ringin-dev.s3.us-west-1.amazonaws.com/boromir.jpg')
boromir.profile_picture.attach(io: boromirportrait, filename: 'boromir.jpg')

boromir_exp = Experience.create(
  user_id: 10,
  title: 'Swordsman',
  employment_type: 'Security',
  company: 'Fellowship of the Ring',
  location: 'Middle-earth',
  start_date: "April 2000",
  current_role: false,
  end_date: "May 2014",
  industry: 'Security',
  headline: 'Swordsmanship | Archery',
  description: 'Fired from Security for love of the One Ring'
)

# Elrond
elrond= User.create(
  email: 'elrond@lordof.rivendell',
  password: 'password',
  first_name: 'Elrond',
  last_name: 'son of  Eärendil', 
  headline: 'Lord of Rivendell', 
  country_region: 'Middle-earth',
  city_district: 'Rivendell'
)

elrondbanner = open('https://ringin-dev.s3.us-west-1.amazonaws.com/elrondbanner.jpg')
elrond.banner.attach(io: elrondbanner, filename: 'elrondbanner.jpg')

elrondportrait = open('https://ringin-dev.s3.us-west-1.amazonaws.com/elrond.jpg')
elrond.profile_picture.attach(io: elrondportrait, filename: 'elrond.jpg')

elrond_exp = Experience.create(
  user_id: 11,
  title: 'General',
  employment_type: 'General of the Elves',
  company: 'Last Alliance of Elves and Men',
  location: 'Middle-earth',
  start_date: "April 2000",
  current_role: false,
  end_date: "May 2014",
  industry: 'War',
  headline: 'Swordsmanship | Archery | General',
  description: 'Lead Isildur into heart of Mordor'
)

# Merry and Pippin
merryandpippin= User.create(
  email: 'merryandpippin@hobbitsof.theshire',
  password: 'password',
  first_name: 'Merry and Pippin',
  last_name: 'Brandybuck and Took ',
  headline: 'Hobbits of the Shire',
  country_region: 'Middle-earth',
  city_district: 'The Shire'
)

merryandpippinbanner = open('https://ringin-dev.s3.us-west-1.amazonaws.com/merryandpippin.gif')
merryandpippin.banner.attach(io: merryandpippinbanner, filename: 'merryandpippin.gif')

merryandpippinportrait = open('https://ringin-dev.s3.us-west-1.amazonaws.com/merryandpippin.jpg')
merryandpippin.profile_picture.attach(io: merryandpippinportrait, filename: 'merryandpippin.jpg')

merryandpippin_exp = Experience.create(
  user_id: merryandpippin.id,
  title: 'Hobbits of the Shire',
  employment_type: 'Friendship',
  company: 'Fellowship of the Ring',
  location: 'Middle-earth',
  start_date: "April 2000",
  current_role: false,
  end_date: "May 2014",
  industry: 'Friendship',
  headline: 'Breakfast | Second Breakfast | Elevenses | Luncheon | Afternoon Tea | Dinner | Supper',
  description: 'Helped the trents defeat Saruman'
)



# P O S T S && C O M M E N T S && R E A C T I O N S
post_one = Post.create(
  user_id: elrond.id,
  body: "HIRING: Strangers from distant lands, friends of old. You've been summoned here to answer the threat of Mordor. 
  Middle-Earth stands at the brink of destruction, none can escape it. You will unite or you will fall. 
  You have only one choice, the Ring must be destroyed."
)

reaction_one = Reaction.create(
  reactable_id: post_one.id,
  reactable_type: "Post",
  reactor_id: demo_user.id,
  react_type: "Like"
)

reaction_two = Reaction.create(
  reactable_id: post_one.id,
  reactable_type: "Post",
  reactor_id: legolas.id,
  react_type: "Love"
)

reaction_three = Reaction.create(
  reactable_id: post_one.id,
  reactable_type: "Post",
  reactor_id: gimli.id,
  react_type: "Support"
)

reaction_four = Reaction.create(
  reactable_id: post_one.id,
  reactable_type: "Post",
  reactor_id: frodo.id,
  react_type: "Like"
)

reaction_five = Reaction.create(
  reactable_id: post_one.id,
  reactable_type: "Post",
  reactor_id: samwise.id,
  react_type: "Like"
)

reaction_six = Reaction.create(
  reactable_id: post_one.id,
  reactable_type: "Post",
  reactor_id: aragorn.id,
  react_type: "Support"
)

reaction_seven = Reaction.create(
  reactable_id: post_one.id,
  reactable_type: "Post",
  reactor_id: boromir.id,
  react_type: "Insightful"
)

reaction_eight = Reaction.create(
  reactable_id: post_one.id,
  reactable_type: "Post",
  reactor_id: merryandpippin.id,
  react_type: "Curious"
)

post_one_comment = Comment.create(
  user_id: gimli.id,
  post_id: post_one.id,
  body: "Well what are we waiting for?"
)

post_one_comment_reply = Comment.create(
  user_id: elrond.id,
  reply_id: post_one_comment.id,
  post_id: post_one.id,
  body: "The Ring cannot be destroyed @Gimli son of Gloin by any craft we here possess. 
  The Ring was made in the fires of Mount Doom, only there can it be unmade. 
  It must be taken deep within Mordor and be cast back into the fiery chasm from whence it came. One of you, must do this."
)

post_one_comment_reply_two = Comment.create(
  user_id: merryandpippin.id,
  reply_id: post_one_comment.id,
  post_id: post_one.id,
  body: "Well what if we could just fly the Ring over the volcano and just drop it in? Like if we rode on eagles or something..."
)

post_one_comment_reply_three = Comment.create(
  user_id: boromir.id,
  post_id: post_one.id,
  body: "One does not simply walk into Mordor... its black gates are guarded by more than just orcs. There is evil there that does not sleep. 
  The great eye is ever watchful. It is a barren wasteland, riddled with fire, and ash, and dust. The very air you breath, is a poisonous fume. 
  Not with 10,000 men could you do this. It is folly."
)

post_one_comment_reply_three_reply = Comment.create(
  user_id: merryandpippin.id,
  reply_id: post_one_comment_reply_three.id,
  post_id: post_one.id,
  body: "Yeah uhhh tldr, like we said, a catapult or like eagles... if only one of us could summon them..."
)

post_one_comment_reply_three_reply_two = Comment.create(
  user_id: legolas.id,
  reply_id: post_one_comment_reply_three.id,
  post_id: post_one.id,
  body: "Have you heard nothing Lord Elrond has said? The Ring must be destroyed."
)

post_one_comment_reply_three_reply_two_reply = Comment.create(
  user_id: gimli.id,
  reply_id: post_one_comment_reply_three.id,
  post_id: post_one.id,
  body: "And I suppose you think you're the one to do it."
)

post_one_comment_reply_three_reply_two_reply_two = Comment.create(
  user_id: boromir.id,
  reply_id: post_one_comment_reply_three.id,
  post_id: post_one.id,
  body: "And if we fail, what then? What happens when Sauron takes back what's his?"
)

post_one_comment_reply_three_reply_two_reply_three = Comment.create(
  user_id: merryandpippin.id,
  reply_id: post_one_comment_reply_three.id,
  post_id: post_one.id,
  body: "I don't know, it just seems like, there is a very simple and easy solution to avoid all of the hassle..."
)

post_one_comment_two = Comment.create(
  user_id: frodo.id,
  post_id: post_one.id,
  body: "I will take it."
)

reaction_nine = Reaction.create(
  reactable_id: post_one.id,
  reactable_type: "Comment",
  reactor_id: samwise.id,
  react_type: "Support"
)

reaction_ten = Reaction.create(
  reactable_id: post_one.id,
  reactable_type: "Comment",
  reactor_id: merryandpippin.id,
  react_type: "Love"
)

reaction_eleven = Reaction.create(
  reactable_id: post_one.id,
  reactable_type: "Comment",
  reactor_id: demo_user.id,
  react_type: "Like"
)

post_two = Post.create(
  user_id: frodo.id,
  body: "HIRING: I will take the Ring to Mordor. Though, I do not know the way."
)

post_two_photo = open('https://ringin-dev.s3.us-west-1.amazonaws.com/onering.gif')
post_two.photo.attach(io: post_two_photo, filename: 'onering.gif')

reaction_twelve = Reaction.create(
  reactable_id: post_two.id,
  reactable_type: "Post",
  reactor_id: demo_user.id,
  react_type: "Support"
)

reaction_thirteen = Reaction.create(
  reactable_id: post_two.id,
  reactable_type: "Post",
  reactor_id: elrond.id,
  react_type: "Support"
)

reaction_fourteen = Reaction.create(
  reactable_id: post_two.id,
  reactable_type: "Post",
  reactor_id: aragorn.id,
  react_type: "Support"
)

reaction_fifteen = Reaction.create(
  reactable_id: post_two.id,
  reactable_type: "Post",
  reactor_id: legolas.id,
  react_type: "Support"
)

reaction_sixteen = Reaction.create(
  reactable_id: post_two.id,
  reactable_type: "Post",
  reactor_id: gimli.id,
  react_type: "Support"
)

post_two_reply = Comment.create(
  user_id: demo_user.id,
  post_id: post_two.id,
  body: "I will help you bear this burden @Frodo Baggins, as long as it is yours to bear."
)

reaction_seventeen = Reaction.create(
  reactable_id: post_two_reply.id,
  reactable_type: "Comment",
  reactor_id: frodo.id,
  react_type: "Celebrate"
)

post_two_reply_two = Comment.create(
  user_id: aragorn.id,
  post_id: post_two.id,
  body: "If by my life or death I can protect you, I will. You have my sword."
)

reaction_eighteen = Reaction.create(
  reactable_id: post_two_reply_two.id,
  reactable_type: "Comment",
  reactor_id: frodo.id,
  react_type: "Celebrate"
)

post_two_reply_three = Comment.create(
  user_id: legolas.id,
  post_id: post_two.id,
  body: "And you have my bow."
)

reaction_nineteen = Reaction.create(
  reactable_id: post_two_reply_three.id,
  reactable_type: "Comment",
  reactor_id: frodo.id,
  react_type: "Celebrate"
)

post_two_reply_four = Comment.create(
  user_id: gimli.id,
  post_id: post_two.id,
  body: "And my axe."
)

reaction_twenty = Reaction.create(
  reactable_id: post_two_reply_four.id,
  reactable_type: "Comment",
  reactor_id: frodo.id,
  react_type: "Celebrate"
)

post_two_reply_five = Comment.create(
  user_id: boromir.id,
  post_id: post_two.id,
  body: "You carry the fate of us all little one. If this is indeed the will of the council, then Gondor will see it done."
)

reaction_twenty_one = Reaction.create(
  reactable_id: post_two_reply_five.id,
  reactable_type: "Comment",
  reactor_id: frodo.id,
  react_type: "Like"
)

post_two_reply_six = Comment.create(
  user_id: samwise.id,
  post_id: post_two.id,
  body: "Hey! Mr. Frodo isn't going anywhere without me."
)

reaction_twenty_two = Reaction.create(
  reactable_id: post_two_reply_six.id,
  reactable_type: "Comment",
  reactor_id: frodo.id,
  react_type: "Love"
)

post_two_reply_seven = Comment.create(
  user_id: elrond.id,
  post_id: post_two.id,
  reply_id: post_two_reply_six.id,
  body: "No indeed, it is hardly possible to separate you two. Even when he is summoned to a secret council and you are not."
)

post_two_reply_eight = Comment.create(
  user_id: merryandpippin.id,
  post_id: post_two.id,
  reply_id: post_two_reply_six.id,
  body: "Oi! We're coming too! You'll have to send us home tied up in a sack to stop us. Anyway, you need people of intelligence on this sort of mission, quest, thing."
)

reaction_twenty_three = Reaction.create(
  reactable_id: post_two_reply_eight.id,
  reactable_type: "Comment",
  reactor_id: frodo.id,
  react_type: "Love"
)

post_two_reply_nine = Comment.create(
  user_id: elrond.id,
  post_id: post_two.id,
  body: "Nine companions. So be it. You shall be the Fellowship of the Ring."
)

reaction_twenty_four = Reaction.create(
  reactable_id: post_two_reply_nine.id,
  reactable_type: "Comment",
  reactor_id: frodo.id,
  react_type: "Love"
)

reaction_twenty_five = Reaction.create(
  reactable_id: post_two_reply_nine.id,
  reactable_type: "Comment",
  reactor_id: demo_user.id,
  react_type: "Love"
)

reaction_twenty_six = Reaction.create(
  reactable_id: post_two_reply_nine.id,
  reactable_type: "Comment",
  reactor_id: aragorn.id,
  react_type: "Love"
)

reaction_twenty_seven = Reaction.create(
  reactable_id: post_two_reply_nine.id,
  reactable_type: "Comment",
  reactor_id: legolas.id,
  react_type: "Love"
)

reaction_twenty_eight = Reaction.create(
  reactable_id: post_two_reply_nine.id,
  reactable_type: "Comment",
  reactor_id: gimli.id,
  react_type: "Love"
)

reaction_twenty_nine = Reaction.create(
  reactable_id: post_two_reply_nine.id,
  reactable_type: "Comment",
  reactor_id: boromir.id,
  react_type: "Love"
)

reaction_thirty = Reaction.create(
  reactable_id: post_two_reply_nine.id,
  reactable_type: "Comment",
  reactor_id: samwise.id,
  react_type: "Love"
)

reaction_thirty_one = Reaction.create(
  reactable_id: post_two_reply_nine.id,
  reactable_type: "Comment",
  reactor_id: merryandpippin.id,
  react_type: "Love"
)

post_two_reply_ten = Comment.create(
  user_id: merryandpippin.id,
  post_id: post_two.id,
  reply_id: post_two_reply_nine.id,
  body: "Great! Where are we going?"
)

post_three = Post.create(
  user_id: theoden.id,
  body: "Glow up! Thank you @Gandalf!"
)

post_three_photo = open('https://ringin-dev.s3.us-west-1.amazonaws.com/theoden.gif')
post_three.photo.attach(io: post_three_photo, filename: 'theoden.gif')

reaction_thirty_two = Reaction.create(
  reactable_id: post_three.id,
  reactable_type: "Post",
  reactor_id: demo_user.id,
  react_type: "Love"
)

post_three_reply = Comment.create(
  user_id: demo_user.id,
  post_id: post_three.id,
  body: "Too long you have sat in darkness."
)

reaction_thirty_three = Reaction.create(
  reactable_id: post_three_reply.id,
  reactable_type: "Comment",
  reactor_id: theoden.id,
  react_type: "Love"
)

post_four = Post.create(
  user_id: gollum.id,
  body: "Wanted to drop this sick Lo-Fi beat here. Credits to: https://www.youtube.com/watch?v=bO9VYaWSx-I"
)

post_four_video = open('https://ringin-dev.s3.us-west-1.amazonaws.com/lofibeat.mp4')
post_four.video.attach(io: post_four_video, filename: 'lofibeat.mp4')

reaction_thirty_four = Reaction.create(
  reactable_id: post_four.id,
  reactable_type: "Post",
  reactor_id: samwise.id,
  react_type: "Love"
)

reaction_thirty_five = Reaction.create(
  reactable_id: post_four.id,
  reactable_type: "Post",
  reactor_id: merryandpippin.id,
  react_type: "Love"
)

post_five = Post.create(
  user_id: demo_user.id,
  body: "Well, here at last, dear friends, on the shores of the Sea comes the end of our fellowship in Middle-earth. Go in peace! I will not say: do not weep; for not all tears are an evil."
)

# C O N N E C T I O N S

connection1 = Connection.create(
  connector_id: demo_user.id,
  connectee_id: frodo.id,
  pending: false
)

connection2 = Connection.create(
  connector_id: demo_user.id,
  connectee_id: samwise.id,
  pending: false
)

connection3 = Connection.create(
  connector_id: demo_user.id,
  connectee_id: aragorn.id,
  pending: false
)

connection4 = Connection.create(
  connector_id: demo_user.id,
  connectee_id: theoden.id,
  pending: true
)

connection5 = Connection.create(
  connector_id: demo_user.id,
  connectee_id: legolas.id,
  pending: true
)

connection6 = Connection.create(
  connector_id: demo_user.id,
  connectee_id: gimli.id,
  pending: true
)

