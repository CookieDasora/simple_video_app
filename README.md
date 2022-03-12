# 📹 Simple Video App

A simple video sharing app made with Typescript, Postgresql, Redis and Amazon S3.


[![MIT License](https://img.shields.io/github/license/CookieDasora/simple_video_app?style=for-the-badge)](https://github.com/CookieDasora/simple_video_app_backend/blob/master/LICENSE)
![Top Language](https://img.shields.io/github/languages/top/CookieDasora/simple_video_app_backend?style=for-the-badge)
## 🤔 API Reference

#### Get all users

```
  GET /users
``` 

#### Get user

```
  GET /user?u=${userid}
```

| Parameter | Type     | Required                          |
| :-------- | :------- | :-------------------------------- |
| `userid`  | `string` | **Yes**.                          |

### Get Video

```
  GET /video?v=${videoid}
```

| Parameter | Type     | Required                          |
| :-------- | :------- | :-------------------------------- |
| `videoid` | `string` | **Yes**.                          |


### Create user

```
    POST /users/register
```

| Body      | Type     | Required                          |
| :-------- | :------- | :-------------------------------- |
| `username`| `string` | **Yes**.                          |
| `email`   | `string` | **Yes**.                          |
| `password`| `string` | **Yes**.                          |



### Login

```
    POST /users/login
```
| Body      | Type     | Required                          |
| :-------- | :------- | :-------------------------------- |
| `email`   | `string` | **Yes**.                          |
| `password`| `string` | **Yes**.                          |

### Create category (Must be authenticated)

```
  POST /category/new
```

| Body                  | Type     | Required                          |
| :--------             | :------- | :-------------------------------- |
| `category_name`       | `string` | **Yes**.                          |
| `category_description`| `string` | **No**.                           |


### Upload video (Must be authenticated)

```
  POST /upload
```

| Multipart Body      | Type     | Required                          |
| :--------           | :------- | :-------------------------------- |
| `title`             | `string` | **Yes**.                          |
| `description`       | `string` | **Yes**.                          |
| `file`              | `file`   | **Yes**.                          |
| `categoryId`        | `string` | **No**.                           |


### Delete video (Must be authenticated)

```
  POST /video/delete
```

| Body                  | Type     | Required                          |
| :--------             | :------- | :-------------------------------- |
| `video_id`            | `string` | **Yes**.                          |

## ⏲️ To be added features

- Password Recovery.
- Email Verification.
## 📑 Requirements

### ⚙️ Functional requirements

- ✔️ **User must be able to authenticate using email and password**.
- ✔️ **User must be able to upload a video up to 100 MB**.
- ✔️ **User must be able to upload a video with a category**.
- ❌ User can change password if he has forgotten it.
- ❌ User must have verified the email before uploading the video.

### 🏭 Non function requirements

- ✔️ **Use Amazon S3 to store the videos**.
- ✔️ **Use Prisma and Postgres to store user data and video data**.
- ✔️ **Use Redis to do background jobs like sending emails**.
- ✔️ **Use Nodemailer to send emails**.

### 📏 Business rules

- ✔️ **Video must have only one category**.
- ✔️ **User's username must be unique**.
- ✔️ **User can't create an account with the same email**.