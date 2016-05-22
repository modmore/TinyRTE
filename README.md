# TinyRTE

TinyRTE is a simplistic editor. It is loosely based on [Yellow Text](https://github.com/stefanvermaas/yellow-text) by Stefan Vermaas, and was developed to offer basic text control (i.e. bold, italics, links) in [ContentBlocks](http://modmo.re/cb).
 
TinyRTE only allows a single line of text by design. 

## Usage (standalone)

First download JavaScript and CSS files form the repository. Minified files are included in the dist/ folder, unminified are in src/. 

Add these to your page, make sure jQuery is loaded first. 

```javascript
<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script> <!-- include jquery -->
<script type="text/javascript" src="tinyrte/dist/tinyrte.min.js"></script> <!-- include the texteditor script -->
```
Then initialise the editor with a call to the TinyRTE plugin as such. 

```javascript
$("#js-your-html-element").TinyRTE();
```

TinyRTE will attempt to mimic the existing text field, additional styling can be done with CSS.

## Usage (in ContentBlocks)

Call `ContentBlocks.addTinyRte(field)` where `field` is a jquery object that needs to get the tiny editor. This will also initialise the linking feature in ContentBlocks.


## Options

TBA

## License

MIT
