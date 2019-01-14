## Description
Get your website’s usage of cookies compliant with the European GDPR mandatory rules. 
Non-compliant organizations can risk fines up to 4% of the organization’s global yearly sales. 

This tool will help you to easily implement cookies bar and allow you to rapidly customize its features. 

See the examples bellow:

[Developer example](http://development.plan4privacy.com/cookie-consent) | [Production example](https://plan4privacy.eu)

&nbsp; 

## Including the library

##### CSS (include in the head):
    <link rel="stylesheet" href="path-to-library/dist/cookie.min.css" /> 

##### Javascript (include at the end of the body):
    <script src="path-to-library/dist/cookie.min.js"></script>

&nbsp;

## How to use

##### Insert the following code after adding the js library at the end of the body just like below: 

```js
var cookie_data = {
    lang: "en",
    logo_url: "https://plan4privacy.eu/site/site/img/logo.svg"
};

initializeCookies(cookie_data);
```

&nbsp;

In the example above there are two options:

| Option  | Type | Default | Description |
| ------------- | ------------- | ------------- | ------------- |
| lang  | string  | en | Defines the language in which you want to display the text. |
| logo_url | string  | null | This is the path to the logo of the company. It must be absolute. |

&nbsp;

The list of available languages is the following :
- en (English);
- es (Spanish);
- pt (Portuguese);

&nbsp;

You'll not need more than this to initialize, but if you're not satisfied with the styles there are options that you can use to change them to.

&nbsp;

## Styles

##### Before showing every option of the styles, here is a full example of the code : 

```js
var cookie_data = {
	lang: "en",
	logo_url: "https://plan4privacy.eu/site/site/img/logo.svg",
	styles: {
		stickyFooter: {
			bgColor: "#d0d1d0",
			textColor: "#000000",
			definitionsButton: {
				textColor: "#007e9c",
				borderColor: "transparent",
				hoverTextColor: "#007e9c",
				hoverBorderColor: "#007e9c"
			},
			acceptButton: {
				bgColor: "#007e9c",
				bgHoverColor: "transparent",
				borderColor: "#007e9c",
				hoverBorderColor: "#007e9c",
				textColor: "white",
				hoverTextColor: "#007e9c"
			}
		},
		modal: {
			closeButtonColor: "#000",
			header: {
				bgColor: "#ffffff",
				bottomBorderColor: "#d0d1d0"
			},
			middle: {
				bgColor: "#ffffff",
				navBar: {
					linkTextColor: "#6d6d6d",
					linkBorderColor: "transparent",
					linkActiveTextColor: "#000000",
					linkActiveBorderColor: "#007e9c"
				},
				details: {
					titleColor: "#000000",
					textColor: "#000000",
					checkSymbolColor: "#bc5592"
				}
			},
			footer: {
				bgColor: "#fff",
				provider: {
					textColor: "#000000",
					linkColor: "#007e9c",
					hoverLinkColor: "#007e9c",
					linkBorderColor: "transparent",
					hoverLinkBorderColor: "#007e9c"
				},
				acceptButton: {
					bgColor: "#007e9c",
					bgHoverColor: "transparent",
					borderColor: "#007e9c",
					hoverBorderColor: "#007e9c",
					textColor: "#fff",
					hoverTextColor: "#007e9c"
				}
			}
		}
	}
};

initializeCookies(cookie_data);
```
&nbsp;
##### As you can see the styles are divided in various sections, lets get through them one by one:
&nbsp;
##### stickyFooter
| Option  | Type | Default | Description |
| ------------- | ------------- | ------------- | ------------- |
| bgColor | string | null | Defines the background of the footer |
| textColor | string | null | Defines the color of the text which is at the left side of the stickyFooter |


##### stickyFooter.definitionsButton
| Option  | Type | Default | Description |
| ------------- | ------------- | ------------- | ------------- |
| textColor | string | null | Initial color of the definitions button |
| borderColor | string | null | Initial color of the border of the the definitions button |
| hoverTextColor | string | null | Color of the definitions button when it's hovered |
| hoverBorderColor | string | null | Color of the border of the definitions buttons when it's hovered |

##### stickyFooter.acceptButton
| Option  | Type | Default | Description |
| ------------- | ------------- | ------------- | ------------- |
| bgColor | string | null | Initial background color of the accept button |
| bgHoverColor | string | null | Background color when the accept button is hovered |
| borderColor | string | null | Initial border color of the accept button |
| hoverBorderColor | string | null | Border color when the accept button is hovered |
| textColor | string | null | Initial text color of the accept button |
| hoverTextColor | string | null | Text color of the accept button |

##### modal
| Option  | Type | Default | Description |
| ------------- | ------------- | ------------- | ------------- |
| closeButtonColor | string | null | Color of the close button "X" in the top right corner of the modal |

##### modal.header
| Option  | Type | Default | Description |
| ------------- | ------------- | ------------- | ------------- |
| bgColor | string | null | Initial background color of the header |
| bottomBorderColor | string | null | Inital bottom border color of the header |

##### modal.middle
| Option  | Type | Default | Description |
| ------------- | ------------- | ------------- | ------------- |
| bgColor | string | null | Initial background color of the middle |

##### modal.middle.navBar
| Option  | Type | Default | Description |
| ------------- | ------------- | ------------- | ------------- |
| linkTextColor  | string | null | Initial text color of the links of the nav bar |
| linkBorderColor | string | null | Initial bottom border color of the links of the nav bar |
| linkActiveTextColor | string | null | Text color of the links of the nav bar when it's active |
| linkActiveBorderColor | string | null | Botttom border color of the links of the nav bar when it's active |

##### modal.middle.details
| Option  | Type | Default | Description |
| ------------- | ------------- | ------------- | ------------- |
| titleColor | string | null | Initial color of the titles in the left side of the middle content |
| textColor | string | null | Initial color of the text on the left side of the middle content |
| checkSymbolColor | string | null | Initial color of the check symbol on the left side of the middle content |

##### modal.footer
| Option  | Type | Default | Description |
| ------------- | ------------- | ------------- | ------------- |
| bgColor | string | null | Initial background color of the footer |

##### modal.footer.provider
| Option  | Type | Default | Description |
| ------------- | ------------- | ------------- | ------------- |
| textColor  | string | null | Initial provider text color |
| linkColor | string | null | Initial provider link color |
| hoverLinkColor | string | null | Provider link color when it's hovered |
| linkBorderColor | string | null | Initial provider link border color |
| hoverLinkBorderColor | string | null | Provider link border color when it's hovered |

##### modal.footer.acceptButton
| Option  | Type | Default | Description |
| ------------- | ------------- | ------------- | ------------- |
| bgColor  | string | null | Initial modal accept button background color |
| bgHoverColor | string | null | Modal accept button background color when it's hovered |
| borderColor | string | null | Initial modal accept button border color |
| hoverBorderColor | string | null | Modal accept button border color when it's hovered |
| textColor | string | null | Initial modal accept button text color |
| hoverTextColor | string | null | Modal accept button text color when it´s hovered |