---
title: "Quickly outline large JSON responses with a custom jq function"
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


I was recently digging into Immich’s API to see if it exposes the fields I needed for some details about my photos. Immich is my self-hosted photo-management service. The API returned hundreds of lines of JSON. I just wanted to see its structure to check the fields I needed, but scrolling through all that data felt slow. I did what any sane programmer would do: I spent even more time trying to automate it.

I’ve used [jq](https://jqlang.org/) before for quick JSON tweaks (it’s basically `sed` or `awk` for JSON), so I wondered if it could help here. A quick search showed that jq can collapse arrays to a single-item preview, then recurse through the whole document for a clean outline of the JSON’s shape in one pass.

I later found out the response structures are already listed in the Immich API docs. I could have just looked that up and saved myself the hassle. But hey, it could well have been an endpoint with no docs, and my method works for any JSON API response.

## The jq function

Here’s the jq function I came up with. You can run it in a terminal:

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

The function checks each value. If it's an array, keep just the first item and recurse. If it's an object, walk through each key and recurse into the value. If it's a primitive like a string or number, return just the type name.
## Actual Immich API shape

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

Now I instantly see that `assets.items[i].exifInfo.country` is a string. That's exactly what I needed to know to map photos by country.

## Extending it for sample values

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

## Sampling the first few items

When the first asset lacked optional tags, I extended the function to sample the first N items:

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
~/.jq/shape_with_samples.jq
```

Now I can run them anytime via:

```bash
jq -f ~/.jq/shape.jq response.json
jq -f ~/.jq/shape_with_samples.jq response.json
```

## Conclusion

It’s a simple trick, but it makes large JSON responses much easier to read. When you hit an undocumented API, jq maps its structure fast and without guesswork.
