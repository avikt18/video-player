# Video Player

This is a video player/streamer application where you can:
1.Create, edit and delete videos.
2.Put a video inside a playlist (bucket).
3.Play Videos.
4.See user video history.

\*\*\* CRUD operations will not persist after a reload as resources will not be really updated on the server but they will be faked as if because of JSON placeholder. To persist changes run json-server locally.

**Recommended to run the app and json-server locally, for smooth CRUD operations** 

## Available Scripts

To run json-server on your local machine (port 3001):
`json-server --watch db.json --port 3001`

To start the app in dev mode you can run the command (port 3000):
`npm start`
