// Initial vars
var _available_languages = ["pt", "en", "es"];
var cookie_bar_holder_opacity = 1;
var cookie_modal_overlay_opacity = 0;
var cookie_modal_transform_scale = 0;
var _cookie_data;
var _translations;

var path =  ccGetFilePath();


// Functions
function initializeCookies(cookie_data){
	window.addEventListener("load", function(event) {
		var lang = _available_languages.indexOf(cookie_data.lang) == "-1" ? "en" : cookie_data.lang;

		var xobj = new XMLHttpRequest();
		xobj.overrideMimeType("application/json");
		xobj.open('GET', path + "/../../translations/" + lang + ".json", true); 
		xobj.onreadystatechange = function () {
			if (xobj.readyState == 4 && xobj.status == "200") {
				_translations = JSON.parse(xobj.responseText);

				_cookie_data = cookie_data;

				var style = "";
				var cookie_styles = cookie_data.styles;

				if(cookie_styles !== null && cookie_styles !== undefined){
					var stickyFooter = cookie_styles.stickyFooter;

					if(stickyFooter !== null && stickyFooter !== undefined){
						// Sticky footer general
						if(stickyFooter.bgColor !== undefined && stickyFooter.bgColor !== null && stickyFooter.bgColor.length > 0){
							style += ".cookies-bar-holder{ background-color: " + stickyFooter.bgColor + "!important; }";
						}

						if(stickyFooter.textColor !== undefined && stickyFooter.textColor !== null && stickyFooter.textColor.length > 0){
							style += ".cookies-bar-message p{ color: " + stickyFooter.textColor + "!important; }";
						}

						



						// Sticky footer definitions button
						var definitionsButton = stickyFooter.definitionsButton;
						if(definitionsButton.textColor !== undefined && definitionsButton.textColor !== null && definitionsButton.textColor.length > 0){
							style += ".cookies-bar-holder-definitions-button{ color: " + definitionsButton.textColor + "!important; }";
						}

						if(definitionsButton.borderColor !== undefined && definitionsButton.borderColor !== null && definitionsButton.borderColor.length > 0){
							style += ".cookies-bar-holder-definitions-button{ border-color: " + definitionsButton.borderColor + "!important; }";
						}

						if(definitionsButton.hoverTextColor !== undefined && definitionsButton.hoverTextColor !== null && definitionsButton.hoverTextColor.length > 0){
							style += ".cookies-bar-holder-definitions-button:hover{ color: " + definitionsButton.hoverTextColor + "!important; }";
						}

						if(definitionsButton.hoverBorderColor !== undefined && definitionsButton.hoverBorderColor !== null && definitionsButton.hoverBorderColor.length > 0){
							style += ".cookies-bar-holder-definitions-button:hover{ border-color: " + definitionsButton.hoverBorderColor + "!important; }";
						}



						// Sticky footer accept button
						var acceptButton = stickyFooter.acceptButton;

						if(acceptButton.bgColor !== undefined && acceptButton.bgColor !== null && acceptButton.bgColor.length > 0){
							style += ".cookies-bar-holder-accept-button{ background-color: " + acceptButton.bgColor + "!important; }";
						}

						if(acceptButton.bgHoverColor !== undefined && acceptButton.bgHoverColor !== null && acceptButton.bgHoverColor.length > 0){
							style += ".cookies-bar-holder-accept-button:hover{ background-color: " + acceptButton.bgHoverColor + "!important; }";
						}

						if(acceptButton.borderColor !== undefined && acceptButton.borderColor !== null && acceptButton.borderColor.length > 0){
							style += ".cookies-bar-holder-accept-button{ border-color: " + acceptButton.borderColor + "!important; }";
						}

						if(acceptButton.hoverBorderColor !== undefined && acceptButton.hoverBorderColor !== null && acceptButton.hoverBorderColor.length > 0){
							style += ".cookies-bar-holder-accept-button:hover{ border-color: " + acceptButton.hoverBorderColor + "!important; }";
						}

						if(acceptButton.textColor !== undefined && acceptButton.textColor !== null && acceptButton.textColor.length > 0){
							style += ".cookies-bar-holder-accept-button{ color: " + acceptButton.textColor + "!important; }";
						}

						if(acceptButton.hoverTextColor !== undefined && acceptButton.hoverTextColor !== null && acceptButton.hoverTextColor.length > 0){
							style += ".cookies-bar-holder-accept-button:hover{ color: " + acceptButton.hoverTextColor + "!important; }";
						}
					}
				}


				// Appending styles
				var head = document.head || document.getElementsByTagName('head')[0], styles = document.createElement('style');
				styles.type = 'text/css';
				if (styles.styleSheet){
				  	// This is required for IE8 and below.
				  	styles.styleSheet.cssText = style;
				} else {
				  	styles.appendChild(document.createTextNode(style));
				}
				head.appendChild(styles);


				var cookie_consent = ccGetCookie("cookie-consent");
				// Start cookies if didn't consent
				if(cookie_consent.length == 0){
					// cookies-bar-holder
					var cookies_bar_holder = document.createElement("div");
					cookies_bar_holder.classList.add("cookies-bar-holder");


					// cookies-bar-message
					var cookies_bar_message = document.createElement("div");
					cookies_bar_message.classList.add("cookies-bar-message");

					var p = document.createElement("p");
					p.textContent = _translations.cookie_sticky_footer.text_1;

					cookies_bar_message.appendChild(p);


					// Append cookies_bar_message to cookies_bar_holder
					cookies_bar_holder.appendChild(cookies_bar_message);


					// cookies-actions
					var cookies_actions = document.createElement("div");
					cookies_actions.classList.add("cookies-actions")

					var a = document.createElement("a");
					a.setAttribute("href", "javascript:");
					a.classList.add("cookies-button", "cookies-button-blue", "cookies-bar-holder-definitions-button");
					a.setAttribute("onclick", "openCookiesModal()");

					var div = document.createElement("div");
					div.classList.add("icon-settings");

					var p = document.createElement("p");
					p.textContent =  _translations.cookie_sticky_footer.text_2;

					a.appendChild(p);

					cookies_actions.appendChild(a);


					var a = document.createElement("a");
					a.setAttribute("href", "javascript:");
					a.classList.add("cookies-bar-holder-accept-button", "cookies-button", "cookies-button-blue-all");

					var p = document.createElement("p");
					p.textContent = _translations.cookie_sticky_footer.text_3;

					a.appendChild(p);

					cookies_actions.appendChild(a);


					// Append cookies_actions to cookies_bar_holder
					cookies_bar_holder.appendChild(cookies_actions);




					document.body.appendChild(cookies_bar_holder);
				}
			}
		};
		xobj.send(null);
	}); 
}

