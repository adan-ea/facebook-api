## Description

Facebook-API is REST API using [NestJS](https://github.com/nestjs/nest).
Authentication doesn't work properly. So it was partially disabled from the API.
A Token is required but it doesn't check if the token is valid.
## Installation

```bash
$ yarn install
$ yarn prisma generate
$ yarn prisma migrate dev
```

## API Routes

## `/api/v1/authentication`
### DTOs
| name          | schema                                | Working |
|:--------------|:--------------------------------------|:--------|
| `LoginDto`    | `{ email: string, password: string }` | ✅       |
| `RegisterDto` | `{ email: string, password: string }` | ✅       |

### URIs
| method | endpoint    | headers | body          | Response                          | description                            | Working |   
|:-------|:------------|:--------|:--------------|:----------------------------------|:---------------------------------------|:--------|
| `POST` | `/login`    | `null`  | `LoginDto`    | `{ user: User, token: JwtToken }` | return a JWT Token for authentication. | ✅       |
| `POST` | `/register` | `null`  | `RegisterDto` | `{ user: User}`                   | register a new User.                   | ✅       |

## `/api/v1/users`

### DTOs
| name            | schema                                      | Working  | 
|:----------------|:--------------------------------------------|----------|
| `UpdateProfile` | `{ firstName?: string, lastName?: string }` | ❌        |

### URIs
| method   | endpoint       | headers                | body            | Response               | description                    | Working |
|:---------|:---------------|:-----------------------|:----------------|:-----------------------|:-------------------------------|:--------|
| `GET`    | `/:id/posts`   | `Authorization: TOKEN` | `null`          | `{ posts: Post[] }`    | return a list of User's posts. | ✅       |
| `GET`    | `/:id/profile` | `Authorization: TOKEN` | `null`          | `{ profile: Profile }` | return a User's profile.       | ✅       |
| `PATCH`  | `/:id/profile` | `Authorization: TOKEN` | `UpdateProfile` | `{ profile: Profile }` | update a User's profile.       | ❌       |
| `DELETE` | `/:id`         | `Authorization: TOKEN` | `null`          | `null`                 | delete an user by it's id.     | ❌       |

## `/api/v1/posts`

### DTOs
| name            | schema                 | Working | 
|:----------------|:-----------------------|---------|
| `CreatePostDto` | `{ message: string }`  | ✅       |
| `UpdatePostDto` | `{ message?: string }` | ✅       |

### URIs
| method   | endpoint | headers                | body            | Response            | description            | Working |
|:---------|:---------|:-----------------------|:----------------|:--------------------|:-----------------------|:--------|
| `POST`   | `/`      | `Authorization: TOKEN` | `CreatePostDto` | `{ post: Post }`    | create a new Post.     | ✅       |
| `GET`    | `/:id`   | `Authorization: TOKEN` | `null`          | `{ post: Post }`    | return a Post.         | ✅       |
| `GET`    | `/`      | `Authorization: TOKEN` | `null`          | `{ posts: Post[] }` | return a list of Post. | ✅       |
| `PATCH`  | `/:id`   | `Authorization: TOKEN` | `UpdatePostDto` | `{ post: Post }`    | update a Post.         | ✅       |
| `DELETE` | `/:id`   | `Authorization: TOKEN` | `null`          | `null`              | delete a Post.         | ✅       |
