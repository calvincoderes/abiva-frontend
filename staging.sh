#!/bin/bash

SKIP_PREFLIGHT_CHECK=true \
REACT_APP_ENV=prod \
REACT_APP_API_URL=https://abiva-backend.trifectacore.tech \
REACT_APP_FRONTEND_URL=https://abiva.trifectacore.tech \
REACT_APP_SECRET_ID=DhsFGNRYj533w5uECnGmbyzJ7HitjFKrfFfEOjNe \
REACT_APP_SECRET_KEY=XOaUjEr9uFkBiMsMrJpuT3YbwOH0l71rjEzs0Fi6YLaOi9MgOhnMNhq3WyCGHtAPGq08zIIwHIc0tPPITEjD4itsuIfhasee64JFadSK9tgFFTAc8tVp2fjcMNqsLCEP \
yarn run build

# aws s3 sync build/ s3://bukobus --acl public-read
ssh -i ~/.ssh/abiva.pem ubuntu@18.139.137.216 "sudo rm -rf /opt/staging/abiva-fe/build"
scp -i ~/.ssh/abiva.pem -r ./build ubuntu@18.139.137.216:/opt/staging/abiva-fe/
