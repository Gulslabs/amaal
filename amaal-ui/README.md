## Amaal UI
- Amaal Module Displays the weekly amaal sheet for the logged in user. 
- The user can update his amaals and they are persisted in DB.
## Setup
### Prerequisite
- `node --version` # v20.9.0
- `npm --version` # 10.4.0
- Install below global packages
  - `npm list -g`
  - ├── @nestjs/cli@10.2.1
  - ├── @remix-project/remixd@0.6.27
  - ├── nodemon@3.1.0
  - ├── npm@10.4.0
  - ├── typescript@5.3.2
  - |── yarn@1.22.21 
   
### How to Run: 
- `cd <WORK_DIR>/amaal-tracker/amaal-ui`
- `npm install`
- `npm run dev`
- Open ` http://localhost:3000` on a browser 
 ## References: 
 - https://www.reddit.com/r/nextjs/comments/16b6ozn/setting_cookies_in_nextjs_13_do_you_have_fetch_a/?rdt=47395&onetap_auto=true&one_tap=true
 - https://github.com/vercel/next.js/discussions/48434 . *_DONT INCLUDE sameSite while setting response.cookies.set_*
 - Understanding React UseEffect Fetch data: https://www.youtube.com/watch?v=2-crBg6wpp0&t=21298s starting at 06:05:00 Hours. 
 - Double Rendering Issue: https://react.dev/blog/2022/03/08/react-18-upgrade-guide#updates-to-strict-mode 

### Important Points about useEffect. 
- UseEffect by default runs everytime a state change occurs; to have it run only during initial render pass empty array [] as second argument
- You can have multiple UseEffect in a component and they all will run once(ex: when last parameter is empty array []). 


