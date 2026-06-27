# Briskly App

Briskly means quick, energetic manner, and this is exactly what we want to do with road trip planning. Simply, select your starting stop and the algorithm finds you the best available attractions and stops reachable in a specific time

Briskly is an innovative application designed for intuitive planning of multi-stage journeys using public transport. It transforms complex GTFS schedule data into a dynamic connection graph generated for a specific day and time. 

The core user experience is based on an iterative selection mechanism. Users specify a starting point and departure time, and the system presents destinations reachable within a reasonable time window.

Once a destination is selected, it is added to the itinerary and becomes the new starting point for further exploration. The final plan is saved, and users receive a comprehensive summary on an interactive map.

# Demo

You can select the city, date, and time to initiate the algorithm and your starting point

<img width="284" height="583" alt="image" src="https://github.com/user-attachments/assets/224d4a16-4ad8-4889-ba91-63322f71d0c1" />

Next you can select best location on mapbox map

<img width="334" height="695" alt="image" src="https://github.com/user-attachments/assets/0fb7538c-674f-4c19-836d-75c2d827c458" />

All details are available after finishing your planning

<img width="379" height="710" alt="image" src="https://github.com/user-attachments/assets/66ac0065-1464-4b81-ac10-bbbd5b7fa4d3" />

All trips are listed as well

<img width="517" height="640" alt="image" src="https://github.com/user-attachments/assets/bdb98785-46f1-4b50-9a7b-5c36b50d99fa" />

## Data Sources
* **GTFS Data:** FlixBus schedules for the year 2026
* **City Information:** Geonames
* **Attractions Data:** Nominatim
* **Images:** Wikipedia-API and Unsplash

## Architecture and Tech Stack

### Cloud
* The application relies on Supabase for its cloud infrastructure, utilizing a PostgreSQL database.
* Images (destination photos) are stored in S3 containers within Supabase.

### Backend
* The business logic is implemented in Python, using standard data analysis libraries like pandas and numpy.
* A REST API is built using the Django framework to expose the filtered and processed data.
* The backend utilizes Dijkstra's algorithm to find accessible cities within a given time frame.
* https://github.com/briskly-app/backend-briskly-django

### Mobile
* The frontend is a mobile app built with React Native.
* It uses NativeWind for styling and MapBox for displaying maps and pins.
* The UI is based on the Material 3 Design Kit.
* Data fetching and API request management are handled by TanStack Query.
