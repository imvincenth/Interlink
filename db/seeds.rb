# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'open-uri'

User.destroy_all
Post.destroy_all
Comment.destroy_all
Reaction.destroy_all
Experience.destroy_all
Education.destroy_all
Connection.destroy_all

# Users

# Fellowship

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

fellowshipbanner = open('https://ringin-dev.s3.us-west-1.amazonaws.com/fellowshipbanner.jpg')
frodo.banner.attach(io: fellowshipbanner, filename: 'fellowshipbanner.jpg')

frodoportrait = open('https://ringin-dev.s3.us-west-1.amazonaws.com/frodo.jpg')
frodo.profile_picture.attach(io: frodoportrait, filename: 'frodo.jpg')

frodo_exp = Experience.create(
  user_id: 2,
  title: 'Useless Hobbit',
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