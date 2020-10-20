# README
![GitHub](https://img.shields.io/github/license/zhyd1997/Eorg)

Migrated to [blog](https://zhangyadong.me/)

# Plan *New~*

I am trying to transfer the framework of rich-text-editor from draft-js to quill-js.

- draft-js API is too hard.
- implement citation after content is impossible.
- modify the block elements style like markdown or org-mode is impossible.

These situations above only suit me.

# Features

Migrated to [project management](https://github.com/zhyd1997/Eorg/projects)
![wish list](https://i.imgur.com/mc9xri8.png)

## demo
![editor and preview panel](https://i.imgur.com/UNm4P0P.png)
![downloaded pdf](https://i.imgur.com/EhLXoEC.png)

# Developer Tips
```shell script
## `start` backend

git clone https://github.com/zhyd1997/Eorg-Server.git
cd Eorg-Server
yarn install
DEBUG=Eorg-Server:* yarn run start # runs on port:3000

## `start` frontend

git clone https://github.com/zhyd1997/Eorg.git
cd Eorg
yarn install
yarn run start # it should run on port:8080.

```

# User Tips
Content only supports a single style
