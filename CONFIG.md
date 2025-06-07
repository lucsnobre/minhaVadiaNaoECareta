# TuneFlow Configuration

## Music API URL

To connect TuneFlow to your music API, you need to set the API base URL.

1.  **Create a `.env.local` file** in the root of your project (next to `package.json`).
2.  **Add the following line** to your `.env.local` file, replacing `https://your-actual-api.com/api/v1` with your actual API endpoint:

    ```env
    NEXT_PUBLIC_MUSIC_API_URL=https://your-actual-api.com/api/v1
    ```

    For example, if your API is hosted at `https://my-music-service.dev/api`, you would use:
    ```env
    NEXT_PUBLIC_MUSIC_API_URL=https://my-music-service.dev/api
    ```

3.  **Restart your development server** (`npm run dev` or `yarn dev`) for the changes to take effect.

The application uses a placeholder URL (`https://api.example.com/music`) by default, which will likely not work. You **must** configure this environment variable for the app to fetch data from your intended API.

The API interaction logic can be found in `src/lib/api.ts`. If your API has different endpoints or data structures, you will need to update this file accordingly.
