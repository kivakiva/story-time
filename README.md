# StoryTime

<a href="https://storytime-demo.netlify.app/">StoryTime</a> connects readers with people who want to be read to. 

Users can generate read requests for specific books and any reader can offer to fulfill that request. The application either helps users coordinate in-person meetups or supports a  digital meet up through a video call.


 ---
 
 <p>
  <img width="225" align='left' src="lightCrop.gif">
</p>

## Contributors

StoryTime was created by <a href="https://github.com/RReiso">@Ruta Reiso</a>, <a href="https://github.com/DonThePhan">@Donny Phan</a>, and <a href="https://github.com/kivakiva">@Adrian Kiva</a> as their final project for <a href="https://github.com/lighthouse-labs">Lighthouse Labs'</a> web development bootcamp in February 2022.

## Story

This was an incredible learning experience for us as junior developers. We are open to continuing to develop this application post-graduation. Specifically, we would like to make the application more rapid on reload, implement some testing with mocha, chai, and jest, and further refine the UI/UX.

Ruta had the first seed of the idea - wanting to use our final project to work on an application to connect people during the pandemic. We then collectively built out the features that now exist.

## Tech stack

The front end of this application uses React, is styled in DaisyUI, and is <a href="https://storytime-demo.netlify.app/">deployed</a> on Netlify. The back end uses express and PostreSQL and is deployed to Heroku. The chat component of the application uses websockets.

<br/>

---

## Licensing

This project is licensed under <a href="https://www.gnu.org/licenses/gpl-3.0.en.html">GNU General Public License v3.0</a>.

## Explore & contribute

<a href="https://storytime-demo.netlify.app/">An interactive demo version of the app</a> is deployed on Netlify.

To run the application locally and/or make any changes, follow these steps:
  1. Fork & clone this respository.
  2. From the root folder you have created, navigate to `./server`.
  3. Execute `npm install`.
  4. Using the `.env.example` file within the `server` folder as a reference, populate the variables of your `.env` file as appropriate for your user credentials.
  5. You should have PostgreSQL <a href="https://www.postgresqltutorial.com/install-postgresql/">installed and running</a>.
  6. Still within the `server` folder, execute `npm run db:reset` from your command line. You should see printouts indicating the creation of several tables. If you do not, ensure psql is running and you have set the correct permissions for your `.env` file.
  7. With the database populated, execture `npm run start` to serve it locally at the port specified in your `.env` file.
  8. Navigate to `../client` and execute `npm install` followed by `npm start` to launch the React front-end of the application. Once it is up, it should automatically load `https://localhost:3000` in your default browser.
  9. Explore the application!
  10. Any changes you make to the application should now automatically load into the localhost version on save.
  
    

---
