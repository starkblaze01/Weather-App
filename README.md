<div align="center">

# Weather-App
 _This App is built using ReactJS, Ant-Design, and ChartJS_

---
![Main View](https://github.com/starkblaze01/Weather-App/blob/main/Main.png)

</div>

---

### About the App:

This app was built just for the exploration purpose of ChartJS library and Google Maps API.

You can check the [Chart.js](/client/src/components/Chart.js) for getting an idea how I implemented the line graph.

By default it will ask for user's location permission and on approval it will populate the weather info of the user's location. Users can search for a particular location, it will show recommendation using [Google Map Autocomplete API](https://developers.google.com/maps/documentation/javascript/places-autocomplete), select the option and it will populate the weather of that place. All the weather information is being fetched via [Open Weather Map](https://openweathermap.org/api/one-call-api).

---

### Setup:

1. Clone the Repository
2. Run command `cd client/`
3. Run command `yarn install`
4. Setup the environment variable: `REACT_APP_OPEN_WEATHER_APP_API_KEY`, and `REACT_APP_GOOGLE_MAPS_PLACE_API_KEY`. You can generate these API keys from https://openweathermap.org/appid, and https://developers.google.com/maps/documentation/javascript/cloud-setup respectively.
5. Make sure to Enable the Place API, and Maps JavaScript API for the `API_key` you generated from Google Console Page.

**Debug**:

Earlier I was using the [Web-services API](https://developers.google.com/maps/documentation/places/web-service/autocomplete) of Google Maps to get the place recommendation/autocomplete and fetch the coordinates of that place, but Google Maps doesn't allow CORS for client-side application so I switched over to [Maps JS API](https://developers.google.com/maps/documentation/javascript/places-autocomplete). Follow the setup procedure [here](https://developers.google.com/maps/documentation/javascript/places-autocomplete). 
Now to use this Maps JS API, you need to make sure you have enabled [restrictions](https://cloud.google.com/api-keys/docs/add-restrictions-api-keys) for it. For me I wasn't able to enable restrictions from UI, it was failing and not updating so I used Cloud Shell at the Google Cloud Console to apply the restriction by running this command:

```
gcurl https://apikeys.googleapis.com/v2/projects/PROJECT_NUMBER/locations/global/keys/KEY_ID?updateMask=restrictions \
  --request PATCH \
  --data '{
    "restrictions" : {
      "browserKeyRestrictions": {
        "allowedReferrers": "www.example.com"
      }
    },
    "etag": "ETAG"
  }'
```
Replace `PROJECT_NUMBER`, `KEY_ID`, and `ETAG` with the actual values.
Before running this command you need to set the gcurl alias by running this:

`alias gcurl='curl -H "Authorization: Bearer $(gcloud auth print-access-token)" -H "Content-Type: application/json"'`

To get the values of `PROJECT_NUMBER`, `KEY_ID`, and `ETAG` you can run this command:

`gcurl https://apikeys.googleapis.com/v2/projects/PROJECT_NAME/locations/global/keys`

Check [SearchBar.js](/client/src/components/SearchBar.js) and [index.html](/client/public/index.html#L9) to see how Maps JS API were used.

---

### Credits:

<div>Icons made by <a href="https://www.flaticon.com/authors/linector" title="Linector">Linector</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>

<br>

P.S. I am using free-tier APIs and try to maintain the request limit under the free-tier, please try the demo wisely and generate your own API for your personal use. Liked the repo?  Hit the ⭐ Button!
