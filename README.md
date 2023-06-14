<h1 align="center">Organic API Service</h1>
<p align="center">
  <img src="organic_logo.png" alt="Organic" height="120" />
</p>
<p align="center">
  This Repository is used by Cloud Computing path cohort to create documentation for API services
</p>
<br>
<h2>Current Implementation</h2>
<br>
<h3>Available API Services</h3>
<p>
1. Authentications
<br>
   <pre>POST https://organic-api-service-ejjwtknspq-et.a.run.app/createUser</pre>
    <p>- Request Body {"username", "email", "password"} <br>
    - Response Body {"message", "status"} <br></p>
    
   <pre>POST https://organic-api-service-ejjwtknspq-et.a.run.app/login</pre>
   <p>- Request Body {"email", "password"} <br>
    - Response Body {"message", "status"} <br></p>
    
   <pre>POST https://organic-api-service-ejjwtknspq-et.a.run.app/refreshAccessToken</pre>
   <p>- Request Body {"refreshToken"} <br>
    - Response Body {"accessToken", "message", "status"} <br></p>
    
   <pre>POST https://organic-api-service-ejjwtknspq-et.a.run.app/logout</pre>
   <p>- Request Body {"refreshToken"} <br>
    - Response Body {"message", "status"} <br></p>
<br>
2. Result Classification Information
<br><br>
   <pre>GET https://organic-api-service-ejjwtknspq-et.a.run.app/info_ML/{result}</pre>
   <p>- Query {result} <br>
    - Response Body {fomattedInfo} <br></p>
</p>
<br>
<h3>Cloud Architecture</h3>
<p align="center">
  <img src="cloud architecture organic.png" alt="Cloud Architecture" />
</p>
<br>
<h3>Deployment Environment</h3>
<br>
<p>
1. Dependency
  <br>
  <pre>
  - express
  - jsonwebtoken
  - bcrypt
  - dotenv
  - mysql </pre>
  <br>
2. Environment variable
  <br>
  <pre>
  - GOOGLE_PROJECT_ID={your project ID}
  - CLOUD_RUN_SERVICE={your cloud run service name}
  - REPO_NAME={your artifact registry repository name}
  - INSTANCE_CONNECTION_NAME={your project ID:location:sql instance name}
  - DB_USER={instance admin usename}
  - DB_PASS={instance admin password}
  - DB_NAME={database user name}
  - DB_NAME_ML={database ML name}
  - ACCESS_TOKEN_SECRET={your own access token key}
  - REFRESH_TOKEN_SECRET={yout own refresh token key} </pre>
  <br>
3. Cloud shell command
  <br>
  <pre>
  - gcloud builds submit --tag {location}-docker.pkg.dev/$GOOGLE_PROJECT_ID/$REPO_NAME/$CLOUD_RUN_SERVICE \
    --project=$GOOGLE_PROJECT_ID
    <br>
  - gcloud run deploy $CLOUD_RUN_SERVICE \
    --image {location}-docker.pkg.dev/$GOOGLE_PROJECT_ID/$REPO_NAME/$CLOUD_RUN_SERVICE \
    --add-cloudsql-instances $INSTANCE_CONNECTION_NAME \
    --update-env-vars INSTANCE_CONNECTION_NAME=$INSTANCE_CONNECTION_NAME,DB_USER=$DB_USER,DB_PASS=$DB_PASS,DB_NAME=$DB_NAME,ACCESS_TOKEN_SECRET=$ACCESS_TOKEN_SECRET,REFRESH_TOKEN_SECRET=$REFRESH_TOKEN_SECRET,DB_NAME_ML=$DB_NAME_ML \
    --platform managed \
    --region {location} \
    --allow-unauthenticated \
    --project=$GOOGLE_PROJECT_ID </pre>
    <br>
</p>
<br>
<h2>Under Development</h2>
<h3>Entity Relationship Diagram (ERD)</h3>
<p align="center">
  <img src="ERD organic.png" alt="ERD" />
</p>
<br>


