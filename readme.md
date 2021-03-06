countdown_timer
=========

## Installation

1. Install [Node.js](https://nodejs.org/en/download/)
1. Install Gulp
	- `npm install --global gulp`
1. Install required packages
	- `npm install`
1. Run gulp to list available comments
	- `gulp`
1. Run gulp build the build using the provided theme
    - `gulp build --theme mediary`

## Folder structure

- casparcg_output
	- Copy the contents of this folder onto the CasparCG server
- src
	- This is where the source to the CasparCG template lives. If you want to make changes to the Countdown Timer, this is where you should do it

## Themes

Theme support is available. To make a new theme, duplicate an existing theme (e.g. "base") from the `./src/themes` directory and then make any required adjustments. Most likely you'll be wanting to edit `./src/themes/<theme_name>/css/styles.less` to edit the font size, add a background image etc.

- base
    - css `any css/less files in this directory will be merged into ./casparcg_output/css/main.css`
        - styles.less `the main styles for the theme`
    - images `any files in this directory will be copied into ./casparcg_output/images`
    - js `any js files in this directory will be merged into ./casparcg_output/js/main.js`
    - lib.json `Use this file to list any additional third-party libraries that you want to include. They will be copied as is into the appropriate build directory.`
    - * `any other folder will be copied into ./casparcg_output`

## CasparCG Client Settings

Times should be passed through using either the `f0` or `time` key as number of seconds, or using the "HH:MM:SS" or "MM:SS" format.

By default the template will hide itself at the end of the countdown, you can pass through `0` or `false` to the `f1` or `hideOnEnd` key to keep the template visible.

By default the timer counts down. You can pass through `1` or `true` to the `f2` or `countUp` key to have it count up instead. In this mode it will keep counting forever until you take it offline.

When counting up, in "MM:SS" format the time keeps on counting indefinitely. After 99:59 you get 100:00. The background automatically resizes but is not animated. If you want to see hours, use "HH:MM:SS" format.

![](template_settings.png?raw=true)

## Debugging and Creating a New Theme

While the primary purpose of the countdown-timer is for use with [CasparCG](http://www.casparcg.com/), you don't need to copy the changes to a CasparCG server each time you adjust a theme. You can view your changes by simply opening the *compiled* source (`./casparcg_output/countdown_timer.html`) in a modern browser (e.g. Chrome - since CasparCG is built on an old Chrome version).
