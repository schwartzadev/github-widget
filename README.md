# github-widget
A widget to display stats about a given Github repo
## Usage
In order to use this properly. you must specify the owner of the repo, as well as the repo itself.

For example:

![Example image](https://i.imgur.com/XVFDAD3.png)

Then, append these to the URL for this repo, i.e. `https://schwartzadev.github.io/github-widget/?user=schwartzadev&repo=debate-timer`

To embed the widget into a webpage, use the following iframe (HTML) code:

`<iframe src="https://schwartzadev.github.io/github-widget/?user=**name**&repo=**repo**" height="135" frameBorder="0"></iframe>`

## About

This uses client-side Javascript (and JQuery), using the Github API. I also used CSS and HTML.
Note that since the Github API requests are unauthenticated, so if you use too many widgets (or make other unathenticated Github API requests) from a single IP, you will timeout.
