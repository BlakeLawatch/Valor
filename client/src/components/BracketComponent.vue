<template>
    <div class="wrapper">
        <div class="item">
            <div class="item-parent">
                <p>Parent</p>
            </div>
            <div class="item-childrens">
                <div class="item-child">
                    <div class="item">
                        <div class="item-parent">
                            <p>Parent</p>
                        </div>
                        <div class="item-childrens">
                            <div class="item-child">
                                <div class="item">
                                    <div class="item-parent">
                                        <p>Parent</p>
                                    </div>
                                    <div class="item-childrens">
                                        <div class="item-child">
                                            <p>child 1</p>
                                        </div>
                                        <div class="item-child">
                                            <p>child 2</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="item-child">
                                <p>child 2</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="item-child">
                    <div class="item">
                        <div class="item-parent">
                            <p>Parent</p>
                        </div>
                        <div class="item-childrens">
                            <div class="item-child">
                                <div class="item">
                                    <div class="item-parent">
                                        <p>Parent</p>
                                    </div>
                                    <div class="item-childrens">
                                        <div class="item-child">
                                            <p>child 1</p>
                                        </div>
                                        <div class="item-child">
                                            <p>child 2</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="item-child">
                                <p>child 2</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    setup() {
        return {}
    }
};
</script>


<style lang="scss" scoped>
$side-margin: 50px;
$vertical-margin: 10px;

body {
    background-color: DarkSalmon;
}

.wrapper {
    display: flex;
    height: 600px;
    justify-content: center;
}

.item {
    display: flex;
    flex-direction: row-reverse;

    p {
        padding: 20px;
        margin: 0;
        background-color: Beige;
    }

    &-parent {
        position: relative;
        margin-left: $side-margin;
        display: flex;
        align-items: center;

        &:after {
            position: absolute;
            content: '';
            width: $side-margin/2;
            height: 2px;
            left: 0;
            top: 50%;
            background-color: #fff;
            transform: translateX(-100%);
        }
    }

    &-childrens {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    &-child {
        display: flex;
        align-items: flex-start;
        justify-content: flex-end;
        margin-top: $vertical-margin;
        margin-bottom: $vertical-margin;
        position: relative;

        &:before {
            content: '';
            position: absolute;
            background-color: #fff;
            right: 0;
            top: 50%;
            transform: translateX(100%);
            width: 25px;
            height: 2px;
        }

        &:after {
            content: '';
            position: absolute;
            background-color: #fff;
            right: -$side-margin / 2;
            height: calc(50% + 22px);
            width: 2px;
            top: 50%;
        }

        &:last-child {
            &:after {
                transform: translateY(-100%);
            }
        }

        &:only-child:after {
            display: none;
        }
    }
}
</style>