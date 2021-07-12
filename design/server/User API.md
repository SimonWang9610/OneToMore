## `User` router

- `User` in database
  - `uuid`: `NOT NULL`
  - `email`: `NOT NULL`
  - `username`: `NOT NULL`
  - `password`: `NOT NULL`
  - `hashedPass`: `NOT NULL`
  - `permission`: default `1`
    - different features require a different permission, for example, VIP subscriptions.
    - users should confirm the permission if they trigger events requiring higher permission each time
  - `mobile`

> authenticated users do not always have the permission to access some services, so it requires confirming their permission each time if they triggered some special services.

### `POST` to the server database
- `POST /api/v1/auth/signup`
  - `hashUserPassword(userObject.password)`
  - `dbAddLogic("user", userObject)`
    - `authenticated` is set as `1` to restrict some functions requiring higher permission.
  - `sendConfirmEmail(userObject.email)`
    - if users confirmed their email address, set them as regular users and lift their permissions to `2`
  - `generateAuthToken(hashedPass)`:
    - indicates the current user is authenticated and can access some basic features in our website.
  - return token

- `POST /api/v1/auth/signin`
  - `dbQueryLogic("user", false, userObject)`
    - `userObject` does not include the real `password` and only have `hashedPass` and `email/username`, avoiding password leak. as a result, the client-side should hash the password entered by the user and avoid transferring the real `password` over the Internet.
  - `generateAuthToken(hashPass)`
  - return token

## `Service` router

> `Service` may have serval categories, here just lists one kind of APIs to confirm users' permission, for example `subscription` service for `video streaming`, `music streaming` or `individual subscription`.
> 
> however, it does not make sense to confirm the permission in s short time for one kind of services, so the confirmation should have a valid time.

- `POST /api/v1/service/permission/:payload`
  - `payload` should include `token` (or something to verify the current status of the current user) and `username`
  - `dbQueryLogicByCategory("user", ["permission"], `username)`
  - return `isPermitted(permission)`