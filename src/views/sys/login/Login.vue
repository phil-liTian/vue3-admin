<!--
 * @Date: 2024-02-21 09:24:37
 * @LastEditors: phil_litian
-->
<template>
	<div :class="[prefixCls, 'w-full', 'h-full', 'relative']">
		<div class="absolute flex flex-items-center right-4 top-4">
			<AppDarkModeToggle class="enter-x mr-2" />
			<AppLocalePicker class="xl:text-gray-600" />
		</div>

		<!-- 当视图宽度大于1280时隐藏 -->
		<span class="-enter-x xl:hidden">
			<app-logo />
		</span>

		<div class="container relative h-full mx-auto sm:px-10 py-2">
			<div class="flex h-full">
				<div class="hidden xl:flex min-h-full pl-4 mr-4">
					<app-logo class="-enter-x" />
					<div class="my-auto">
						<img
							class="w-1/2 -mt-16 -enter-x"
							src="../../../assets/svg/login-box-bg.svg"
							alt=""
						/>
						<div class="mt-10 text-white font-600 -enter-x">
							<span class="mt-4 text-3xl">{{ t('login.SignInTitle') }}</span>
						</div>
						<div class="mt-5 text-white font-400 -enter-x">
							{{ t('login.signInDesc') }}
						</div>
					</div>
				</div>

				<div class="flex h-full w-full xl:h-auto">
					<div
						class="relative rounded-md shadow-md sm:w-3/5 sm:px-8 w-full px-5 py-8 my-auto mx-auto enter-x xl:p-4"
						:class="prefixCls + '-form'"
					>
						<login-form />
						<mobile-form />
						<qr-code-form />
						<register-form />
						<forget-password-form></forget-password-form>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { AppLogo, AppDarkModeToggle, AppLocalePicker } from '@c/Application';
import { useDesign } from '@h/web/useDesign';
import { useI18n } from '@h/web/useI18n';
import { useUserStore } from '@s/modules/user';
import LoginForm from './LoginForm.vue';
import MobileForm from './MobileForm.vue';
import QrCodeForm from './QrCodeForm.vue';
import RegisterForm from './RegisterForm.vue';
import ForgetPasswordForm from './ForgetPasswordForm.vue';
import { useAttrs } from '@phil/hooks';

const { prefixCls } = useDesign('login');
const { t } = useI18n('sys');

const { login } = useUserStore();

// setTimeout(() => {
//   login({ username: 'phil', password: '12345' })
// }, 500);
</script>

<style lang="less">
@prefix-cls: ~'@{namespace}-login';
@logo-prefix-cls: ~'@{namespace}-app-logo';
@dark-bg: #293146;

html[data-theme='dark'] {
	.@{prefix-cls} {
		background-color: @dark-bg;

		&::before {
			background-image: url('@/assets/svg/login-bg-dark.svg');
		}

		.ant-input,
		.ant-input-password {
			background-color: #232a3b;
		}

		&-form {
			background: transparent !important;
			color: #888;

			.ant-divider-inner-text {
				color: @text-color-secondary;
			}
		}
	}
}

.@{prefix-cls} {
	height: 100vh;
	// overflow: hidden;

	// 在大尺寸下
	@media (max-width: @screen-xl) {
		background-color: #293146;

		.@{prefix-cls}-form {
			background-color: #fff;
		}
	}

	&::before {
		content: '';
		position: absolute;
		display: block;
		width: 100%;
		height: 100%;
		margin-left: -48%;
		background-image: url('@/assets/svg/login-bg.svg');
		background-repeat: no-repeat;
		background-position: 100%;
		background-size: auto 100%;

		@media (max-width: @screen-xl) {
			display: none;
		}
	}

	.@{logo-prefix-cls} {
		position: absolute;
		top: 12px;
	}

	.container {
		.@{logo-prefix-cls} {
			image {
				width: 48px;
			}
		}
	}

	input {
		// min-width: 360px;
	}
}
</style>
