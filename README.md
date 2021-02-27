# USON-Mechanics

**PROBLEM WE ARE TRYING TO SOLVE** : MOST OF THE USER’S FACE PROBLEM WHEN THEY NEED TO WAIT IN QUEUE IN CAR SERVICE CENTER FOR A LONGER TIME. AND ALSO USER DON’T HAVE ANY FLEXIBILITY IN TIMING OF APPOINTMENT. TO SOLVE THIS PROBLEM WE HAVE DESIGNED A PORTAL THROUGH WHICH USER CAN BOOK APPOINTMENT AT IT’S FLEXIBLE TIME. AND ALSO THEY NEED NOT TAKE THEIR CAR AT SERVICE CENTER INPLACE THEY CAN SCHEDULE A PICKUP AND DROP OF THEIR VEHICLE.

# Steps to run website on your pc
1.	Install Node.js ( LTS ) along with npm
2.	Install MongoDB ( Community Server )
3.	Install these 10 Additional npm packages by using these commands in the Command Prompt
    -	npm install express
    -	npm install body-parser
    -	npm install request
    -	npm install express-sanitizer
    -	npm install mongoose
    -	npm install passport-local
    -	npm install passport
    -	npm install passport-local-mongoose
    -	npm install express-session
    -	npm install ejs
4. Extract the ZIP file of the Project within a folder in your system.
5. Open Command Prompt and using cd command open the folder of the Project
6. Type node app.js and ENTER
7. Now open a web browser and on the address bar type http://localhost:3000

# Screenshots of website

### Main Page
![alt text](https://github.com/Utiwari1999/USON-Mechanics/blob/master/screenshots/1.png?raw=true)

### Login Page
![alt text](https://github.com/Utiwari1999/USON-Mechanics/blob/master/screenshots/2.png?raw=true)

### Register Page
![alt text](https://github.com/Utiwari1999/USON-Mechanics/blob/master/screenshots/3.png?raw=true)

### Dashboard
![alt text](https://github.com/Utiwari1999/USON-Mechanics/blob/master/screenshots/4.png?raw=true)

### Contact US
![alt text](https://github.com/Utiwari1999/USON-Mechanics/blob/master/screenshots/5.png?raw=true)

### Nearest Center
![alt text](https://github.com/Utiwari1999/USON-Mechanics/blob/master/screenshots/6.png?raw=true)

### Car Details
![alt text](https://github.com/Utiwari1999/USON-Mechanics/blob/master/screenshots/7.png?raw=true)

### Book Appointment
![alt text](https://github.com/Utiwari1999/USON-Mechanics/blob/master/screenshots/8.png?raw=true)

### My Bookings
![alt text](https://github.com/Utiwari1999/USON-Mechanics/blob/master/screenshots/9.png?raw=true)

### Insurance Check
![alt text](https://github.com/Utiwari1999/USON-Mechanics/blob/master/screenshots/10.png?raw=true)

## Features of Website

- First , you need to Register / Sign Up yourself on our website in order to access all the features provided within it . 
- Click On the USER Icon on the top right corner of the page for LOGIN IN / SIGN UP .
- Enter the details which are requested by the page ( USERNAME , PASSWORD , EMAIL , AGE , GENDER , MOBILE , ADDRESS ) and Click on Register. 
- After Successful registration , Click on the USER ICON which leads you to the  USER SECTION ( DASHBOARD ) displaying the details you had previously entered during Registration.
- When you register with us for the first time you are automatically logged in , but the next time you visit the website , you have to LOG IN using your USERNAME and PASSWORD
- Click on CAR DETAILS Option on the DASHBOARD.
- Enter the details which are requested by the page ( Car Company , Owner Name , Colour , Model Name , Vehicle Plate No. , Delivery Date , Insurance Expiry Date , Insurance Type, Dealer Name , Engine No. , Dealer Address ) and Click on Save Changes. 
- This Information will be saved Permanently in the Database for further assistance and reference.
- You can Also Modify the Vehicle Info. Database by clicking on EDIT DETAILS Option.
- Now , To know your current location Click on NEARBY SERVICES on NAVBAR , a new window opens. 
- Click on ENABLE LOCATION , it provides you the details of your current location ( CITY , STATE , COUNTRY ) using your IP Address.
- To book an appointment for car service Click on BOOK APPOINTMENT on NAVBAR , a new window opens.
- Your CITY will be displayed there as default by the NEARBY SERVICES Option in the previous step . Also , a list of available SERVICE CENTER which is stored in the database will be displayed to choose from on clicking the DROP DOWN ARROW .
- Enter the details which are requested by the page ( CITY , SERVICE CENTER , DATE , PICK UP TIME , DROP – OFF TIME , REPAIR PARTS ) and Click on SUBMIT to successfully book your Appointment

## Other Features

#### My Bookings 
- A User can view the details of his current and previous bookings by selecting this option . The Database of the Appointments of a specific User will be displayed.
#### Track Progress
- This option is used to view the current status of the service request by the User
#### Insurance Check
- Fetches the Date of Expiration of the vehicle of a user from the CAR DETAILS DATABASE .
#### Enquiry
- A User can get his additional queries / problems solved by this option by entering the details which  are requested by the page .
#### Logout
- Used to end the access of the services of our project / website .



