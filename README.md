# baseball-calendar
Simple baseball calendar to display games, practices and time slots exported from Spordle Play. It can also be used for other sports!

## Why this project exist

As of the start of the 2025 baseball season, one feature was not yet available in Spordle Play: a global calendar with events of all venues used by a sport association. This is a mission critical view on information. It would save a ton of time for coaches and schedulers to find available time slots for practices and rescheduled games. For venues shared across multiple associations or leagues, it becomes even more difficult to find that information.

The goal of this project is to fill in that gap. Eventually, Spordle Play should have the equivalent views and features. This project could still be used to display that information in a separate scope (for example your own Website) unless it eventually becomes available through a public API integration.

## Getting started

This is a React 19 project using Typescript.

- To run locally:
  -  npm run dev
- To build prod release (output will be in the dist folder):
  - npm run build

## Basic features

By default, the calendar will list games and practices of all venues in monthly calendar view. Each venue event has a unique color in the left border. This helps visually identify venues without filtering when you have a small number of venues.

You can select to display/hide:

- Events (games and practices) for each venue. Games will have a white background. Practices will have a light blue background.
- The remaining available timeslots for each venues. Timeslots will have a light yellow background with dotted border. 

## Customizations

### App root path

- vite.config.js
  - Change the base property of defineConfig
- .env
  - Change VITE_APP_PATH

### Colors, text, etc

- utils/consts.ts
- calendar.css

### Venues

The project is fairly small and does not have much structure. If you are familiar with React it should be easy to update the venues, etc.

## How to export games and practices

*Note: You must have the required set of scheduler role or permissions.*

In order for your calendar to stay up to date, the export of games and practices must be done each time there is a change.

1. In Spordle Play, go to either Games or Practices.
2. Select all venues that you want to have events for.
3. Enable **Show past games (or practices)**.
4. Optionnal: Add a more filters, for example a specific team or category.
5. Click on the **Export** button on the top right. This will trigger a download for a CSV file.
6. Rename the file to game.csv (or practice.csv).
7. Overwrite the file at the root of your site.
8. Optional: Save your filter for next time.

## How to export time slots

*Note: You must have the required set of scheduler role or permissions.*

Time slots is an optional feature of the calendar and is more complex to export from Spordle Play since there is currently no option to do so from the Website.

1. In Spordle Play, go to Venues.
2. Search for your venue and select it.
3. Open the browser debugger (usually F12) and go to network tab.
4. In the venue page, select your suface (some venue might have multiple ones).
5. In the surface page grab your suface id from the URL. For example, in the following URL, **9999** is the surface ID: https://play.spordle.com/surfaces/9999/show.
6. From the network debugger tab, search for the request starting with **https://play.spordle.com/api/arenaslots**.
7. Copy the **Cookie**, **Authorization** and **User-Agent** header values.
8. Using a software like Postman or Insomnia, create a get request with the full arenaslots URL. Change the limit to 500. Example: https://play.spordle.com/api/arenaslots?filter=%7B%22scope%22:%22Authorized%22,%22where%22:%7B%22and%22:[%7B%22arenaId%22:9999%7D,%7B%22seasonId%22:%229999%22%7D]%7D,%22order%22:[%22startTime+DESC%22,%22endTime+DESC%22],%22limit%22:500,%22skip%22:0%7D. You also need to add the **Cookie**, **Authorization** and **User-Agent** headers. Spordle Play API will reject request from unknown user agents.
9. Execute the request and copy the JSON output.
10. It can be a large payload and it contains a lot of properties that are not needed. You can use the Transform operation on https://jsoneditoronline.org/#left=local.mulire&right=local.cujali to pick which field to keep and sort the records. The required fields are: id, name, date, startTime, endTime, comments. You can sort by date.
10. Save the output to a file named **timeslots-VENUE-NAME.json** in the **public** folder.
11. Update the App.tsx file to load this time slots file. Seach for code around **loadVenueTimeslots**.
11. Repeat for each venue. Hint: You can duplicate your Postman or Insomnia request and only change the venue ID. The **Authorization** header value will expire at some point and will need to be updated. 

Time slots are usually set at the beginning of the season and should not change. If they do, you can re-export them using the steps above, or manually edit the file for minor changes.

## License

This project is licensed under the MIT License - see the LICENSE file for details.