function acceptAllCookies(el){
	ccSetCookie("cookie-consent", 1, 365)

	var cookie_bar_holder_el = document.getElementsByClassName('cookies-bar-holder')[0];

	var interval = setInterval(function(){
		if(cookie_bar_holder_opacity > 0){
			cookie_bar_holder_opacity -= 0.1;

			cookie_bar_holder_el.style.opacity = cookie_bar_holder_opacity;
		}else{
			cookie_bar_holder_opacity = 1;
			clearInterval(interval);
		}
	}, 50);
	

	closeCookieModal();
	return false;
}

function openCookiesModal(options){

	if(document.getElementsByClassName("cookie-modal-overlay").length == 0){
		// Create cookie-modal-overlay
		var cookie_modal_overlay = document.createElement("div");
		cookie_modal_overlay.classList.add("cookie-modal-overlay");


		// Create cookie-modal
		var cookie_modal = document.createElement("div");
		cookie_modal.classList.add("cookie-modal");


		// Create cookie-modal-inner
		var cookie_modal_inner = document.createElement("div");
		cookie_modal_inner.classList.add("cookie-modal-inner");


		// Create cookie-modal-header
		var cookie_modal_header = document.createElement("div");
		cookie_modal_header.classList.add("cookie-modal-header");


		// Create cookie-modal-header.cookie-modal-logo
		var cookie_modal_logo = document.createElement("div");
		cookie_modal_logo.classList.add("cookie-modal-logo");

		var img = document.createElement("img");
		img.setAttribute("src", _cookie_data.logo_url);
		cookie_modal_logo.appendChild(img);

		cookie_modal_header.appendChild(cookie_modal_logo);

		cookie_modal_inner.appendChild(cookie_modal_header);


		// Create cookie-modal-header.cookie-modal-close
		var cookie_modal_close = document.createElement("a");
		cookie_modal_close.classList.add("cookie-modal-close");
		cookie_modal_close.setAttribute("href", "javascript:");
		cookie_modal_close.setAttribute("onclick", "closeCookieModal()");

		var icon_close = document.createElement("span");
		icon_close.classList.add("icon-close");
		cookie_modal_close.appendChild(icon_close);

		cookie_modal_header.appendChild(cookie_modal_close);


		// Create cookie-modal-content
		var cookie_modal_content = document.createElement("div");
		cookie_modal_content.classList.add("cookie-modal-content");

		// Create first cookie-modal-content.cookie-modal-content-col
		var cookie_modal_content_col = document.createElement("div");
		cookie_modal_content_col.classList.add("cookie-modal-content-col");

		var a = document.createElement("a");
		a.setAttribute("href", "javascript:");
		a.classList.add("active", "cookie-modal-content-section-link");
		a.textContent = _translations.cookie_modal.text_1;
		cookie_modal_content_col.appendChild(a);

		var a = document.createElement("a");
		a.setAttribute("href", "javascript:");
		a.classList.add("cookie-modal-content-section-link");
		a.textContent = _translations.cookie_modal.text_2;
		cookie_modal_content_col.appendChild(a);

		var a = document.createElement("a");
		a.setAttribute("href", "javascript:");
		a.classList.add("cookie-modal-content-section-link");
		a.textContent = _translations.cookie_modal.text_3;
		cookie_modal_content_col.appendChild(a);

		var a = document.createElement("a");
		a.setAttribute("href", "javascript:");
		a.classList.add("cookie-modal-content-section-link");
		a.textContent = _translations.cookie_modal.text_4;
		cookie_modal_content_col.appendChild(a);


		cookie_modal_content.appendChild(cookie_modal_content_col);



		// Create second cookie-modal-content.cookie-modal-content-col
		var cookie_modal_content_col = document.createElement("div");
		cookie_modal_content_col.classList.add("cookie-modal-content-col");

		// Create cookie-modal-content-col.cookie-modal-content-section
		var cookie_modal_content_section = document.createElement("div");
		cookie_modal_content_section.classList.add("cookie-modal-content-section", "active");

		// Create cookie-modal-content-section-header
		var cookie_modal_content_section_header = document.createElement("div");
		cookie_modal_content_section_header.classList.add("cookie-modal-content-section-header");

		var p = document.createElement("p");
		p.classList.add("cookie-modal-content-section-title");
		p.innerHTML = _translations.cookie_modal.text_1;
		cookie_modal_content_section_header.appendChild(p);


		// Create cookie-modal-content-section-text
		var cookie_modal_content_section_text = document.createElement("div");
		cookie_modal_content_section_text.classList.add("cookie-modal-content-section-text");

		var p = document.createElement("p");
		p.innerHTML = _translations.cookie_modal.text_5;
		cookie_modal_content_section_text.appendChild(p);

		// Create cookie-modal-content-section-acceptance-list
		var cookie_modal_content_section_acceptance_list = document.createElement("div");
		cookie_modal_content_section_acceptance_list.classList.add("cookie-modal-content-section-acceptance-list");

		// Create cookie-modal-content-section-acceptance-ltitle
		var cookie_modal_content_section_acceptance_ltitle = document.createElement("div");
		cookie_modal_content_section_acceptance_ltitle.classList.add("cookie-modal-content-section-acceptance-ltitle");
		cookie_modal_content_section_acceptance_ltitle.textContent = _translations.cookie_modal.text_6;
		cookie_modal_content_section_acceptance_list.appendChild(cookie_modal_content_section_acceptance_ltitle);
		
		// Create ul
		var ul = document.createElement("ul");

		var li = document.createElement("li");
		li.textContent = _translations.cookie_modal.text_7;
		ul.appendChild(li);

		var li = document.createElement("li");
		li.textContent = _translations.cookie_modal.text_8;
		ul.appendChild(li);

		var li = document.createElement("li");
		li.textContent = _translations.cookie_modal.text_9;
		ul.appendChild(li);

		cookie_modal_content_section_acceptance_list.appendChild(ul);

		cookie_modal_content_section_text.appendChild(cookie_modal_content_section_acceptance_list);

		cookie_modal_content_section.appendChild(cookie_modal_content_section_text);

		cookie_modal_content_col.appendChild(cookie_modal_content_section);

	

		// Create cookie-modal-content-section
		var cookie_modal_content_section = document.createElement("div");
		cookie_modal_content_section.classList.add("cookie-modal-content-section");

		// Create cookie-modal-content-section-header
		var cookie_modal_content_section_header = document.createElement("div");
		cookie_modal_content_section_header.classList.add("cookie-modal-content-section-header");

		var p = document.createElement("p");
		p.classList.add("cookie-modal-content-section-title");
		p.innerHTML = _translations.cookie_modal.text_2;

		cookie_modal_content_section_header.appendChild(p);

		cookie_modal_content_section.appendChild(cookie_modal_content_section_header);

		// Create cookie-modal-content-section-text
		var cookie_modal_content_section_text = document.createElement("div");
		cookie_modal_content_section_text.classList.add("cookie-modal-content-section-text");

		var p = document.createElement("p");
		p.innerHTML = _translations.cookie_modal.text_10;

		cookie_modal_content_section_text.appendChild(p);

		cookie_modal_content_section.appendChild(cookie_modal_content_section_text);

		cookie_modal_content_col.appendChild(cookie_modal_content_section);



		// Create cookie-modal-content-section
		var cookie_modal_content_section = document.createElement("div");
		cookie_modal_content_section.classList.add("cookie-modal-content-section");

		// Create cookie-modal-content-section-header
		var cookie_modal_content_section_header = document.createElement("div");
		cookie_modal_content_section_header.classList.add("cookie-modal-content-section-header");

		var p = document.createElement("p");
		p.classList.add("cookie-modal-content-section-title");
		p.innerHTML = _translations.cookie_modal.text_3;

		cookie_modal_content_section_header.appendChild(p);
		
		cookie_modal_content_section.appendChild(cookie_modal_content_section_header);

		// Create cookie-modal-content-section-text
		var cookie_modal_content_section_text = document.createElement("div");
		cookie_modal_content_section_text.classList.add("cookie-modal-content-section-text");

		var p = document.createElement("p");
		p.innerHTML = _translations.cookie_modal.text_11;

		cookie_modal_content_section_text.appendChild(p);

		cookie_modal_content_section.appendChild(cookie_modal_content_section_text);

		cookie_modal_content_col.appendChild(cookie_modal_content_section);


		// Create cookie-modal-content-section
		var cookie_modal_content_section = document.createElement("div");
		cookie_modal_content_section.classList.add("cookie-modal-content-section");

		// Create cookie-modal-content-section-header
		var cookie_modal_content_section_header = document.createElement("div");
		cookie_modal_content_section_header.classList.add("cookie-modal-content-section-header");

		var p = document.createElement("p");
		p.classList.add("cookie-modal-content-section-title");
		p.innerHTML = _translations.cookie_modal.text_4;

		cookie_modal_content_section_header.appendChild(p);
		
		cookie_modal_content_section.appendChild(cookie_modal_content_section_header);

		// Create cookie-modal-content-section-text
		var cookie_modal_content_section_text = document.createElement("div");
		cookie_modal_content_section_text.classList.add("cookie-modal-content-section-text");

		var p = document.createElement("p");
		p.innerHTML = _translations.cookie_modal.text_12;

		cookie_modal_content_section_text.appendChild(p);

		cookie_modal_content_section.appendChild(cookie_modal_content_section_text);

		cookie_modal_content_col.appendChild(cookie_modal_content_section);

		
		cookie_modal_content.appendChild(cookie_modal_content_col);

		cookie_modal_inner.appendChild(cookie_modal_content);


		// Create cookie-modal-footer
		var cookie_modal_footer = document.createElement("div");
		cookie_modal_footer.classList.add("cookie-modal-footer");

		// Create cookie-modal-footer-items
		var cookie_modal_footer_items = document.createElement("div");
		cookie_modal_footer_items.classList.add("cookie-modal-footer-items");

		// Create cookie-modal-footer-item
		var cookie_modal_footer_item = document.createElement("div");
		cookie_modal_footer_item.classList.add("cookie-modal-footer-item");

		var p = document.createElement("p");
		var span = document.createElement("span");
		span.textContent = "Powered by ";
		p.appendChild(span);

		var a = document.createElement("a");
		a.setAttribute("href", "https://www.plan4privacy.eu");
		a.setAttribute("target", "_blank");
		a.classList.add("cookies-button", "cookies-button-blue");
		a.textContent = "Plan4Privacy";
		p.appendChild(a);

		cookie_modal_footer_item.appendChild(p);

		cookie_modal_footer_items.appendChild(cookie_modal_footer_item);


		// Create cookie-modal-footer-item
		var cookie_modal_footer_item = document.createElement("div");
		cookie_modal_footer_item.classList.add("cookie-modal-footer-item");

		var a = document.createElement("a");
		a.setAttribute("href", "javascript:");
		a.setAttribute("onclick", "acceptAllCookies()");
		a.classList.add("cookies-button", "cookies-button-blue-all");
		a.textContent = _translations.cookie_modal.text_13;
		cookie_modal_footer_item.appendChild(a);

		cookie_modal_footer_items.appendChild(cookie_modal_footer_item);

		cookie_modal_footer.appendChild(cookie_modal_footer_items);
		
		cookie_modal_inner.appendChild(cookie_modal_footer);



		cookie_modal.appendChild(cookie_modal_inner);

		cookie_modal_overlay.appendChild(cookie_modal);

		document.body.appendChild(cookie_modal_overlay);

		// Build Modal
		var cookie_modal_style = document.getElementById("cookie-modal-styles");
		if(cookie_modal_style === null || cookie_modal_style === undefined){
			if(_cookie_data.styles !== null && _cookie_data.styles !== undefined){
				var modal_styles = _cookie_data.styles.modal;
				var style = "";

				if(modal_styles.closeButtonColor && modal_styles.closeButtonColor !== undefined){
					style += ".cookie-modal-close span{ color: " + modal_styles.closeButtonColor + "!important; }";
				}

				var header = modal_styles.header;
				if(header !== null && header !== undefined){
					if(header.bgColor !== null && header.bgColor !== undefined){
						style += ".cookie-modal-header{ background-color: " + header.bgColor + "; }";
					}

					if(header.bottomBorderColor !== null && header.bottomBorderColor !== undefined){
						style += ".cookie-modal-logo{ border-color: " + header.bottomBorderColor + "!important; }";
					}
				}

				var middle = modal_styles.middle;
				if(middle !== null && middle !== undefined){
					if(middle.bgColor !== null && middle.bgColor !== undefined){
						style += ".cookie-modal-content{ background-color: " + middle.bgColor + "; }";
					}

					var navBar = middle.navBar;
					if(navBar !== null && navBar !== undefined){
						if(navBar.linkTextColor !== null && navBar.linkTextColor !== undefined && navBar.linkTextColor.length > 0){
							style += ".cookie-modal-content-section-link{ color: " + navBar.linkTextColor + "!important; }";
						}

						if(navBar.linkBorderColor !== null && navBar.linkBorderColor !== undefined && navBar.linkBorderColor.length > 0){
							style += ".cookie-modal-content-section-link{ border-color: " + navBar.linkBorderColor + "!important; }";
						}

						if(navBar.linkActiveTextColor !== null && navBar.linkActiveTextColor !== undefined && navBar.linkActiveTextColor.length > 0){
							style += ".cookie-modal-content-section-link.active{ color: " + navBar.linkActiveTextColor + "!important; }";
						}

						if(navBar.linkActiveBorderColor !== null && navBar.linkActiveBorderColor !== undefined && navBar.linkActiveBorderColor.length > 0){
							style += ".cookie-modal-content-section-link.active{ border-color: " + navBar.linkActiveBorderColor + "!important; }";
						}
					}

					var details = middle.details;
					if(details !== null && details !== undefined){
						if(details.titleColor !== null && details.titleColor !== undefined && details.titleColor.length > 0){
							style += ".cookie-modal-content-section-title, .cookie-modal-content-section-acceptance-ltitle{ color: " + details.titleColor + "!important; }";
						}

						if(details.textColor !== null && details.textColor !== undefined){
							style += ".cookie-modal-content-section-text p, .cookie-modal-content-section-acceptance-list ul li{ color: " + details.textColor + "!important; }";
						}

						if(details.checkSymbolColor !== null && details.checkSymbolColor !== undefined){
							style += ".cookie-modal-content-section-acceptance-list ul li:before{ color: " + details.checkSymbolColor + "!important; }";
						}
					}
				}


				var footer = modal_styles.footer;
				if(footer !== null && footer !== undefined){
					if(footer.bgColor !== null && footer.bgColor !== undefined && footer.bgColor.length > 0){
						style += ".cookie-modal-footer{ background-color: " + footer.bgColor + "!important; }";
					}

					var provider = footer.provider;
					if(provider !== null && provider !== undefined){
						
						if(provider.textColor !== null && provider.textColor !== undefined && provider.textColor.length > 0){
							style += ".cookie-modal-footer-items .cookie-modal-footer-item:first-child p{ color: " + provider.textColor + "!important; }";
						}

						if(provider.linkColor !== null && provider.linkColor !== undefined && provider.linkColor.length > 0){
							style += ".cookie-modal-footer-items .cookie-modal-footer-item:first-child p a{ color: " + provider.linkColor + "!important; }";
						}

						if(provider.hoverLinkColor !== null && provider.hoverLinkColor !== undefined && provider.hoverLinkColor.length > 0){
							style += ".cookie-modal-footer-items .cookie-modal-footer-item:first-child p a:hover{ color: " + provider.hoverLinkColor + "!important; }";
						}

						if(provider.linkBorderColor !== null && provider.linkBorderColor !== undefined && provider.linkBorderColor.length > 0){
							style += ".cookie-modal-footer-items .cookie-modal-footer-item:first-child p a{ border-color: " + provider.linkBorderColor + "!important; }";
						}

						if(provider.hoverLinkBorderColor !== null && provider.hoverLinkBorderColor !== undefined && provider.hoverLinkBorderColor.length > 0){
							style += ".cookie-modal-footer-items .cookie-modal-footer-item:first-child p a:hover{ border-color: " + provider.hoverLinkBorderColor + "!important; }";
						}
					}



					// Sticky footer accept button
					var acceptButton = footer.acceptButton;

					if(acceptButton.bgColor !== undefined && acceptButton.bgColor !== null && acceptButton.bgColor.length > 0){
						style += ".cookie-modal-footer-items .cookie-modal-footer-item:last-child a{ background-color: " + acceptButton.bgColor + "!important; }";
					}

					if(acceptButton.bgHoverColor !== undefined && acceptButton.bgHoverColor !== null && acceptButton.bgHoverColor.length > 0){
						style += ".cookie-modal-footer-items .cookie-modal-footer-item:last-child a:hover{ background-color: " + acceptButton.bgHoverColor + "!important; }";
					}

					if(acceptButton.borderColor !== undefined && acceptButton.borderColor !== null && acceptButton.borderColor.length > 0){
						style += ".cookie-modal-footer-items .cookie-modal-footer-item:last-child a{ border-color: " + acceptButton.borderColor + "!important; }";
					}

					if(acceptButton.hoverBorderColor !== undefined && acceptButton.hoverBorderColor !== null && acceptButton.hoverBorderColor.length > 0){
						style += ".cookie-modal-footer-items .cookie-modal-footer-item:last-child a:hover{ border-color: " + acceptButton.hoverBorderColor + "!important; }";
					}

					if(acceptButton.textColor !== undefined && acceptButton.textColor !== null && acceptButton.textColor.length > 0){
						style += ".cookie-modal-footer-items .cookie-modal-footer-item:last-child a{ color: " + acceptButton.textColor + "!important; }";
					}

					if(acceptButton.hoverTextColor !== undefined && acceptButton.hoverTextColor !== null && acceptButton.hoverTextColor.length > 0){
						style += ".cookie-modal-footer-items .cookie-modal-footer-item:last-child a:hover{ color: " + acceptButton.hoverTextColor + "!important; }";
					}
				}

				// Appending styles
				var head = document.head || document.getElementsByTagName('head')[0], styles = document.createElement('style');
				styles.type = 'text/css';
				if (styles.styleSheet){
				  	// This is required for IE8 and below.
				  	styles.styleSheet.cssText = style;
				} else {
				  	styles.appendChild(document.createTextNode(style));
				}
				styles.setAttribute("id", "cookie-modal-styles");
				head.appendChild(styles);
			}
		}
	}


	// Open modal
	var cookie_modal_overlay = document.getElementsByClassName('cookie-modal-overlay')[0];
	cookie_modal_overlay.style.display = "block";

	var cookie_modal = document.getElementsByClassName('cookie-modal')[0];
	cookie_modal.style.display = "block";

	var interval = setInterval(function(){
		if(cookie_modal_overlay_opacity < 1){
			cookie_modal_transform_scale += 0.2;
			cookie_modal_overlay_opacity += 0.2;

			cookie_modal_overlay.style.opacity = cookie_modal_overlay_opacity;
			cookie_modal.style.opacity = cookie_modal_overlay_opacity;
			cookie_modal.style.transform = 'scaleX(' + cookie_modal_transform_scale + ')';
		}else{
			clearInterval(interval);
		}
	}, 50);


	// Modal section link functionality
	var cookie_modal_section_links_els = document.getElementsByClassName('cookie-modal-content-section-link');
	for (var i = 0; i < cookie_modal_section_links_els.length; i++) {
		(function(index){
	        cookie_modal_section_links_els[i].onclick = function(e){
	        	for (var j = 0; j < cookie_modal_section_links_els.length; j++) {
	        		cookie_modal_section_links_els[j].classList.remove("active");
	        	}
	        	cookie_modal_section_links_els[index].classList.add("active");


	        	var sections = document.querySelectorAll(".cookie-modal-content-col .cookie-modal-content-section");
	        	for (var j = 0; j < sections.length; j++) {
	        		sections[j].style.display = "none"; 
	        	}

	        	sections[index].style.display = "block";
	        }  
	    })(i);
	}


	// Close modal when clicked in overlay only
	document.getElementsByClassName("cookie-modal-overlay")[0].onclick = function(e){
		if(e.target.classList.contains("cookie-modal-overlay")){
			closeCookieModal();
		}
	}
}

