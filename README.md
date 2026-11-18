# Experiment 9 - Total and Average Marks of Three Subjects

## Aim
Write a program to calculate the total and average marks of three subjects, upload the source code to GitHub using Git, create a Docker image for the application, and execute Selenium test cases to verify the calculation results.

## Project files
- `index.html` - calculator user interface
- `style.css` - page styling
- `app.js` - total and average calculation logic
- `Dockerfile` - builds the static web application image using Nginx
- `package.json` - Selenium dependency and test command
- `test.js` - automated browser tests
- `.gitignore` - excludes generated dependencies

## Requirements
- Git and GitHub account
- Docker Desktop
- Node.js and npm
- Google Chrome

## 1(a) Run locally
Open a terminal in this folder and run:

```bash
py -m http.server 5500
```

Open `http://localhost:5500`, enter marks for the three subjects, and click **Calculate**.

## Git and GitHub upload

Create a GitHub repository named `Total-Average-Marks` (do not initialize it with a README if pushing this existing project), then run:

```bash
git init
git add .
git commit -m "Initial commit - Total and Average Marks"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/Total-Average-Marks.git
git push -u origin main
```

Replace `YOUR-USERNAME` with your GitHub username.

## 1(b) Build and run the Docker image

```bash
docker build -t marks-calculator:1.0 .
docker images
docker run -d -p 8085:80 --name marks-calculator marks-calculator:1.0
```

Open `http://localhost:8085` and verify the calculator.

To stop and remove the container:

```bash
docker stop marks-calculator
docker rm marks-calculator
```

## Selenium automated testing

Keep the Docker container running while testing. Open a second terminal in the project folder:

```bash
npm install
npm test
```

Selenium opens Chrome and tests the application at `http://localhost:8085`.

### Test cases included

| Test | Input marks | Expected total | Expected average |
|---|---|---:|---:|
| Normal calculation | 80, 90, 70 | 240 | 80.00 |
| Recalculation | 75, 80, 85 | 240 | 80.00 |
| Boundary case | 0, 0, 0 | 0 | 0.00 |

Expected terminal messages:

```text
PASS: Test 1 - Total 240 and average 80.00.
PASS: Test 2 - Recalculation works for a second input set.
PASS: Test 3 - Zero marks boundary case.

All Selenium test cases passed.
```

## Calculation logic

- Total = Subject 1 + Subject 2 + Subject 3
- Average = Total / 3

Each subject mark is validated to be between 0 and 100.

## Notes
- The Selenium script uses Chrome. Ensure Google Chrome is installed.
- Selenium Manager may automatically obtain a compatible ChromeDriver.
- Do not commit the `node_modules` folder.
- If port 8085 is already in use, change the host port in the `docker run` command and set the `APP_URL` environment variable before running tests.
