export function disableElement(elementId) {
    const element = document.getElementById(elementId);
    element.style.filter = "blur(0.1em)";
    element.style.cursor = "not-allowed";
    element.setAttribute("tabindex", "-1");
}

export function enableElement(elementId) {
    const element = document.getElementById(elementId);
    element.style.filter = "";
    element.style.cursor = "pointer";
element.setAttribute("tabindex", "0");
}

export function toggleElementVisibility(elementId, isDFlex=false) {
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

export function hideElement(elementId){
    const element = document.getElementById(elementId);
    element.classList.add("hide");
}

export function showElement(elementId){
    const element = document.getElementById(elementId);
    element.classList.remove("hide");
}

export function removeTooltip(targetId){
    const tooltipElement = document.getElementById(targetId);
    tooltipElement.removeAttribute("data-tooltip-content");
};

export function setTooltipContent(targetId, text){
    const tooltipElement = document.getElementById(targetId);
    tooltipElement.setAttribute("data-tooltip-content", text);
};

export function markSelectedTrip(tripWrapperId, className="trip-wrapper"){
    const otherTripWrappers = document.querySelectorAll("." + className);
    otherTripWrappers.forEach((tripWrapper) => {
        tripWrapper.classList.remove("trip-selected");
    });

    const tripWrapper = document.getElementById(tripWrapperId);
    tripWrapper.classList.add("trip-selected");
};

export function rotateElement(elementId) {
    const element = document.getElementById(elementId);

    element.classList.contains("rotate") ?
        element.classList.remove("rotate") : element.classList.add("rotate");
}

// export function =
