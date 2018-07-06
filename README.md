# Applit 🌶

Web App Framework for building Stateful Apps with lit-html 🔥 View Layer

## Status

**Early alpha** This project is in development phase. IT'll have breaking changes to the APIs until a first version is released. The roadmap below will give an insight in what will be the focus.

## Roadmap and ideas
  
  - [**0.0.5**](./CHANGELOG.md#0.0.5) update state outside the view
  - lifecycle events (oncreate, ondestroy, etc)
  - payload to call 'actions' with dynamic data
  - async (for calls to api's)
  - lazy components using [dynamic imports](https://github.com/tc39/proposal-dynamic-import)

## Example

Try an example [here codesandbox.io](https://codesandbox.io/embed/xlr2pvmro4)

## Getting Started

This is a very minimal example to get you started. 
A simple counter, with `up` and `down` actions.

Install applit and parcel (to build and run the app).

```bash
npm init -y
npm install --save applit lit-html
npm install --save-dev parcel
```

Create an `src/index.js`

```javascript
import { html } from 'lit-html'
import { applit } from 'applit'

const up = () => state => ({ count: state.count + 1 })
const down = () => state => ({ count: state.count - 1 })

applit(
  () => ({ count: 0 }),
  (bind, state) => html`
    <h1>Counter</h1>
    <p>${state.count}</p>
    <button onclick=${bind(up, bind)}>Up</bind>
    <button onclick=${bind(down, bind)}>Down</bind>
  `,
  document.body
)

```

And use it in the `src/index.html`

```html
<html>
<body>
  <script src="./src/index.js"></script>
</body>
</html>
```

Now run Parcel and view it in your browser 
(`npx` is a tool to run `node_modules/.bin` executables from the project)

```bash
npx parcel ./src/index.html
```

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Albert Groothedde** - *Initial idea* - [Alber70g](https://github.com/alber70g)

## License

This project is licensed under the MIT License

