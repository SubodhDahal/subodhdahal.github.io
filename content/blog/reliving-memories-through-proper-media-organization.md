---
title: "Re-living memories through proper media organization"
description: Organizing media such as photos and videos can bring back cherished memories and help relive them. Here's my approach to organizing my digital media collection.
image: /images/digital-media-2023/image-collection.png
alt: Managing my unwieldy pictures collection
postDate: 2023-02-06
tags:
  - personal
  - technology
---

# Capturing Life's Moments

We make priceless memories as life progresses &ndash; memories we want to keep forever. They can be minor, everyday occurrences or significant, life-altering occasions that serve as a reminder of who we were, what we've been through, and what we've learned. They are really valuable and can make us feel sad, happy, or nostalgic.

Unfortunately, our memory is fallible and we can only remember so much. Despite our innate limitations, we have continually sought to immortalize moments of significance. From cave paintings to digital photos and videos, we have come a long way.

Photos and videos help us not just to remember the events, but the associated emotions and feelings as well. They also allow us to show others the experiences we've had and the memories we hold dear, creating a shared history and a sense of connection with those around us.

# Why organize digital media?

With ubiquitous camera technology, capturing memories is easier, but revisiting them can be a challenge. A disorganized and huge photo and video collection can leave us with a sense of dread. Proper organization of digital media serves as a safeguard for our precious memories, ensuring that they remain a constant source of comfort and inspiration.

Like many people of our generation, I have amassed a large personal collection of photos and videos. I had to find a solution that enabled me to effortlessly navigate through the vast collection of my cherished moments.

# Considerations for a solution

Here are a few of the considerations that were important to me in choosing a solution:

- I wanted my digital media stored on a local device, not in a cloud that could restrict my access.
- The software had to be open-source and have enough features to handle my media organization needs.
- The metadata I added to my media needed to be in an open format for easy manipulation.

After some research, I came across [digiKam](https://www.digikam.org/) which matched all my requirements. digiKam is a feature-rich free and open-source software to manage your digital media collection. It is available for Linux, Windows, and macOS.

## Workflow

After investing a lot of time trying to figure out what works for me, the workflow that I have settled on is as follows:

1. Import
2. Culling
3. Organization
4. Editing and enhancing
5. Cloud Backup

I go to steps 1 to 5, mostly in a sequence when importing new media. Occasionally, I look back at my digiKam collections and perform the steps from 2 to 5.

### 1. Import

I have three major sources of my pictures and videos: my cellphone, a GoPro action camera, and a DJI Mini 3 Pro drone. Their media is imported and saved to an external SSD.

I use a card reader to import the media from the GoPro and the DJI drone using digiKam.

For photos and videos that I take with my Android cellphone, I use an open-source program called [Rapid Photo Downloader](https://damonlynch.net/rapid/index.html) to download them to a directory on my computer using File Transfer mode. I use Rapid Photo Downloader due to digiKam's failure to import media from my cellphone.

The imported media is automatically organized by date in the format `YYYY-MM-DD` by digiKam. Rapid Photo Downloader imports it in the format `YYYYMMDD` which I then use a custom script to rename to the format `YYYY-MM-DD`.

This is how my directory structure looks like:
```
...
- 2022
  - ...
- 2023
  - 2023-01-01
  - 2023-01-03
  - 2023-01-12
  ...
```

### 2. Culling

To maintain focus on the important memories, we need to delete the clutter. Intentional photo-taking and intentional photo-deleting also lead to better memory retention and the ability to revisit experiences.

While browsing through the imported pictures and videos using digiKam, I do the following:
- Delete pictures that are blurry, out of focus, or have a lot of noise unless they represent a special moment that wasn't captured well by other pictures
- If there are multiple pictures of the same thing, delete the ones that are not the best
- Delete pictures that are too similar to other pictures

To make the process faster and avoid accidentally deleting pictures that I might want to keep, I add a red flag to the pictures that I want to delete. I have configured the shortcut key `1` to add a red flag to the selected picture.

<figure class="image">
  <img src="/images/digital-media-2023/digikam-red-flags.png" alt="The list of media with red flags"/>
  <figcaption>digiKam interface for working with flagged media</figcaption>
</figure>

All these flagged pictures can be seen in the "Rejected items" section under "Labels" in digiKam, which I then delete in bulk.

### 3. Organization

To make it easier to find pictures and videos, I add metadata to them. I use digiKam to add the following metadata to my pictures and videos:
- Add labels based on location
  - digiKam has a feature called "Reverse geocoding" to automatically add labels based on the GPS coordinates of the pictures
  - Manually assign labels if there was no GPS coordinates or if the location was not recognized by digiKam
- Tag people in pictures by using the "Face Tags" feature of digiKam
  - digiKam automatically recognizes faces in pictures and allows me to tag them. After having a sufficient number of pictures of a person, it can even suggest the name of the person.
- Manually tag events in pictures

<figure class="image">
  <img src="/images/digital-media-2023/digikam.png" alt="digiKam sidebar"/>
  <figcaption>digiKam sidebar showing its prominent features</figcaption>
</figure>

### 4. Editing and enhancing

Editing pictures is a crucial aspect of preserving and reliving memories. By fine-tuning and refining the images, we bring out the best qualities and features that make each moment special. Moreover, editing can also help eliminate distractions, adjust lighting, and enhance overall image quality. Ultimately, the process of editing pictures is an art that helps preserve and elevate the beauty of our memories.

digiKam has a powerful editing tool called "Image Editor" where I mostly perform the following tasks:
- Crop images to improve composition
- Rotate and flip images
- Adjust exposure, contrast, saturation, color balance, and white balance
- Adjust perspective
- Adjust lens distortion

<figure class="image">
  <img src="/images/digital-media-2023/digikam-image-editor-tools.png" alt="Image editing tools in digiKam"/>
  <figcaption>Image editing tools in digiKam</figcaption>
</figure>

digiKam also has features to create panoramas and HDR images from multiple pictures, which I make occasional use of.

### 5. Cloud Backup

Even though I chose local storage as the main destination for my media, I still back them up to the cloud. Hard drives can fail and catastrophes like fire can happen which destroy years of memories. Having an off-site backup is a good way to ensure that the media remain safe.

Any pictures and videos that I take from my cellphone are automatically uploaded to Google Photos once I get connected to WiFi. I selectively upload pictures and videos from my GoPro or drone to conserve cloud storage space, uploading directly to Google Photos from digiKam.

<!-- write a conclusion -->
# Conclusion

Organizing digital media is crucial for safeguarding our memories and revisiting our experiences. With the right tools, it can be an effortless process that helps us remember and share our precious moments. However, it is important to remember that without the right mindset and discipline, even sophisticated tools are not of much value.

## Future work

I am still experimenting with the workflow and tools that I use to manage my digital media. Here are some ideas that I am considering:

- Move the media to a NAS(Network Attached Storage)
  - using multiple drives with a RAID setup will help prevent data loss in case one or more of the hard drives fail
  - the media can be accessed on a local network or even from the internet
- Automatically correct timestamps on media, usually the ones received via chat apps
- Automatic assignment of GPS coordinates for pictures/videos taken minutes apart, in case they don't have GPS metadata.
- Add automatic tags for things in pictures, eg. sunsets, lakes, canyons, books
