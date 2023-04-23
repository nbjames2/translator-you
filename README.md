# Translator You
### To Run
- In root directory run `docker build -t translator-you . && docker run -d -p 3000:80 -it translator-you` from terminal
- you can then access it at `localhost:3000` in the browser

### Design Considerations
- Initially I was going to use React Router to have a title screen route and a game route but after a more thorough reading of the instructions it didn't make sense
- I bootstrapped the app with create-vite-app using the react-typescript template
- I chose to use the `react-xarrows` package to draw the arrows because I found it to be the easiest and best looking option