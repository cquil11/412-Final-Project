#!/bin/bash

# Set your S3 bucket name
BUCKET_NAME="cs412cquilici.xyz"

# Set the local directory you want to upload
LOCAL_DIRECTORY="./src"

# The S3 path where you want to upload
S3_PATH="s3://$BUCKET_NAME/"

# Sync local directory to S3
aws s3 sync $LOCAL_DIRECTORY $S3_PATH

echo "Upload to S3 completed"

