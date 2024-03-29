# Curriculum vitae - Henri Korpela

This is my CV focused on software development. It is implemented using JavaScript modules and web components.

[Here](http://henrijahanna.fi/henri/) is the CV online.

Bring your own favicon!

## Running locally

You can simply statically serve `/src` directory contents. For example, if you have Python 3, you can start a static HTTP server from project root directory as follows:

```bash
python3 -m http.server --directory ./src <PORT>
```

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

## Deployment to Azure as a Static Web App

CV online actually runs on Azure Wep Apps service. I set up `/src` using Static Web App (SWA) and GitHub integration using Azure Portal. 

There is currently no deployment script to Azure, but there might be in the future!

## Known issues

- Deployment via FTP does not work, because the deployment script in Python does not account for deploying subdirectory content (namely assets directory). The script should be updated to deploy the whole `/src` directory recursively.