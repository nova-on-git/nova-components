<template>
    <div class="circle-container">
        <div class="circle">
            <div class="circle-inner">
                <div class="circle-inner-number">90</div>
            </div>
        </div>
    </div>
</template>

<script setup>
onMounted(() => {
    
    const score = 100
    document.querySelector('.circle-inner-number').textContent = score;

})
</script>

<style scoped>

.circle-container {
    position: relative;
    width: 150px;
    height: 150px;
}

.circle {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #e0e0e0;
    position: relative;
    overflow: hidden;
}

.circle-inner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
    height: 90%;
    border-radius: 50%;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1
}

.circle-inner-number {
    font-size: 2em;
    color: #4caf50;
}

.circle:before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #4caf50;
    clip: rect(0, 75px, 150px, 0);
    animation: rotate-right 2s linear forwards;
}

.circle:after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #4caf50;
    clip: rect(0, 150px, 150px, 75px);
    animation: rotate-left 2s linear forwards;
}

@keyframes rotate-right {
    from { transform: translate(-50%, -50%) rotate(180deg); }
    to { transform: translate(-50%, -50%) rotate(360deg); }
}

@keyframes rotate-left {
    from { transform: translate(-50%, -50%) rotate(00deg); }
    to { transform: translate(-50%, -50%) rotate(360deg); }
}
</style>