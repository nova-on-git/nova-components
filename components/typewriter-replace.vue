<template>
    
    <p class="typewriter-replace">
        <slot class="wrap" />
    </p>
</template>

<script setup>
const slots = useSlots()
const slotItems = ref([])
const tagType = ref()
const tagClasses = ref()
const textHeight = ref()
const props = defineProps({
    speed: {
        type: String,
        default: "200",
    },
    pause: {
        type: String,
        default: "1000",
    },
})

var TxtType = function (el, toRotate, period) {
    this.toRotate = toRotate
    this.el = el
    this.loopNum = 0
    this.period = parseInt(period, 10) || 2000
    this.txt = ""
    this.tick()
    this.isDeleting = false
}

TxtType.prototype.tick = function () {
    var i = this.loopNum % this.toRotate.length
    var fullTxt = this.toRotate[i]

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1)
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1)
    }

    this.el.innerHTML =
        "<" +
        tagType.value +
        ' class="wrap ' +
        tagClasses.value +
        '">' +
        this.txt +
        "</" +
        tagType.value +
        ">"

    var that = this
    var delta = props.speed - Math.random() * 100

    if (this.isDeleting) {
        delta /= 2
    }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period
        this.isDeleting = true
    } else if (this.isDeleting && this.txt === "") {
        this.isDeleting = false
        this.loopNum++
        delta = 500
    }

    setTimeout(function () {
        that.tick()
    }, delta)
}

onMounted(() => {
    slotItems.value = slots.default ? slots.default() : []
    tagType.value = slotItems.value[0].type
    textHeight.value = slotItems.value[0]
    // tagClasses.value = slotItems.value[0].props.class

    var elements = document.getElementsByClassName("typewriter-replace")
    for (var i = 0; i < elements.length; i++) {
        var toRotate = elements[i].getAttribute("data-type")
        var period = props.pause
        if (toRotate) {
            new TxtType(elements[i], JSON.parse(toRotate), period)
        }
    }

    // INJECT CSS
    var css = document.createElement("style")
    css.type = "text/css"
    css.innerHTML = ".typewriter-replace > .wrap { border-right: 1px solid #fff}"
    document.body.appendChild(css)
})
</script>

<style lang="sass" scoped>
</style>
