#!/bin/bash

SKIP_PREFLIGHT_CHECK=true \
REACT_APP_ENV=prod \
REACT_APP_API_URL=https://abiva-backend.trifectacore.tech \
REACT_APP_FRONTEND_URL=ttps://abiva.trifectacore.tech \
REACT_APP_SECRET_ID=lv43DrWSQ9TEK2Mll3AxV57hLgFsss2qutiKxHhJ \
REACT_APP_SECRET_KEY=RZJRcSRyTt3vvNKFHsmi8MHVHzyB2lPI1ZsYzOVUb46wnCwgCFgXBotPU5TOzUaM2yAzbIrkdT0ogHEOCmeSaUkGAXmaFSQd2nQhyEq9WHLGR6rUzBbIFtyfVdf8BCgc \
yarn run build

# aws s3 sync build/ s3://bukobus --acl public-read
ssh -i ~/.ssh/abiva.pem ubuntu@18.139.137.216 "sudo rm -rf /opt/prod/abiva-fe/build"
scp -i ~/.ssh/abiva.pem -r ./build ubuntu@18.139.137.216:/opt/prod/abiva-fe/
