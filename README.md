<p align="center">
  <a href="https://github.com/riimuru/gogoanime">
    <img src="https://user-images.githubusercontent.com/47270636/222915875-49e307c0-f781-4edb-a06a-db4ed96818a9.png" alt="Logo" width="150" height="150">
  </a>

  <h3 align="center">Anifire 🔥</h3>

  <p align="center">
    <samp>A free anime streaming app for FireTV stick <a href="https://github.com/consumet/api.consumet.org">Made with Consumet API</a></samp>
  </p>
  

# Installation
- Download the latest release from [here](https://github.com/RG7279805/anifire/releases)
- Download and Install [Web App Tester](https://www.amazon.com/Amazon-Digital-Services-Inc-Tester/dp/B00DZ3I1W8) on your FireTV stick from FireStore
- Open WebAppTester and check TV network IP address
- Connect via ABD with FireTV
```
adb connect <ip addr of TV>
```
- Just run ``` adb push anifire.zip /sdcard/amazonwebapps/```
- This will install the packaged app, now open the app from packaged app section of WebAppTester


## Developement
If you want to develop/add features you can do it easily since its a React app made with ViteJs<br>
Context for easy control via FireTV remote is there

#### Start the dev server
```
yarn dev
```

#### Build
```
yarn build
```
make sure to zip all the files in build and then send it to FireTV
