---
layout: post
title: Deploy Streamlit using Docker with Nginx Serving Static Files
category:
  - Technical
tags:
  - IT
  - Networking
  - Storage
  - Homelab
license: CC-BY
last_modified_at: 2024/02/05
---

`Streamlit` is a trending Python library for creating web applications in the field of data science and machine learning. It provides many common input widgets and display elements wrapped in a clean Python API, allowing users to define feature-rich web pages, without having to deal with HTML, CSS, and JS. This post will go through how to deploy a Streamlit application with docker and Nginx. 

## Dockerize Streamlit App

To deploy a Streamlit application with docker, first we need to build a docker image of the application. A `Dockerfile` like below serves the purpose:

```dockerfile
FROM python:3.12-slim

WORKDIR /app

RUN apt-get update && apt-get install -y \
    build-essential \
    curl \
    software-properties-common \
    git \
    && rm -rf /var/lib/apt/lists/*

COPY app/ .

RUN pip3 install -r requirements.txt

EXPOSE 8501

HEALTHCHECK CMD curl --fail http://localhost:8501/_stcore/health

ENTRYPOINT ["streamlit", "run", "Home.py", "--server.port=8501", "--server.address=0.0.0.0"]
```

This `Dockerfile` is simply adapted from the one from [tutorial](https://docs.streamlit.io/knowledge-base/tutorials/deploy/docker), simply replacing the `git clone` with coping from a local repo `app/`. Then `docker build` command can be used to create the image, and `docker run` command is used to launch the container. 

## Deploy together with Nginx

For a simple demo app, Nginx probably is not necessarily. But for any production deployment, I always tend to put Nginx in front of the application. One important reason is Nginx seems more efficient to serve static files. This is particularly important Streamlit, because [current version of Streamlit only supports static serving of small media files](https://docs.streamlit.io/library/advanced-features/static-file-serving), any other generic files will be sent with header `Content-Type:text/plain` which will cause browsers to render in plain text. Below is an example of Nginx configuration file.  

```nginx
server {
    listen       80;
    server_name  _;
        
    location ~ \.(pdf|djvu)$ {
        expires max;
        root   /srv/www;
        try_files $uri =404;
    }

    location / {
        proxy_pass http://app:8501/;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $http_host;
        proxy_redirect off;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";

    }
}
```

To deploy Streamlit together with Nginx in Docker, the most convenient way is to use `Docker Compose`. It's a tool for defining and running multi-container applications. Here is a minimal configuration file `compose.yaml`:

```yaml
services:
  app:
    build: .
  nginx:
    image: "nginx:latest"
    volumes:
      - ./static:/srv/www/static
      - ./default.conf:/etc/nginx/conf.d/default.conf
    ports:
      - "8080:80"
```

The command to launch the application is `docker compose up -d --build`. Here `--build` forces rebuild of the image during development stage.
## Concluding Remarks

For programmers like me who are not very familiar with those languages, Streamlit greatly simplifies the front end development difficulties. Recently I'm even considering rewriting some previous full-stack Flask projects with Streamlit, just to reduce maintenance efforts, and let me focus more on the core part of the projects rather than styling. Hope this blog post is helpful when you deploy your own Streamlit app. 

## References

1. [Streamlit: Documentation](https://docs.streamlit.io)
2. [Streamlit: Deploy Streamlit using Docker](https://docs.streamlit.io/knowledge-base/tutorials/deploy/docker)
3. [Streamlit: Static file serving](https://docs.streamlit.io/library/advanced-features/static-file-serving)