function closeCookieModal(){
	var cookie_modal = document.getElementsByClassName('cookie-modal')[0];
	var cookie_modal_overlay = document.getElementsByClassName('cookie-modal-overlay')[0];

	if(cookie_modal_overlay !== undefined && cookie_modal_overlay !== null){
		var interval = setInterval(function(){
			if(cookie_modal_overlay_opacity > 0){
				cookie_modal_transform_scale -= 0.2;
				cookie_modal_overlay_opacity -= 0.2;

				cookie_modal_overlay.style.opacity = cookie_modal_overlay_opacity;
				cookie_modal.style.opacity = cookie_modal_overlay_opacity;
				cookie_modal.style.transform = 'scaleX(' + cookie_modal_transform_scale + ')';
			}else{
				cookie_modal.style.display = "none";
				cookie_modal_overlay.style.display = "none";
				clearInterval(interval);
			}
		}, 50);
	}
}

function ccSetCookie(cname, cvalue, exdays) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays*24*60*60*1000));
	var expires = "expires="+ d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function ccGetCookie(cname) {
	var name = cname + "=";
	var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split(';');
	for(var i = 0; i <ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}

function ccGetFilePath(){
	var index = 0;
	var scripts = document.getElementsByTagName("script");

	for (var i = 0; i < scripts.length; i++) {
		var src = scripts[i].src;
		if(index == 0 && src.includes("cookie-consent-gdpr-api")){
			index = i;
		}
	}

	return scripts[index].src;
}

// trim, rtrim, ltrim
function ccTrim(str, chr) {
  var rgxtrim = (!chr) ? new RegExp('^\\s+|\\s+$', 'g') : new RegExp('^'+chr+'+|'+chr+'+$', 'g');
  return str.replace(rgxtrim, '');
}

function ccRtrim(str, chr) {
  var rgxtrim = (!chr) ? new RegExp('\\s+$') : new RegExp(chr+'+$');
  return str.replace(rgxtrim, '');
}

function ccLtrim(str, chr) {
  var rgxtrim = (!chr) ? new RegExp('^\\s+') : new RegExp('^'+chr+'+');
  return str.replace(rgxtrim, '');
}