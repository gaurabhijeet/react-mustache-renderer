# React Mustache Renderer

## Intent
1. Render **user created Mustache templates** inside **r4e-fe React** based system.
2. For certain html tags in template, we need to render our component for user to select from uploaded assets. For example: In content block if the template has a container to show video, we need to open a React modal component which would allow user to specify which video to show based on assets he has uploaded in r4e.

## Technologies used

1. **Mustache (4.2.0-beta.0) :** To generate HTML from user created template

2. **html-react-parser (1.4.5) :** The generated HTML from mustache template is passed to this parser to detect dom elements and perform components replace/addition

3. **React portal :** To render React component in iframe

## Project files
1. **MustacheRenderer.tsx :** Component to which Mustache template would be passed to render in React. For POC purpose, the template is currently hard-coded which can be changed to be fetched from external source in `Constants.tsx`

2. **data.json :** Sample JSON of profile data after tranformation. Can be replaced to be fetched from external source.


## Why is `iframe` used instead of `div` to render Mustache template

Code ref: https://github.com/gaurabhijeet/react-mustache-renderer/blob/32bc96c0257bd6747be4bb9ebb0acc5bfe86b87a/src/MustacheRender.tsx#L64

The test template used has a `popup` which is fixed in bottom-left corner of screen. For cases like this when tried rendering the component using `div` or similar elements, the `popup` is getting rendered based on position of browser tab not the div containg the template. 

There can be more such cases where user template css and r4e-fe css interfere with each other, hence used `iframe` to seperate the concern out. 

## Points of concern

1. Selecting dom elements from dom tree. generated using `html-react-parser` using `Mustache.render` html. Code ref: https://github.com/gaurabhijeet/react-mustache-renderer/blob/32bc96c0257bd6747be4bb9ebb0acc5bfe86b87a/src/MustacheRender.tsx#L36