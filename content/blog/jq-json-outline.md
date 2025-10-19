---
title: "Quickly Outline Large JSON Responses with a Custom jq Function"
description: "Use jq to automatically map and visualize the structure of large JSON responses, perfect for exploring undocumented endpoints."
image: /images/jq-json-structure.png
alt: "Abstract image representing the essence of json structure"
postDate: 2025-10-19
tags:
  - jq
  - json
  - command line
  - automation
  - developer productivity
---


I was recently digging into Immich’s API to see if it provides the fields I needed to get some specific information about my photos. Immich is my self-hosted photo-management service. The API response returned hundreds of lines of JSON data. I just wanted to see its structure to verify the fields I needed, but scrolling through so much data felt time-consuming. So I did what any sane programmer would do. I spent even more time trying to figure out how I could do it in an automated way.

I’ve used [jq](https://jqlang.org/) before for quick JSON tweaks (it’s basically `sed` or `awk` for JSON), so I wondered if it could help here. A bit of searching showed that jq can collapse arrays to a single-item preview and then recurse through the entire document, giving you a clean outline of the JSON’s shape in one pass.

I later found out that the response structures are already specified in the Immich API documentation. So I could have just looked that up and saved myself all the hassle. But hey, it could well have been an API endpoint without any documentation and the method that I came up with is general enough to be used in any API JSON response.

## The jq function

Here’s the jq function I came up with which can be run in a terminal:

```bash
jq '
def shape:
  if type == "array" then
    if length > 0 then [ (.[0] | shape) ] else [] end
  elif type == "object" then
    with_entries(.value |= shape)
  else
    type
  end;
shape
' response.json
  ```

It checks the type of each value: if it's an array, keep just the first item and recurse. If it's an object, walk through each key and recurse into the value. If it's a primitive like a string or number, just return the type name.
## Actual Immich API Shape

Here's a simplified output of the jq function applied to the Immich API response:

```json
{
  "albums": {
    "count": "number",
    ...
  },
  "assets": {
    "count": "number",
    "facets": [],
    "items": [
      {
        ...
        "duration": "string",
        "exifInfo": {
          "city": "string",
          "country": "string",
          ...
        },
        "fileCreatedAt": "string",
        "fileModifiedAt": "string",
        "hasMetadata": "boolean",
        ...
      }
    ],
    "nextPage": "string",
    "total": "number"
  }
}
```

Now I instantly see that `assets.items[i].exifInfo.country` is a string—exactly what I needed to know to map photos by country.

## Extending It for Sample Values

Next, I wondered: what if I wanted real examples, not just types? I modified the primitive case to return the value itself:

```bash
jq '
def shape_with_samples:
  if type == "array" then
    if length > 0 then [ (.[0] | shape_with_samples) ] else [] end
  elif type == "object" then
    with_entries(.value |= shape_with_samples)
  else
    .
  end;
shape_with_samples
' response.json
```

Now I get sample data like:

```json
{
  "albums": {
    "count": 10,
    ...
  },
  "assets": {
    "count": 25,
    "facets": [],
    "items": [
      {
        ...
        "duration": "00:00:05",
        "exifInfo": {
          "city": "Zurich",
          "country": "Switzerland"
        },
        "fileCreatedAt": "2025-09-01T10:00:00Z",
        "fileModifiedAt": "2025-09-01T10:05:00Z",
        "hasMetadata": true,
        ...
      }
    ],
    "nextPage": "2",
    "total": 25
  }
}
```

Seeing `"Switzerland"` immediately confirmed I was pulling the right field.

## Sampling Multiple Items

When the first asset lacked certain optional tags, I extended the function to sample the first N items:

```bash
jq '
def shape_with_samples(n):
  if type == "array" then
    if length > 0 then
      [ .[:n][] | shape_with_samples(n) ]
    else [] end
  elif type == "object" then
    with_entries(.value |= shape_with_samples(n))
  else
    .
  end;
shape_with_samples(3)
' response.json
```

## Making it reusable

I will definitely not remember these functions in a month, so I saved them as reusable scripts:

```bash
~/.jq/shape.jq
~/.jq/shape_samples.jq
```

Now I can run them anytime via:

```bash
jq -f ~/.jq/shape.jq response.json
jq -f ~/.jq/shape_with_samples.jq response.json
```

## Conclusion

It’s a tiny trick, but it makes understanding large JSON responses so much easier. Whenever you are working with any undocumented APIs, jq gives you a fast, lightweight way to map its structure without guesswork.
