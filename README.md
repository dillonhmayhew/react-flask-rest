# react-flask-rest 

This is a **React.js** front-end I built for the RESTful API I created with Flask. A full demo and explanation of the API can be found [here](https://github.com/dillonhmayhew/todo-rest-api). Learning React.js and understanding its component-based structure and dependencies on *state* made this project one of funnest experiences for me. React is beautifully structured and this will certainly not be my last project with it.

With only minor changes to my original API, React made this project almost seamless. This project contains all the functionality of my original API and is served through `react-table`, `react-router-dom` and of course `react-bootstrap` and `bootstrap`.

## How it works?

Flask runs its own server on port 5000, while the React project runs on port 3000. In the *package.json* config file I added a proxy redirection from React to Flask. This way, any requests it receives on port 3000 that it does not understand will be redirected to `http://127.0.0.1:5000`.

A full detailed explanation by [Miguel Grinberg](https://blog.miguelgrinberg.com) can be found [here](https://blog.miguelgrinberg.com/post/how-to-create-a-react--flask-project).

[Installation](https://github.com/dillonhmayhew/react-flask-rest#installation)

## Requirements

You will need to install these three packages on your machine:

* [Node.js](https://nodejs.org/)
* [Yarn](https://yarnpkg.com/)
* [Python3](https://python.org/)

# Installation

**Clone the repository:**

`>git clone https://github.com/dillonhmayhew/flask-react-rest.git`

**Install the requirements for the React portion of the project:**

`>yarn install`

**While those packages are being installed, go ahead and open another terminal in the project directory:**

**In your new terminal, go to the directory of the of the API:**

`>cd api`

**Use Python 3's built in virtual environment package:** `python3 -m [module-name] [name of virtual environment]`

On **Linux:**

`>python3 -m venv venv` **OR**

On **Windows:**

`>python -m venv venv`

**Note:** If you are using Ubuntu/Debian, you may have to install this as a separate distro package:

`>sudo apt-get install python3-venv`

`>python3 -m venv venv`

**Activating you're new virtual environment:**

On **Linux:**

`>. venv/bin/activate` **OR**

On **Windows:**

`>venv\Scripts\activate`

**Install the requirements of the API:**

`(venv) >pip install -r requirements.txt`

**After both sets of requirements have been installed, use one terminal to start the API:**

`>yarn start-api`

**and the other to start React:**

`>yarn start`

`yarn start` **should open your default browser on http://localhost:3000 and you will be presented with the home page:**
