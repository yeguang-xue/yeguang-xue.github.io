# Setting up Node.js and Npm from Binaries

###### 1. Download the pre-built binaries and extract to destinations

```sh
tar -xvf {binary}
```

###### 2. Add environment variables to .bashrc

```sh
# Node.js
NPM_PACKAGES="/home/yeguang/Software/node-v0.12.4-linux-x64"
NODE_PATH="$NPM_PACKAGES/lib/node_modules:$NODE_PATH"
PATH="$NPM_PACKAGES/bin:$PATH"
unset MANPATH # delete if you already modified MANPATH elsewhere in your config
MANPATH="$NPM_PACKAGES/share/man:$(manpath)"
```
