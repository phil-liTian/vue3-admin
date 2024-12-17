/*
 * @Date: 2024-08-13 19:17:12
 * @LastEditors: phil_litian
 */
import { nextTick, ref, unref, watch } from 'vue';
import {
	FormActionType,
	FormProps,
	FormSchema,
	UseFormReturnType,
} from '../types/form';

type Props = Partial<FormProps>;

export function useForm(props?: Props): UseFormReturnType {
	const formRef = ref<Nullable<FormActionType>>(null);

	async function getForm() {
		const form = unref(formRef);
		if (!form) {
			return;
		}
		await nextTick();
		return form as FormActionType;
	}

	function register(instance: FormActionType) {
		formRef.value = instance;
		watch(
			() => props,
			() => {
				props && instance.setProps(props);
			},
			{ immediate: true, deep: true }
		);
	}

	const methods: FormActionType = {
		submit: async () => {
			const form = await getForm();
			return form.submit();
		},
		setProps: async (props: Partial<FormProps>) => {
			const form = await getForm();
			return form.setProps(props);
		},
		resetFields: async () => {
			const form = await getForm();
			return form.resetFields();
		},
		setFieldsValue: async (values: Recordable) => {
			const form = await getForm();
			return form.setFieldsValue(values);
		},
		getFieldsValue: () => {
			return unref(formRef).getFieldsValue();
		},
		appendSchemaByField: (schemas: FormSchema[]) => {
			unref(formRef).appendSchemaByField(schemas);
		},
		removeSchemaByField: (field: string | string[]) => {
			unref(formRef).removeSchemaByField(field);
		},
		validateFields: async (nameList?: string | string[]) => {
			const form = await getForm();
			return form.validateFields(nameList);
		},
		validate: async (nameList?: string | string[]) => {
			const form = await getForm();
			return form.validate(nameList);
		},
		clearValidate: (nameList: string | string[]) => {
			return unref(formRef).clearValidate(nameList);
		},
		updateSchema: (data: Partial<FormSchema> | Partial<FormSchema>[]) => {
			return unref(formRef).updateSchema(data);
		},
	};

	return [register, methods];
}
