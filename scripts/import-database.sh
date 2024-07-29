#!/bin/bash

# 定义备份文件的名称
BACKUP_FILE="backup_file.sql"

# 定义数据库连接信息
DB_USER="default"
DB_HOST="ep-young-field-73339906-pooler.us-east-1.aws.neon.tech"
DB_NAME="verceldb"

psql -U $DB_USER -h $DB_HOST -d $DB_NAME -f scripts/clear-database.sql

# 使用 psql 命令导入数据
echo "Importing data from $BACKUP_FILE..."
psql -U $DB_USER -h $DB_HOST -d $DB_NAME -f $BACKUP_FILE

# 输出导入结果
echo "Data imported successfully."