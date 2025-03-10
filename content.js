// Create a status bar element
const statusBar = document.createElement("div");
statusBar.textContent =
  "Xnl Reveal is getting reflections. If there are a large number of parameters, this can take a while. Wait until this message disappears if you want the results.";
statusBar.style.backgroundColor = "red";
statusBar.style.color = "white";
statusBar.style.position = "fixed";
statusBar.style.top = "0";
statusBar.style.left = "0";
statusBar.style.right = "0";
statusBar.style.padding = "10px";
statusBar.style.textAlign = "center";
statusBar.style.zIndex = "9999";

// Define a global constant for ignored src strings
const IGNORED_STRINGS = "googletagmanager|doubleclick|google-analytics";

// Listen for messages from the popup or background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "showWaybackEndpoints") {
    showWaybackEndpoints();
  }
  if (message.action === "showHiddenElements") {
    showHiddenElements();
  }
  if (message.action === "enableDisabledElements") {
    enableDisabledElements();
  }
});

function htmlEntities(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Function to show all wayback endpoints for the domain in a separate window
function showWaybackEndpoints() {
  try {
    var currentURL = encodeURIComponent(
      window.location.hostname.replace(/^www\./, "")
    );
    console.log(`Xnl Reveal: Wayback location ${currentURL}`);
    var newURL =
      "https://web.archive.org/cdx/search/cdx?url=*." +
      currentURL +
      "&fl=original&collapse=urlkey&filter=!mimetype:warc/revisit|text/css|image/jpeg|image/jpg|image/png|image/svg.xml|image/gif|image/tiff|image/webp|image/bmp|image/vnd|image/x-icon|image/vnd.microsoft.icon|font/ttf|font/woff|font/woff2|font/x-woff2|font/x-woff|font/otf|audio/mpeg|audio/wav|audio/webm|audio/aac|audio/ogg|audio/wav|audio/webm|video/mp4|video/mpeg|video/webm|video/ogg|video/mp2t|video/webm|video/x-msvideo|video/x-flv|application/font-woff|application/font-woff2|application/x-font-woff|application/x-font-woff2|application/vnd.ms-fontobject|application/font-sfnt|application/vnd.android.package-archive|binary/octet-stream|application/octet-stream|application/pdf|application/x-font-ttf|application/x-font-otf|video/webm|video/3gpp|application/font-ttf|audio/mp3|audio/x-wav|image/pjpeg|audio/basic|application/font-otf&filter=!statuscode:404|301|302&page=";

    // open the window
    var newWindow = window.open(newURL, "_blank");
  } catch (error) {
    console.error("Xnl Reveal: Error in showWaybackEndpoints:", error);
  }
}

// Function to enable disabled elements
function enableDisabledElements() {
  try {
    document
      .querySelectorAll(
        ':not(img):not(span):not(div)[disabled],:not(img):not(span):not(div)[disabled=""]'
      )
      .forEach((e) => {
        // Check if the element should be ignored based on the 'src' attribute
        const src = e.getAttribute("src");
        if (!src || !new RegExp(IGNORED_STRINGS, "i").test(src)) {
          e.disabled = false;
          e.style.cssText = "border-color: blue; border-width: 3px";
          const d = document.createElement("div");
          const elementType = e.getAttribute("type") || e.tagName;
          const elementName = e.getAttribute("name") || e.getAttribute("id");
          d.innerHTML = `<span style="color: blue;">Disabled ${htmlEntities(
            elementType
          )} [${htmlEntities(elementName)}]  </span>`;
          e.parentNode.insertBefore(d, e).appendChild(e);
        }
      });
  } catch (error) {
    console.error("Xnl Reveal: Error in enableDisabledElements:", error);
  }
}

// Function to show hidden elements
function showHiddenElements() {
  try {
    document
      .querySelectorAll(
        ":not(img):not(span):not(div)[type=hidden],:not(img):not(span):not(div)[hidden]"
      )
      .forEach((e) => {
        // Check if the element should be ignored based on the 'src' attribute
        const src = e.getAttribute("src");
        if (!src || !new RegExp(IGNORED_STRINGS).test(src)) {
          e.type = "text";
          e.style.cssText = "border-color: red; border-width: 3px";
          const d = document.createElement("div");
          const elementType = e.getAttribute("type") || e.tagName;
          const elementName = e.getAttribute("name") || e.getAttribute("id");
          d.innerHTML = `<span style="color: red;">Hidden ${htmlEntities(
            elementType
          )} [${htmlEntities(elementName)}]  </span>`;
          e.parentNode.insertBefore(d, e).appendChild(e);
        }
      });
  } catch (error) {
    console.error("Xnl Reveal: Error in showHiddenElements (hidden):", error);
  }
  try {
    document
      .querySelectorAll(':not(img):not(span):not(div)[style*="display: none;"]')
      .forEach((e) => {
        // Check if the element should be ignored based on the 'src' attribute
        const src = e.getAttribute("src");
        if (!src || !new RegExp(IGNORED_STRINGS).test(src)) {
          e.type = "text";
          e.style.cssText = "border-color: red; border-width: 3px";
          e.style.display = "block";
          const d = document.createElement("div");
          const elementType = e.getAttribute("type") || e.tagName;
          const elementName = e.getAttribute("name") || e.getAttribute("id");
          d.innerHTML = `<span style="color: red;">Hidden ${htmlEntities(
            elementType
          )} [${htmlEntities(elementName)}]  </span>`;
          e.parentNode.insertBefore(d, e).appendChild(e);
        }
      });
  } catch (error) {
    console.error(
      "Xnl Reveal: Error in showHiddenElements (display none):",
      error
    );
  }
  try {
    document
      .querySelectorAll(
        ':not(img):not(span):not(div)[style*="visibility: hidden;"]'
      )
      .forEach((e) => {
        // Check if the element should be ignored based on the 'src' attribute
        const src = e.getAttribute("src");
        if (!src || !new RegExp(IGNORED_STRINGS).test(src)) {
          e.type = "text";
          e.style.cssText = "border-color: red; border-width: 3px";
          e.style.visibility = "visible";
          const d = document.createElement("div");
          const elementType = e.getAttribute("type") || e.tagName;
          const elementName = e.getAttribute("name") || e.getAttribute("id");
          d.innerHTML = `<span style="color: red;">Hidden ${htmlEntities(
            elementType
          )} [${htmlEntities(elementName)}]  </span>`;
          e.parentNode.insertBefore(d, e).appendChild(e);
        }
      });
  } catch (error) {
    console.error(
      "Xnl Reveal: Error in showHiddenElements (visibility hidden):",
      error
    );
  }
}

// Read the user's random string and extension state from storage
chrome.storage.sync.get(
  [
    "canaryToken",
    "checkDelay",
    "waybackJSOnly",
    "extensionEnabled",
    "alertsEnabled",
    "waybackEnabled",
    "hiddenEnabled",
    "disabledEnabled",
  ],
  (result) => {
    if (result.extensionEnabled === undefined) {
      chrome.storage.sync.set({ ["extensionEnabled"]: false });
      extensionEnabled = false;
    } else {
      extensionEnabled = result.extensionEnabled || false;
    }
    if (result.alertsEnabled === undefined) {
      chrome.storage.sync.set({ ["alertsEnabled"]: false });
      alertsEnabled = false;
    } else {
      alertsEnabled = result.alertsEnabled || false;
    }
    if (result.waybackEnabled === undefined) {
      chrome.storage.sync.set({ ["waybackEnabled"]: false });
      waybackEnabled = false;
    } else {
      waybackEnabled = result.waybackEnabled || false;
    }
    if (result.hiddenEnabled === undefined) {
      chrome.storage.sync.set({ ["hiddenEnabled"]: false });
      hiddenEnabled = false;
    } else {
      hiddenEnabled = result.hiddenEnabled || false;
    }
    if (result.disabledEnabled === undefined) {
      chrome.storage.sync.set({ ["disabledEnabled"]: false });
      disabledEnabled = false;
    } else {
      disabledEnabled = result.disabledEnabled || false;
    }
    if (result.canaryToken === undefined) {
      chrome.storage.sync.set({ ["canaryToken"]: "xnlmirror" });
      canaryToken = "xnlmirror";
    } else {
      canaryToken = result.canaryToken || "xnlmirror";
    }
    if (result.checkDelay === undefined) {
      chrome.storage.sync.set({ ["checkDelay"]: "2" });
      checkDelay = "2";
    } else {
      checkDelay = result.checkDelay || "2";
    }
    if (result.waybackJSOnly === undefined) {
      chrome.storage.sync.set({ ["waybackJSOnly"]: false });
      waybackJSOnly = true;
    } else {
      waybackJSOnly =
        result.waybackJSOnly === undefined ? false : result.waybackJSOnly;
    }

    function writeWaybackEndpoints() {
      try {
        // Get the current location without schema and query srting
        currentLocation = location.host + location.pathname;
        if (!currentLocation.endsWith("/")) {
          currentLocation += "/";
        }
        // Check if this URL has already been used to check wayback
        chrome.storage.local.get(
          ["wayback://" + currentLocation],
          ({ ["wayback://" + currentLocation]: waybackPath }) => {
            if (!waybackPath) {
              // Send a message to background.js to request Wayback Machine data
              chrome.runtime.sendMessage(
                {
                  action: "fetchWaybackData",
                  location: currentLocation,
                },
                (response) => {
                  if (chrome.runtime.lastError) {
                    // Handle any error that may occur when sending the message
                    console.error(chrome.runtime.lastError);
                    return;
                  }
                  const { waybackData, error } = response;
                  if (error) {
                    // Handle the error if there's one
                    console.log(
                      "Xnl Reveal: Error fetching Wayback Machine data:",
                      error
                    );
                  } else {
                    // Process the Wayback Machine data here
                    if (waybackJSOnly) {
                      // Process only lines that end with ".js" (excluding lines that end with "?", "#", or whitespace)
                      const jsLines = waybackData
                        .split("\n")
                        .filter((line) =>
                          new RegExp(".js[^$|?#]", "i").test(line.trim())
                        );
                      // Process the response if not blank
                      if (jsLines.join("\n").trim() != "") {
                        console.log(jsLines.join("\n").trim());
                      }
                    } else {
                      console.log(waybackData);
                    }
                  }
                }
              );
              // Mark this URL as visited
              const waybackData = {
                ["wayback://" + currentLocation]: true,
              };
              chrome.storage.local.set(waybackData);
            } else {
              console.log(
                `Xnl Reveal: Location ${currentLocation} already checked on wayback archive.`
              );
            }
          }
        );
      } catch (error) {
        // Handle other errors here
        console.error("Xnl Reveal: An error occurred:", error);
      }
    }

    // Function to run your code after page load
    function runAfterPageLoad() {
      try {
        // Check if the extension is enabled and an option is selected
        if (
          extensionEnabled &&
          (hiddenEnabled || disabledEnabled || alertsEnabled || waybackEnabled)
        ) {
          // Write wayback endpoints to console if the option is checked
          if (waybackEnabled) {
            writeWaybackEndpoints();
          }
          // Show hidden fields if the option is checked
          if (hiddenEnabled) {
            showHiddenElements();
          }
          // Enable disabled fields if the option is checked
          if (disabledEnabled) {
            enableDisabledElements();
          }
          // Alert on reflections if enabled
          if (alertsEnabled) {
            const params = new URLSearchParams(window.location.search);
            const reflectedParameters = [];

            // Initialize a counter to keep track of successful requests
            let successfulRequests = 0;

            params.forEach((value, key) => {
              // Create a modified URL by replacing the current parameter's value
              const modifiedParams = new URLSearchParams(params);
              modifiedParams.set(key, canaryToken);
              const modifiedURL = `${window.location.origin}${window.location.pathname}?${modifiedParams}`;

              // Check if this URL and parameter have already triggered an alert
              chrome.storage.local.get(
                [window.location.href, key],
                ({ [window.location.href]: urlData, [key]: paramData }) => {
                  if (!urlData || !paramData) {
                    // Initialize a timeout promise
                    const timeoutPromise = new Promise((resolve, reject) => {
                      setTimeout(() => {
                        const timeoutError = new Error(
                          `Xnl Reveal: Fetch timed out for URL: ${modifiedURL}`
                        );
                        reject(timeoutError);
                      }, 30000); // 30 seconds (adjust as needed)
                    });

                    document.body.appendChild(statusBar);

                    console.log(`Xnl Reveal: Fetching ${modifiedURL}`);
                    // Perform the fetch for this specific parameter
                    fetch(modifiedURL)
                      .then((response) => response.text())
                      .then((text) => {
                        // Check if the random string is reflected in the response
                        if (text.includes(canaryToken)) {
                          reflectedParameters.push(key);
                        }
                        // Mark this URL and parameter as alerted
                        const alertData = {
                          [window.location.href]: true,
                          [key]: true,
                        };
                        chrome.storage.local.set(alertData);

                        // Increment the successful requests counter
                        successfulRequests++;

                        // Check if we have processed all parameters and found reflections
                        if (successfulRequests === params.size) {
                          if (reflectedParameters.length > 0) {
                            // Display an alert with the parameter names that reflect
                            if (alertsEnabled) {
                              alert(
                                `Reflection found in URL: ${
                                  window.location.href
                                }\n\nReflected Parameters: ${reflectedParameters.join(
                                  ", "
                                )}`
                              );
                            }
                            // Write the info to the console too
                            console.log(
                              `Xnl Reveal: Reflection found in URL: ${
                                window.location.href
                              }. Reflected Parameters: ${reflectedParameters.join(
                                ", "
                              )}`
                            );
                          }
                          // Remove the status bar once all requests are processed
                          statusBar.remove();
                        }
                      })
                      .catch((error) => {
                        console.error("Xnl Reveal: Fetch error:", error); // Handle fetch errors here

                        // Increment the successful requests counter even for failed requests
                        successfulRequests++;

                        // Check if we have processed all parameters
                        if (successfulRequests === params.size) {
                          statusBar.remove(); // Remove the status bar once all requests are processed
                        }
                      });
                  }
                }
              );
            });
          }
        }
      } catch (error) {
        // Handle other errors here
        console.error("Xnl Reveal: An error occurred:", error);

        // Remove the status bar if an error occurs
        statusBar.remove();
      }
    }

    // Use the window.onload event to trigger your code after the page has loaded.
    window.onload = runAfterPageLoad;

    // Check if the extension is enabled and an option is selected. This will run again after the delay to catch dynamic content
    try {
      if (extensionEnabled && (hiddenEnabled || disabledEnabled)) {
        setTimeout(() => {
          // Show hidden fields if the option is checked
          if (hiddenEnabled) {
            showHiddenElements();
          }
          // Enable disabled fields if the option is checked
          if (disabledEnabled) {
            enableDisabledElements();
          }
        }, Number(checkDelay) * 1000);
      }
    } catch (error) {
      // Handle other errors here
      console.error("Xnl Reveal: An error occurred:", error);
    }
  }
);
