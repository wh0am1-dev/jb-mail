# jb-mail

email list sender for [Javier Lekker](https://javierlekker.com)

## how-to

- install [node](https://nodejs.org)
- setup `.env` file:
  - `HOST`: smtp mail server
  - `MAIL`: sender email address
  - `PASSWORD`: sender email password
- setup `/data` files:
  - `contacts.csv`: comma separated values, columns represent variables interpolated in the template, should have at least an `email` column
  - `subject.txt`: email subject, use a single line of text
  - `template.html`: email body template, you can interpolate csv columns using `{{column}}` notation
- run `send.bat`, you can double-click it on windows
