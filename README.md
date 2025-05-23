# CS472-Final-Project-May-2025 Product Review & Rating Platform

This is a single person project connecting all parts of the content in the course.
Build a product review and rating platform where users can browse products, post reviews, and rate products.
## Core Functionality
### Products
- Store product data in products.json with fields:
- Use Node’s fs module to store products and reviews in JSON files.
###  Reviews
- Add, edit, and delete reviews for each product.
- Each review has:
	- id, productId, author, rating (1–5), comment, and date.
	- You may add/update fields
- Store in reviews.json. 
###  Rating & Filtering
- Compute and display average product ratings from all reviews.
- Filter products by category.
- Search products by name.


## Client stack:
- axios : for rest api calls
- bootstrap : page layouting
- react: to create the dynamic pages and SPA (single page applicaiton)
- typescript: TS is the languaged used for the frondend

## Server stack:
- express: used for implementing REST api
- swagger: for API documentation
- typescript: TS is the languaged used for the backend too


