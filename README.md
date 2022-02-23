# Requirements

## Functional requirements

- **User must be able to authenticate using email and password**.
- **User must be able to upload a video up to 100 MB**.
- User must be able to comment on the video.
- User must be able to upload a video with a category.
- User can change password if he has forgotten it.
- User must have verified the email before uploading the video.

## Non function requirements

- **Use Amazon S3 to store the videos**.
- **Use TypeORM and Postgres to store user data**.
- **Use Redis to do background jobs like sending emails**.
- **Use Nodemailer to send emails**.

## Business rule

- Video must have only one category.
- **User's username must be unique**.
- **User can't create an account with the same email**.
