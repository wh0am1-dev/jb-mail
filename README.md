# jb-mail

email list sender for [Javier Lekker](https://javierlekker.com)

## installation

- [download node](https://nodejs.org) and install it on your machine
- [download this repo](https://github.com/wh0am1-dev/jb-mail/archive/refs/heads/main.zip) and unzip it anywhere
- open the decompressed folder
- install dependencies:
  - right-click anywhere inside the folder and click on "open terminal here"
  - write and run `npm i` inside that terminal, you can close it after it finishes
- setup `.env` file:
  - `HOST`: smtp mail server
  - `MAIL`: sender email address
  - `PASSWORD`: sender email password

## usage

- setup `data/contacts.csv`: comma separated values, columns represent variables interpolated in the template, should have at least an `email` column
- setup `data/subject.txt`: email subject, use a single line of text
- setup `data/template.html`: email body template using [HTML syntax](https://developer.mozilla.org/en-US/docs/Web/HTML), you can interpolate csv columns using `{{column}}` notation
- run `send.bat`, you can double-click it on windows
