#!/bin/bash

# 定义备份文件的名称
BACKUP_FILE="backup_file11.sql"

# 定义数据库连接信息
DB_USER="root"
DB_HOST="localhost"
DB_NAME="good_music"

# 使用 pg_dump 命令备份数据库 postgres 数据库
# pg_dump -U $DB_USER -h $DB_HOST -d $DB_NAME -f $BACKUP_FILE

# 使用 mysqldump 命令备份数据库
# mysqldump -u $DB_USER -h $DB_HOST $DB_NAME > $BACKUP_FILE
mysqldump -u $DB_USER -h $DB_HOST -p $DB_NAME > $BACKUP_FILE


# 输出备份文件的位置
echo "Database backup created at: $BACKUP_FILE"