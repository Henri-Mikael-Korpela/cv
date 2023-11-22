# Curriculum vitae - Henri Korpela

This is my CV focused on software development. It is implemented using JavaScript modules and web components.

[Here](http://henrijahanna.fi/henri/) is the CV online.

Bring your own favicon!

## Deployment to an FTP server

I set up deployment of CV online earlier using FTP connection. FTP deployment uses `deploy_ftp.py` script (requires Python to run). The deployment also requires `.env` file with the following content (values are example values):

```
FTP_SERVER_HOST=ftp.example.com
FTP_SERVER_PORT=21
FTP_SERVER_PASSWORD=ftppassword
FTP_SERVER_USERNAME=ftpuser
FTP_SERVER_OUTPUT_DIR=/exampledir
```

Script is tested with Python version 3.10.