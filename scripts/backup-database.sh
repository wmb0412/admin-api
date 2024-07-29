#!/bin/bash

# 定义备份文件的名称
BACKUP_FILE="backup_file.sql"

# 定义数据库连接信息
DB_USER="default"
DB_HOST="ep-young-field-73339906-pooler.us-east-1.aws.neon.tech"
DB_NAME="verceldb"

# 使用 pg_dump 命令备份数据库
pg_dump -U $DB_USER -h $DB_HOST -d $DB_NAME -f $BACKUP_FILE

# 输出备份文件的位置
echo "Database backup created at: $BACKUP_FILE"