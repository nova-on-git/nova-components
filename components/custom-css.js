// function (item-ref, class watching for, where it should be assigned to)

// custom-css.js
export function customCss(element, propName, targetElement, targetProperty) {
    const computedStyle = getComputedStyle(element.value)
    const propValue = computedStyle.getPropertyValue(propName)
    if (propValue) {
        targetElement.value.style[targetProperty] = propValue.trim()
    }
}

export function addValueAsClass(startItemRef, customProperty, endItemRef) {
    const customProp = window.getComputedStyle(startItemRef.value).getPropertyValue(customProperty)

    if (customProp) {
        endItemRef.value.classList.add(customProp)
    }
}

export function getCustomProperty(element, property) {
    return getComputedStyle(element.value).getPropertyValue(property)
}

// Function to set a CSS custom property value
export function setCustomProperty(element, property, value) {
    element.value.style.setProperty(property, value)
}
