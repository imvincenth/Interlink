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
  headline: 'the Wandering Wizard', 
  country_region: 'Middle-earth', 
  city_district: 'The Shire'
)

fellowshipbanner = open('https://ringin-dev.s3.us-west-1.amazonaws.com/fellowshipbanner.jpg')
demo_user.banner.attach(io: fellowshipbanner, filename: 'fellowshipbanner.jpg')

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
  headline: 'Useless', 
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
  headline: 'Useless',
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
  headline: 'Legolas BFF', 
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
  last_name: 'Trahald', 
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

# P O S T S && C O M M E N T S
post_one = Post.create(
  user_id: elrond.id,
  body: "HIRING: Strangers from distant lands, friends of old. You've been summoned here to answer the threat of Mordor. 
  Middle-Earth stands at the brink of destruction, none can escape it. You will unite or you will fall. 
  You have only one choice, the Ring must be destroyed."
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
  It must be taken deep within Mordor and be cast back from whence it came. One of you, must do this."
)

post_one_comment_reply_two = Comment.create(
  user_id: merryandpippin.id,
  reply_id: post_one_comment.id,
  post_id: post_one.id,
  body: "Well what if we could just fly the Ring over the volcano and just drop it in? Like eagles or something..."
)

# post_one_comment_reply_three = Comment.create(

# )

post_one_comment_two = Comment.create(
  user_id: frodo.id,
  post_id: post_one.id,
  body: "I will take it."
)