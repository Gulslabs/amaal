
## SETUP
### Prerequisite 
- Insall NPM and Node JS
    - ``
- Install below global packages. 

### How to Run
- Checkout `git clone <URL>`
- `cd amaal-server`
- `yarn` #Install all modules.
- `yarn start:dev`
- Amaal APIs are available at `http:localhost:3001`
    - Auth
        - GET:`http://localhost:3001/api/google/login` - Authenticate using Google
        - GET:`http://localhost:3001/api/me` - call this along with google token to retrive profile details `firstName`, `lastName`, `picture`
        - GET:`http://localhost:3001/api/google/redirect` - Redirect to Amaal-UI

    - Amaal: 
        -  GET:`http://localhost:3001/api/amaal?startOfWeek=2024-05-26&endOfWeek=2024-05-27` - Retrieve Amaals between any two given dates. 
        - POST: `http://localhost:3001/api/amaal` - Post a `DayAmaal`
    - Tanzeem
        - POST: 
        - GET: 
        - DELET: 

## AUTHETICATION MODULE 

## AMAAL MODULE 
- `DayAmaal`: Tracks the Amaal for given date. Amaal include `ZIKR, FAJR, TAHAJJUD, ROZA, ASTAGFAR, SADAQAH`

## ORGANIZATION MODULE 
- Using Neo4j Docker container to setup an oragnaization of Momins. `docker run -d --name neo4j -p 7474:7474  -p 7687:7687 -e NEO4J_AUTH=neo4j/test12345 -d neo4j:latest`
- Everyone in this organisation is a `Momin`; and may have different designations. 
- Designation [*Maulim, Ustaad, Naqeeb, Student*] are called `Audha`; for now this is just of a Momim; latter we can refactor it into a Relationship. 
- Student is at lowest level he will not have any reportees. 
- Relationship`(:A)-[:REHBAR_OF]->(:B)` is A is Manager of B.  
- Every `Momin` would also 


### References: 
 - | Link:  https://dev.to/chukwutosin_/implement-google-oauth-in-nestjs-using-passport-1j3k | Github: https://github.com/folucode/google-oauth-app |
 
- | Link: https://www.youtube.com/watch?v=OitgkKTxht4 | Github:  https://github.com/stuyy/google-nestjs-oauth2/ |

```
npm install @nestjs/passport passport passport-google-oauth20 @nestjs/jwt passport-jwt
npm install @types/passport-google-oauth20 @types/passport-jwt

````