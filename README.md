# Welcome to CS2-Roulette!

## 1. Setup
To get the application up and running unzip the folder and simply run the executable file.

Two endpoints will then be open:
- http://localhost:8080 -> represents the UI for the clients that will receive the randomized instructions
- http://localhost:8080/session-control => controls the session for the application run

In case the original setup for the application is not done correctly, simply restart the aplication by closing the terminal window.

## 2. Setting up a session
The host needs to run the executable and provide a url to other users to connect to.
The setup happens through the session-control page, and also serves the host as the UI for controlling the sending of instructions to the client page.
Instructions can only be viewed on the client page, as such the host needs to check the client page for the results.
