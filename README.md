# vk-enterprises

api definition for vk enterprises

| api path | description | required data | response | managed by |
| --- | --- | --- | --- | --- |
| `/auth/google` | authenticate with google | - | user object | backend |
| `/auth/google/callback` | callback for google auth | - | user object | backend |
| `/auth/logout` | logout | - | - | frontend button |
| `/auth/signup` | signup | email, password | for successful signup automatic redirect to services page otherwise json response as follows `{ "message": "email already exists" }`, `{ "message": "email is required" }` or `{ "message": "password is required" }` with a status code 400| validation and redirection are managed by backend but the form and error response is managed by frontend |
| `/auth/login` | login | email, password | same as sign up api | validation and redirection are managed by backend but the form and error response is managed by frontend |
