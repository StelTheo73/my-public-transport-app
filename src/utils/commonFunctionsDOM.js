export function disableElement(elementId) {
    try {
        const element = document.getElementById(elementId);
        element.style.filter = "blur(0.1em)";
        element.style.cursor = "not-allowed";
        element.setAttribute("tabindex", "-1");
    }
    catch (error) {
        console.debug(error.message);
    }

};

export function enableElement(elementId) {
    try {
        const element = document.getElementById(elementId);
        element.style.filter = "";
        element.style.cursor = "pointer";
        element.setAttribute("tabindex", "0");
    }
    catch (error) {
        console.debug(error.message);
    }

};

export function toggleElementVisibility(elementId, isDFlex=false) {
    try {
        const element = document.getElementById(elementId);
        if (element.classList.contains("hide")) {
            element.classList.remove("hide");

            if (isDFlex) {
                element.classList.add("d-flex");
            }
        }
        else {
            element.classList.add("hide");

            if (isDFlex) {
                element.classList.remove("d-flex");
            }
        }
    }
    catch (error) {
        console.debug(error.message);
    }
};

export function hideElement(elementId, isDFlex=false){
    try {
        const element = document.getElementById(elementId);
        element.classList.add("hide");

        if (isDFlex) {
            element.classList.remove("d-flex");
        }
    }
    catch (error) {
        console.debug(error.message);
    }
};

export function showElement(elementId, isDFlex=false){
    try {
        const element = document.getElementById(elementId);
        element.classList.remove("hide");

        if (isDFlex) {
            element.classList.add("d-flex");
        }
    }
    catch (error) {
        console.debug(error.message);
    }
};

export function removeTooltip(targetId){
    try {
        const tooltipElement = document.getElementById(targetId);
        tooltipElement.removeAttribute("data-tooltip-content");
    }
    catch (error) {
        console.debug(error.message);
    }
};

export function setTooltipContent(targetId, text){
    const tooltipElement = document.getElementById(targetId);
    tooltipElement.setAttribute("data-tooltip-content", text);
};

export function markSelectedTrip(tripWrapperId, className="trip-wrapper", classToAdd="trip-selected") {
    try {
        const otherTripWrappers = document.querySelectorAll("." + className);
        otherTripWrappers.forEach((tripWrapper) => {
            tripWrapper.classList.remove(classToAdd);
        });

        const tripWrapper = document.getElementById(tripWrapperId);
        tripWrapper.classList.add(classToAdd);
    }
    catch (error) {
        console.debug(error.message);
    }
};

export function unMarkSelectedTrips(className="trip-wrapper", classToRemove="trip-selected") {
    try {
        const tripWrappers = document.querySelectorAll("." + className);
        tripWrappers.forEach((tripWrapper) => {
            tripWrapper.classList.remove(classToRemove);
        });
    }
    catch (error) {
        console.debug(error.message);
    }
}

export function rotateElement(elementId) {
    try {
        const element = document.getElementById(elementId);

        element.classList.contains("rotate") ?
            element.classList.remove("rotate") : element.classList.add("rotate");
    }
    catch (error) {
        console.debug(error.message);
    }
};

// export function =
