# landing page

- see list of questions
- see total number of verified questions
- it is an infinite scroll
- can filter and search
- # clicking on a question, opens a modal
- an add button or icon that takes to the contribute page
- link to the users' profile if logged in
- link to practice page
- link to the docs page

# Question modal popup

- text
- images (if any)
- options
- correct answer
- credits
- posted by - [takes to the User profile]

# User profile page

- username
- total questions posted
- total rejected
- total accepted
- role ['user', 'admin', 'moderator']
- high score

# Authentication page

- login with email or password
- signup with email, password and username

# contribute

- select question type
- select question difficulty
- add text
- add options (one of them is ticked as the answer)
  can add multiple options
- add credits (add a text and set a link to it - i.e text - unsplash, link - https://unsplash/drojioj/0929838378748489)
  can add multiple credits

# practice

- shows a question and the user answers,
- tells him if he is correct or wrong
- increases or decreases his score
- # takes him to next question
- there is a timer

# api

https://opentdb.com/api_config.php

- questions query response codes
  successfully returned results - 0
  invalid parameter - 1
  token - token has expired or does not exist - 2
  token - no more questions available for a particular query with that token - 3

- apis
  get questions
  get category
  get categories
  generate token
  reset token
