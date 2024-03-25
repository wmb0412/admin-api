# 使用 Node.js 官方 Alpine 版本作为基础镜像
FROM node:alpine

# 将淘宝 NPM 镜像源设置为默认源
RUN npm config set registry https://registry.npmmirror.com

# 安装 Yarn

# 设置工作目录
WORKDIR /usr/src/app



# 将依赖文件复制到工作目录
COPY package*.json ./

# 安装依赖
RUN npm install

# 将应用程序文件复制到工作目录
COPY . .

RUN npm build


# 暴露应用程序端口（根据您的 NestJS 应用程序的配置）
EXPOSE 3000

# 启动应用程序
CMD ["npm", "start:prod"]
