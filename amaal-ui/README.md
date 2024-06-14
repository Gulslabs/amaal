## TO READ
 - App Router. 
 - API Route Handlers. 

 ## References: 
 - https://www.reddit.com/r/nextjs/comments/16b6ozn/setting_cookies_in_nextjs_13_do_you_have_fetch_a/?rdt=47395&onetap_auto=true&one_tap=true
 - https://github.com/vercel/next.js/discussions/48434 . *_DONT INCLUDE sameSite while setting response.cookies.set_*
 - Understanding React UseEffect Fetch data: https://www.youtube.com/watch?v=2-crBg6wpp0&t=21298s starting at 06:05:00 Hours. 
 - Double Rendering Issue: https://react.dev/blog/2022/03/08/react-18-upgrade-guide#updates-to-strict-mode 


### Important Points about useEffect. 
- UseEffect by default runs everytime a state change occurs; to have it run only during initial render pass empty array [] as second argument
- You can have multiple UseEffect in a component and they all will run once(ex: when last parameter is empty array []). 

### TODO: 
- Mix-in: Generate dummy amaal for given date(s) where DB has no entries and pull Amaal from DB when the entries exists. 
- Implement POST dayAmaal. Save Dayamaal in DB.

