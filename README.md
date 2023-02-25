# AshaPurasoftTech

Problem
Create a NodeJS and mongo dB APIs (postman collection) which are we can create 
1. Add products ( name , price, brand, visible area, etc. as per latest requirement 
2. List of products
3. Active product
4. Update product before active
5. And create search api by product name and brand filter or location filter use also.
6. Add to cart
7. Purchase products

Solution
node index.js
Now make a POST request to http://localhost:3000/products with the following request body:

 {
    "name": "dharm", 
    "price": 12,
    "brand": "nike",
    "location": "london",
    "visibleArea": "active"
}
Output: Now you will see the following output on your console screen:
Server listening on PORT 3000
    "name": "dharm", 
    "price": 12,
    "brand": "nike",
    "location": "london",
    "visibleArea": "active"
