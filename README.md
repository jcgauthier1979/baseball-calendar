# baseball-calendar
Simple baseball calendar to display games, practices and time slots exported from Spordle Play. It can also be used for other sports!

## Why this project exists

As of the start of the 2025 baseball season, one feature was not yet available in Spordle Play: a public global calendar with events of all venues used by a sport association. This is a mission critical view on information. It would save a ton of time for coaches and schedulers to find available time slots for practices and rescheduled games. For venues shared across multiple associations or leagues, it becomes even more difficult to find that information.

The goal of this project is to fill in that gap. Eventually, Spordle Play should have the equivalent views and features. This project could still be used to display that information in a separate scope (for example your own Website) unless it eventually becomes available through a public API integration.

## Getting started

This is a [React 19](https://react.dev/) Typescript project using [Vite 6](https://vite.dev/) framework.

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
  - ORGANIZATION: Update the value to you local organization name found in the games and practives CSV export files.
  - COLOR_*: Add, remove or update venue colors.
  - VENUE_*: Add, remove or update venues.
  - etc.
- calendar.css
  - .venue[COLOR]: Add, remove or update venue colors.
  - etc.

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

Time slots is an optional feature of the calendar. This uses a Spordle Play feature that is still in beta, the following instructions may not be accurate.

1. In Spordle Play, go to Orginizations.
2. Select your Organization.
3. Click on the **Planner (Beta)** tab.
4. In the planner page, under **Envent Types**, select **Slots**.
5. Under **Fields**, select your field / venue.
6. Select the **Start Date** and **End Date** that covers your full season calendar.
7. Click on the **Export** button in the toolbar above.
8. Rename the file to **timeslots-VENUE_NAME.csv** and copy it in the **public** folder.
11. Update the App.tsx file to load this time slots file. Seach for code around **loadVenueTimeslots**.
11. Repeat for each venue. 

Time slots are usually set at the beginning of the season and should not change. If they do, you can re-export them using the steps above, or manually edit the file for minor changes.

## License

This project is licensed under the MIT License - see the LICENSE file for details.