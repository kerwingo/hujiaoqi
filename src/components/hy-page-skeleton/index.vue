<template>
  <view
    class="van-skeleton"
    :class="[border ? 'van-skeleton--border' : '']"
    v-if="loading"
    @touchmove.prevent
  >
    <!-- 1. post detail skeleton -->
    <template v-if="type === 1">
      <view class="van-skeleton--top van-skeleton--animate">
        <view
          :class="['van-skeleton__avatar', 'van-skeleton__avatar--round']"
          :style="{ width: avatarSize, height: avatarSize }"
        ></view>
        <view
          class="van-skeleton__title title"
          :style="{ width: titleWidth }"
        ></view>
      </view>
      <view class="van-skeleton--section van-skeleton--animate">
        <view
          class="van-skeleton__title area"
          :style="{ width: '100%' }"
        ></view>
        <view
          class="van-skeleton__title area-sm"
          :style="{ width: '15%' }"
        ></view>
        <view
          class="van-skeleton__title area-sm"
          :style="{ width: '15%' }"
        ></view>
        <view
          class="van-skeleton__title area"
          :style="{ width: '100%', marginLeft: '10%' }"
        ></view>
        <view
          class="van-skeleton__title area"
          :style="{ width: '100%' }"
        ></view>
        <view
          class="van-skeleton__title area area-img"
          :style="{ width: '100%' }"
        ></view>
        <view
          class="van-skeleton__title area"
          :style="{ width: '100%', marginLeft: '10%' }"
        ></view>
        <view
          class="van-skeleton__title area"
          :style="{ width: '100%' }"
        ></view>
        <view
          class="van-skeleton__title area"
          :style="{ width: '100%' }"
        ></view>
        <view
          class="van-skeleton__title area area-img"
          :style="{ width: '100%' }"
        ></view>
        <view
          class="van-skeleton__title area"
          :style="{ width: '100%', marginLeft: '10%' }"
        ></view>
        <view
          class="van-skeleton__title area"
          :style="{ width: '100%' }"
        ></view>
        <view
          class="van-skeleton__title area"
          :style="{ width: '100%' }"
        ></view>
        <view
          class="van-skeleton__title area area-img"
          :style="{ width: '100%' }"
        ></view>
      </view>
    </template>
    <!-- 2. product detail skeleton -->
    <template v-if="type === 2">
      <view
        class="van-skeleton__title"
        :style="{ width: '100%', height: '230px' }"
      ></view>
      <view class="van-skeleton__row" :style="{ width: '60%' }"></view>
      <view class="van-skeleton__row" :style="{ width: '20%' }"></view>

      <view class="van-skeleton--inline" style="margin-top: 12px">
        <view class="van-skeleton__title" :style="{ width: '15%' }"></view>
        <view class="van-skeleton__title" :style="{ width: '15%' }"></view>
        <view class="van-skeleton__title" :style="{ width: '15%' }"></view>
      </view>

      <view
        class="van-skeleton__row"
        :style="{ width: '100%', height: '1px' }"
      ></view>

      <view class="van-skeleton--sku">
        <view class="van-skeleton__title" :style="{ width: '20%' }"></view>
        <view class="van-skeleton__title" :style="{ width: '45%' }"></view>
      </view>
      <view class="van-skeleton--sku">
        <view class="van-skeleton__title" :style="{ width: '20%' }"></view>
        <view class="van-skeleton__title" :style="{ width: '30%' }"></view>
      </view>
      <view class="van-skeleton--sku">
        <view class="van-skeleton__title" :style="{ width: '25%' }"></view>
        <view class="van-skeleton__title" :style="{ width: '60%' }"></view>
      </view>

      <view
        class="van-skeleton__row"
        :style="{ width: '100%', height: '1px' }"
      ></view>

      <view
        class="van-skeleton__row"
        :style="{ width: '85%', marginLeft: 'auto' }"
      ></view>
      <view class="van-skeleton__row" :style="{ width: '100%' }"></view>
      <view
        class="van-skeleton__row"
        :style="{ width: '100%', height: '100px' }"
      ></view>
      <view
        class="van-skeleton__row"
        :style="{ width: '85%', marginLeft: 'auto' }"
      ></view>
      <view class="van-skeleton__row" :style="{ width: '100%' }"></view>
      <view class="van-skeleton__row" :style="{ width: '100%' }"></view>
      <view class="van-skeleton__row" :style="{ width: '100%' }"></view>
    </template>
  </view>
  <view v-else>
    <slot></slot>
  </view>
</template>

<script>
const DEFAULT_ROW_WIDTH = '100%'
const DEFAULT_LAST_ROW_WIDTH = '60%'

export default {
  data() {
    return {}
  },

  props: {
    // 1.帖子详情 2.商品详情
    type: {
      type: Number,
      default: 1
    },
    border: Boolean,
    row: Number,
    title: Boolean,
    avatar: Boolean,
    loading: {
      type: Boolean,
      default: true
    },
    animate: {
      type: Boolean,
      default: true
    },
    avatarSize: {
      type: String,
      default: '32px'
    },
    avatarShape: {
      type: String,
      default: 'round'
    },
    titleWidth: {
      type: [Number, String],
      default: '40%'
    },
    rowWidth: {
      type: [Number, String, Array],
      default: DEFAULT_ROW_WIDTH
    }
  },
  watch: {
    loading(val) {}
  }
}
</script>

<style lang="scss">
$active-color: #f2f3f5;
// Skeleton
$skeleton-row-height: 16px;
$skeleton-row-background-color: $active-color;
$skeleton-row-margin-top: 12px;
$skeleton-avatar-background-color: $active-color;
$skeleton-animation-duration: 1.2s;

.van-skeleton {
  position: fixed;
  // top: 120rpx;
  left: 0;
  width: 100%;
  height: 100vh;
  padding: 10px 15px;
  background-color: #fff;
  z-index: 99999;
  box-sizing: border-box;
  &--top {
    display: flex;
    width: 100%;
    .title {
      margin-top: 8px;
    }
  }

  &__avatar {
    flex-shrink: 0;
    margin-right: 15px;
    background-color: $skeleton-avatar-background-color;

    &--round {
      border-radius: 100%;
    }
  }

  &--section {
    display: flex;
    flex-flow: wrap;
    width: 100%;
    .area {
      margin-top: 20px;
    }
    .area-sm {
      margin-top: 20px;
      margin-right: 20px;
    }
    .area-img {
      padding-top: 100px;
      margin-top: 20px;
      border-radius: 10px;
    }
  }

  &--inline {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &--sku {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
  }

  &__row,
  &__title {
    height: $skeleton-row-height;
    background-color: $skeleton-row-background-color;
  }

  &__title {
    margin: 0;
  }

  &__row {
    &:not(:first-child) {
      margin-top: $skeleton-row-margin-top;
    }
  }

  &__title + &__row {
    margin-top: 20px;
  }

  &--animate {
    animation: van-skeleton-blink $skeleton-animation-duration ease-in-out
      infinite;
  }
}

.van-skeleton--border {
  padding-top: 10rpx;
  padding-bottom: 20rpx;
  border-bottom: 1px solid $active-color;
}

@keyframes van-skeleton-blink {
  50% {
    opacity: 0.6;
  }
}
</style>
