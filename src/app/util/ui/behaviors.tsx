const CommonUI = [
    {
        category: "error",
        parameters: [
            "submit error",
            "form field error",
            "input error"
        ]
    },
    {
        category: "success",
        parameters: [
            "submit success",
            "form field success",
            "input success"
        ]
    },
    {
        category: "tooltip",
        parameters: [
            "tooltip",
            "tooltip text",
            "tooltip icon",
        ]
    },
    {
        category: "modal",
        parameters: [
            "open",
            "on open",
            "close",
            "on close",
        ]
    },
    {
        category: "pagination",
        parameters: [
            "visible",
            "on page change",
            "page change",
            "max results",
            "no results",
            "results per page",
            "max page numbers",
        ]
    },
    {
        category: "scrolling",
        parameters: [
            "infinite scroll",
            "scrolling",
            "on scroll",
            "on scroll down",
            "on scroll up",
            "on scroll bottom",
            "on scroll top",
            "scroll top",
            "scroll bottom",
            "scroll down",
            "scroll up",
            "scroll to",
            "scroll to top",
            "scroll to bottom",
            "scroll to id",
            "scroll to element",
        ],
    },
    {
        category: "spinner",
        parameter: [
            "start spinner",
            "stop spinner",
            "spinner",
        ]
    },
    {
        category: "progress",
        parameter: [
            "start progress",
            "stop progress",
            "progress message title",
            "progress message description",
            "progress message icon",
            "progress message image",
        ]
    },
    {
        category: "search",
        parameters: [
            "autocomplete",
            "on search",
            "on search change",
            "filter results",
            "suggestions",
            "search complete",
            "search loading",
            "search cancel"
        ]
    },
    {
        category: "table",
        parameters: [
            "sort ascending",
            "sort descending",
            "filter by",
        ]
    },
    {
        category: "share",
        parameters: [
            "share link",
        ]
    },
    {
        category: "notification",
        parameters: [
            "on event",
            "notification title",
            "notification description",
            "notification icon",
        ]
    },
    {
        category: "avatar",
        parameters: [
            "default value",
            "null value"
        ]
    }
]

const commonActions = [
    {
        category: "validate",
        parameters:
            [
                "validate form",
                "validate field",
                "validate input",
            ]
    },
    {
        category: "file",
        parameters: [
            "upload file",
            "download file",
            "acceptable file types",
            "min file size",
            "max file size",
        ],
    
    },
    {

    }
]

const EventHandlers = [
    "onClick",
    "onDoubleClick",
    "onChange",
    "onSubmit",
    "onKeyDown",
    "onKeyUp",
    "onKeyPress",
    "onMouseEnter",
    "onMouseLeave",
    "onMouseOver",
    "onMouseOut",
    "onFocus",
    "onBlur",
    "onLoad",
    "onError",
    "onScroll",
    "onResize",
    "onContextMenu",
    "onTouchStart",
    "onTouchMove",
    "onTouchEnd",
    "onDragStart",
    "onDragOver",
    "onDrop"
]

const HTMLElements = [
    {
        category: "text",
        variations: [`<input type="text">`, `<textarea>`],
        parameters: ["type", "name", "value", "placeholder", "disabled", "readonly", "required", "minlength", "maxlength", "pattern", "size", "autocomplete", "autofocus", "list", "min", "max", "step"]
    },
    {
        category: "button",
        variations: [`<button>`, `<input type="button">`, `<input type="submit">`],
        parameters: ["type", "name", "value", "disabled", "autofocus", "form", "formaction", "formenctype", "formmethod", "formnovalidate", "formtarget"]
    },
    {
        category: "checkbox",
        variations: [`<input type="checkbox">`],
        parameters: ["type", "name", "value", "disabled", "readonly", "required", "autofocus", "checked", "indeterminate"]
    },
    {
        category: "radio",
        variations: [`<input type="radio">`],
        parameters: ["type", "name", "value", "disabled", "readonly", "required", "autofocus", "checked"],
    },
    {
        category: "select",
        variations: [`<select>`],
        parameters: ["name", "disabled", "required", "autofocus", "size", "multiple"]
    },
    {
        category: "link",
        variations: [`<a>`],
        parameters: ["href", "target", "download", "rel", "hreflang", "type"]
    },
    {
        category: "div",
        variations: [`<div>`],
        parameters: ["id"]
    },
    {
        category: "span",
        variations: [`<span>`],
        parameters: ["id"]
    },
    {
        category: "heading",
        variations: [`<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>`],
        parameters: [],
    },
    {
        category: "image",
        variations: [`<img>`],
        parameters: ["src", "alt", "width", "height", "usemap", "ismap", "longdesc", "sizes", "srcset", "crossorigin", "referrerpolicy", "decoding", "loading"],
    },
    {
        category: "form",
        variations: [`<form>`],
        parameters: ["name", "action", "method", "target", "enctype", "accept-charset", "autocomplete", "novalidate", "autofocus", "rel"],
    },
    {
        category: "audio",
        variations: [`<audio>`],
        parameters: ["src", "autoplay", "controls", "loop", "muted", "preload", "volume", "crossorigin", "mediagroup"],
    },
    {
        category: "video",
        variations: [`<video>`],
        parameters: ["src", "autoplay", "controls", "loop", "muted", "preload", "poster", "width", "height", "crossorigin", "mediagroup"],
    },
    {
        category: "iframe",
        variations: [`<iframe>`],
        parameters: ["src", "name", "sandbox", "allow", "allowfullscreen", "allowpaymentrequest", "width", "height", "referrerpolicy", "loading"],
    },
    {
        category: "embed",
        variations: [`<embed>`],
        parameters: ["src", "type", "width", "height"],
    }
]