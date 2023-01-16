# Description
This project is meant as a practice exercise to create a basic message posting page which uses Node.js back-end with a react front-end using a REST api to communicate between the two.
## Front-End: React
Uses two main components: a creation component, to create a new post and send it to the back-end, and a post component to display posts retrieved from the back-end. 
## Back-End: Node.js
Implements a REST api using express with the following routes:  
POST message {title, content}  
GET message/id  
GET messages/  
PUT message/id {title, content}  
DELETE message/id  
  
If the request id is out of bounds server will respond with "Failed".
