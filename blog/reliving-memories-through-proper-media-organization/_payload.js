export default (function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M){return {data:{"/blog/reliving-memories-through-proper-media-organization":{_path:"\u002Fblog\u002Freliving-memories-through-proper-media-organization",_dir:"blog",_draft:n,_partial:n,_locale:"en",_empty:n,title:"Re-living memories through proper media organization",description:"Organizing media such as photos and videos can bring back cherished memories and help relive them. Here's my approach to organizing my digital media collection.",image:"\u002Fimages\u002Fdigital-media-2023\u002Fimage-collection.png",alt:"Managing my unwieldy pictures collection",postDate:"2023-02-06T00:00:00.000Z",tags:["personal","technology"],body:{type:"root",children:[{type:a,tag:l,props:{id:"capturing-lifes-moments"},children:[{type:b,value:"Capturing Life's Moments"}]},{type:a,tag:d,props:{},children:[{type:b,value:"We make priceless memories as life progresses – memories we want to keep forever. They can be minor, everyday occurrences or significant, life-altering occasions that serve as a reminder of who we were, what we've been through, and what we've learned. They are really valuable and can make us feel sad, happy, or nostalgic."}]},{type:a,tag:d,props:{},children:[{type:b,value:"Unfortunately, our memory is fallible and we can only remember so much. Despite our innate limitations, we have continually sought to immortalize moments of significance. From cave paintings to digital photos and videos, we have come a long way."}]},{type:a,tag:d,props:{},children:[{type:b,value:"Photos and videos help us not just to remember the events, but the associated emotions and feelings as well. They also allow us to show others the experiences we've had and the memories we hold dear, creating a shared history and a sense of connection with those around us."}]},{type:a,tag:l,props:{id:"why-organize-digital-media"},children:[{type:b,value:"Why organize digital media?"}]},{type:a,tag:d,props:{},children:[{type:b,value:"With ubiquitous camera technology, capturing memories is easier, but revisiting them can be a challenge. A disorganized and huge photo and video collection can leave us with a sense of dread. Proper organization of digital media serves as a safeguard for our precious memories, ensuring that they remain a constant source of comfort and inspiration."}]},{type:a,tag:d,props:{},children:[{type:b,value:"Like many people of our generation, I have amassed a large personal collection of photos and videos. I had to find a solution that enabled me to effortlessly navigate through the vast collection of my cherished moments."}]},{type:a,tag:l,props:{id:"considerations-for-a-solution"},children:[{type:b,value:"Considerations for a solution"}]},{type:a,tag:d,props:{},children:[{type:b,value:"Here are a few of the considerations that were important to me in choosing a solution:"}]},{type:a,tag:f,props:{},children:[{type:a,tag:c,props:{},children:[{type:b,value:"I wanted my digital media stored on a local device, not in a cloud that could restrict my access."}]},{type:a,tag:c,props:{},children:[{type:b,value:"The software had to be open-source and have enough features to handle my media organization needs."}]},{type:a,tag:c,props:{},children:[{type:b,value:"The metadata I added to my media needed to be in an open format for easy manipulation."}]}]},{type:a,tag:d,props:{},children:[{type:b,value:"After some research, I came across "},{type:a,tag:s,props:{href:"https:\u002F\u002Fwww.digikam.org\u002F",rel:[t]},children:[{type:b,value:"digiKam"}]},{type:b,value:" which matched all my requirements. digiKam is a feature-rich free and open-source software to manage your digital media collection. It is available for Linux, Windows, and macOS."}]},{type:a,tag:u,props:{id:v},children:[{type:b,value:w}]},{type:a,tag:d,props:{},children:[{type:b,value:"After investing a lot of time trying to figure out what works for me, the workflow that I have settled on is as follows:"}]},{type:a,tag:"ol",props:{},children:[{type:a,tag:c,props:{},children:[{type:b,value:"Import"}]},{type:a,tag:c,props:{},children:[{type:b,value:"Culling"}]},{type:a,tag:c,props:{},children:[{type:b,value:"Organization"}]},{type:a,tag:c,props:{},children:[{type:b,value:"Editing and enhancing"}]},{type:a,tag:c,props:{},children:[{type:b,value:"Cloud Backup"}]}]},{type:a,tag:d,props:{},children:[{type:b,value:"I go to steps 1 to 5, mostly in a sequence when importing new media. Occasionally, I look back at my digiKam collections and perform the steps from 2 to 5."}]},{type:a,tag:j,props:{id:x},children:[{type:b,value:y}]},{type:a,tag:d,props:{},children:[{type:b,value:"I have three major sources of my pictures and videos: my cellphone, a GoPro action camera, and a DJI Mini 3 Pro drone. Their media is imported and saved to an external SSD."}]},{type:a,tag:d,props:{},children:[{type:b,value:"I use a card reader to import the media from the GoPro and the DJI drone using digiKam."}]},{type:a,tag:d,props:{},children:[{type:b,value:"For photos and videos that I take with my Android cellphone, I use an open-source program called "},{type:a,tag:s,props:{href:"https:\u002F\u002Fdamonlynch.net\u002Frapid\u002Findex.html",rel:[t]},children:[{type:b,value:"Rapid Photo Downloader"}]},{type:b,value:" to download them to a directory on my computer using File Transfer mode. I use Rapid Photo Downloader due to digiKam's failure to import media from my cellphone."}]},{type:a,tag:d,props:{},children:[{type:b,value:"The imported media is automatically organized by date in the format "},{type:a,tag:m,props:{},children:[{type:b,value:z}]},{type:b,value:" by digiKam. Rapid Photo Downloader imports it in the format "},{type:a,tag:m,props:{},children:[{type:b,value:"YYYYMMDD"}]},{type:b,value:" which I then use a custom script to rename to the format "},{type:a,tag:m,props:{},children:[{type:b,value:z}]},{type:b,value:"."}]},{type:a,tag:d,props:{},children:[{type:b,value:"This is how my directory structure looks like:"}]},{type:a,tag:A,props:{className:["language-undefined"],code:"...\n- 2022\n  - ...\n- 2023\n  - 2023-01-01\n  - 2023-01-03\n  - 2023-01-12\n  ...\n"},children:[{type:a,tag:"pre",props:{},children:[{type:a,tag:A,props:{__ignoreMap:B},children:[{type:a,tag:e,props:{class:g,line:1},children:[{type:a,tag:e,props:{},children:[{type:b,value:"...\n"}]}]},{type:a,tag:e,props:{class:g,line:k},children:[{type:a,tag:e,props:{},children:[{type:b,value:"- 2022\n"}]}]},{type:a,tag:e,props:{class:g,line:h},children:[{type:a,tag:e,props:{},children:[{type:b,value:"  - ...\n"}]}]},{type:a,tag:e,props:{class:g,line:4},children:[{type:a,tag:e,props:{},children:[{type:b,value:"- 2023\n"}]}]},{type:a,tag:e,props:{class:g,line:5},children:[{type:a,tag:e,props:{},children:[{type:b,value:"  - 2023-01-01\n"}]}]},{type:a,tag:e,props:{class:g,line:6},children:[{type:a,tag:e,props:{},children:[{type:b,value:"  - 2023-01-03\n"}]}]},{type:a,tag:e,props:{class:g,line:7},children:[{type:a,tag:e,props:{},children:[{type:b,value:"  - 2023-01-12\n"}]}]},{type:a,tag:e,props:{class:g,line:8},children:[{type:a,tag:e,props:{},children:[{type:b,value:"  ..."}]}]}]}]}]},{type:a,tag:j,props:{id:C},children:[{type:b,value:D}]},{type:a,tag:d,props:{},children:[{type:b,value:"To maintain focus on the important memories, we need to delete the clutter. Intentional photo-taking and intentional photo-deleting also lead to better memory retention and the ability to revisit experiences."}]},{type:a,tag:d,props:{},children:[{type:b,value:"While browsing through the imported pictures and videos using digiKam, I do the following:"}]},{type:a,tag:f,props:{},children:[{type:a,tag:c,props:{},children:[{type:b,value:"Delete pictures that are blurry, out of focus, or have a lot of noise unless they represent a special moment that wasn't captured well by other pictures"}]},{type:a,tag:c,props:{},children:[{type:b,value:"If there are multiple pictures of the same thing, delete the ones that are not the best"}]},{type:a,tag:c,props:{},children:[{type:b,value:"Delete pictures that are too similar to other pictures"}]}]},{type:a,tag:d,props:{},children:[{type:b,value:"To make the process faster and avoid accidentally deleting pictures that I might want to keep, I add a red flag to the pictures that I want to delete. I have configured the shortcut key "},{type:a,tag:m,props:{},children:[{type:b,value:"1"}]},{type:b,value:" to add a red flag to the selected picture."}]},{type:a,tag:o,props:{className:[p]},children:[{type:b,value:i},{type:a,tag:q,props:{src:"\u002Fimages\u002Fdigital-media-2023\u002Fdigikam-red-flags.png",alt:"The list of media with red flags"},children:[]},{type:b,value:i},{type:a,tag:r,props:{},children:[{type:b,value:"digiKam interface for working with flagged media"}]}]},{type:a,tag:d,props:{},children:[{type:b,value:"All these flagged pictures can be seen in the \"Rejected items\" section under \"Labels\" in digiKam, which I then delete in bulk."}]},{type:a,tag:j,props:{id:E},children:[{type:b,value:F}]},{type:a,tag:d,props:{},children:[{type:b,value:"To make it easier to find pictures and videos, I add metadata to them. I use digiKam to add the following metadata to my pictures and videos:"}]},{type:a,tag:f,props:{},children:[{type:a,tag:c,props:{},children:[{type:b,value:"Add labels based on location"},{type:a,tag:f,props:{},children:[{type:a,tag:c,props:{},children:[{type:b,value:"digiKam has a feature called \"Reverse geocoding\" to automatically add labels based on the GPS coordinates of the pictures"}]},{type:a,tag:c,props:{},children:[{type:b,value:"Manually assign labels if there was no GPS coordinates or if the location was not recognized by digiKam"}]}]}]},{type:a,tag:c,props:{},children:[{type:b,value:"Tag people in pictures by using the \"Face Tags\" feature of digiKam"},{type:a,tag:f,props:{},children:[{type:a,tag:c,props:{},children:[{type:b,value:"digiKam automatically recognizes faces in pictures and allows me to tag them. After having a sufficient number of pictures of a person, it can even suggest the name of the person."}]}]}]},{type:a,tag:c,props:{},children:[{type:b,value:"Manually tag events in pictures"}]}]},{type:a,tag:o,props:{className:[p]},children:[{type:b,value:i},{type:a,tag:q,props:{src:"\u002Fimages\u002Fdigital-media-2023\u002Fdigikam.png",alt:"digiKam sidebar"},children:[]},{type:b,value:i},{type:a,tag:r,props:{},children:[{type:b,value:"digiKam sidebar showing its prominent features"}]}]},{type:a,tag:j,props:{id:G},children:[{type:b,value:H}]},{type:a,tag:d,props:{},children:[{type:b,value:"Editing pictures is a crucial aspect of preserving and reliving memories. By fine-tuning and refining the images, we bring out the best qualities and features that make each moment special. Moreover, editing can also help eliminate distractions, adjust lighting, and enhance overall image quality. Ultimately, the process of editing pictures is an art that helps preserve and elevate the beauty of our memories."}]},{type:a,tag:d,props:{},children:[{type:b,value:"digiKam has a powerful editing tool called \"Image Editor\" where I mostly perform the following tasks:"}]},{type:a,tag:f,props:{},children:[{type:a,tag:c,props:{},children:[{type:b,value:"Crop images to improve composition"}]},{type:a,tag:c,props:{},children:[{type:b,value:"Rotate and flip images"}]},{type:a,tag:c,props:{},children:[{type:b,value:"Adjust exposure, contrast, saturation, color balance, and white balance"}]},{type:a,tag:c,props:{},children:[{type:b,value:"Adjust perspective"}]},{type:a,tag:c,props:{},children:[{type:b,value:"Adjust lens distortion"}]}]},{type:a,tag:o,props:{className:[p]},children:[{type:b,value:i},{type:a,tag:q,props:{src:"\u002Fimages\u002Fdigital-media-2023\u002Fdigikam-image-editor-tools.png",alt:I},children:[]},{type:b,value:i},{type:a,tag:r,props:{},children:[{type:b,value:I}]}]},{type:a,tag:d,props:{},children:[{type:b,value:"digiKam also has features to create panoramas and HDR images from multiple pictures, which I make occasional use of."}]},{type:a,tag:j,props:{id:J},children:[{type:b,value:K}]},{type:a,tag:d,props:{},children:[{type:b,value:"Even though I chose local storage as the main destination for my media, I still back them up to the cloud. Hard drives can fail and catastrophes like fire can happen which destroy years of memories. Having an off-site backup is a good way to ensure that the media remain safe."}]},{type:a,tag:d,props:{},children:[{type:b,value:"Any pictures and videos that I take from my cellphone are automatically uploaded to Google Photos once I get connected to WiFi. I selectively upload pictures and videos from my GoPro or drone to conserve cloud storage space, uploading directly to Google Photos from digiKam."}]},{type:a,tag:l,props:{id:"conclusion"},children:[{type:b,value:"Conclusion"}]},{type:a,tag:d,props:{},children:[{type:b,value:"Organizing digital media is crucial for safeguarding our memories and revisiting our experiences. With the right tools, it can be an effortless process that helps us remember and share our precious moments. However, it is important to remember that without the right mindset and discipline, even sophisticated tools are not of much value."}]},{type:a,tag:u,props:{id:L},children:[{type:b,value:M}]},{type:a,tag:d,props:{},children:[{type:b,value:"I am still experimenting with the workflow and tools that I use to manage my digital media. Here are some ideas that I am considering:"}]},{type:a,tag:f,props:{},children:[{type:a,tag:c,props:{},children:[{type:b,value:"Move the media to a NAS(Network Attached Storage)"},{type:a,tag:f,props:{},children:[{type:a,tag:c,props:{},children:[{type:b,value:"using multiple drives with a RAID setup will help prevent data loss in case one or more of the hard drives fail"}]},{type:a,tag:c,props:{},children:[{type:b,value:"the media can be accessed on a local network or even from the internet"}]}]}]},{type:a,tag:c,props:{},children:[{type:b,value:"Automatically correct timestamps on media, usually the ones received via chat apps"}]},{type:a,tag:c,props:{},children:[{type:b,value:"Automatic assignment of GPS coordinates for pictures\u002Fvideos taken minutes apart, in case they don't have GPS metadata."}]},{type:a,tag:c,props:{},children:[{type:b,value:"Add automatic tags for things in pictures, eg. sunsets, lakes, canyons, books"}]}]}],toc:{title:B,searchDepth:k,depth:k,links:[{id:v,depth:k,text:w,children:[{id:x,depth:h,text:y},{id:C,depth:h,text:D},{id:E,depth:h,text:F},{id:G,depth:h,text:H},{id:J,depth:h,text:K}]},{id:L,depth:k,text:M}]}},_type:"markdown",_id:"content:blog:reliving-memories-through-proper-media-organization.md",_source:"content",_file:"blog\u002Freliving-memories-through-proper-media-organization.md",_extension:"md"},"prev-next":[{_path:"\u002Fblog\u002Fhiking-tsho-rolpa-lake-trail-in-nepal",title:"Hiking Tsho-Rolpa lake trail in Nepal"},null]},prerenderedAt:1691350328787}}("element","text","li","p","span","ul","line",3,"\n  ","h3",2,"h1","code-inline",false,"figure","image","img","figcaption","a","nofollow","h2","workflow","Workflow","_1-import","1. Import","YYYY-MM-DD","code","","_2-culling","2. Culling","_3-organization","3. Organization","_4-editing-and-enhancing","4. Editing and enhancing","Image editing tools in digiKam","_5-cloud-backup","5. Cloud Backup","future-work","Future work"))