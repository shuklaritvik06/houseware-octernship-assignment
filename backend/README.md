# HousewareHQ API

- Auth

```md
**ADMIN USER**

Username: shuklaritvik06
Password: Ankit
```

- Add New User

```md
POST REQUEST

fetch http://localhost:${PORT}/admin/createuser

Schema:

- username
- password
- first_name
- last_name
- role

cookies: access_token
```

- Delete User

```md
DELETE REQUEST

fetch http://localhost:${PORT}/admin/createuser

Schema:

- user_id

cookies: access_token
```

- Get All Users

```md
GET REQUEST

fetch http://localhost:${PORT}/getusers

cookies: access_token
```

- Get User

```md
GET REQUEST

fetch http://localhost:${PORT}/user

cookies: access_token
```

- Login

```md
POST REQUEST

fetch http://localhost:${PORT}/user/login

Schema:

- username
- password
```

- Refresh

```md
POST REQUEST

fetch http://localhost:${PORT}/refresh

cookies: refresh_token
```
