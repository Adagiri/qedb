# Session Tokens

Session Tokens allows you to fetch questions from our database without any question been returned more than once. In other words, they make sure that there is no duplication of questions for all api calls made with it. It should be noted that after a number of api calls using the session token, the questions matching your query will eventually be exhausted and will return no questions. There is a response code that indicates this.

Session tokens will be deleted after 24 hours of inactivity

- Use a Session Token https://server.qedb.net/api/v1/questions/public?amount=6&token=YOUR_TOKEN
- Retrieve a Session Token https://server.qedb.net/api/tokens?action=create
- Reset Session Token https://server.qedb.net/api/tokens?action=reset&token=YOUR_TOKEN


# Responses
Responses (response_code) helps you understand the situation after each call to the API. 

1: Indicates a successful response
2: Indicates an invalid parameter passed in as a query. Example, type=bouulean or amount=TEN or level=hardd
3: Indicates that the token passed was not found. Either it has been deleted or doesn't exist
0: Indicates that there are no more results matching a query for a certain token in use.

# Helpers

Category lookup - Returns a list of all categories in the database, including their keys
https://server.qedb.net/api/v1/categories/public

Category count - Get the number of questions a category has
https://server.qedb.net/api/v1/categories/public/CATEGORY_KEY

