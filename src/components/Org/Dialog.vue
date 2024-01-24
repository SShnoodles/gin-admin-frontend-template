<template>
  <div>
    <el-dialog
      v-model="dialogVisible"
      :title="state.title"
      width="30%"
      :close-on-click-modal="false"
    >
      <el-form
        label-width="120px"
        :model="state.form"
        ref="formRef"
        :rules="rules"
      >
        <el-form-item label="名称" prop="name">
          <el-input v-model="state.form.name" />
        </el-form-item>
        <el-form-item label="信用代码" prop="creditCode">
          <el-input v-model="state.form.creditCode" />
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="state.form.address" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="saveOrUpdate">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watch, nextTick } from "vue";
import { Org, getOrg, editOrg, addOrg } from "@/api/org";
import { FormInstance, FormRules, ElMessage } from "element-plus";
const props = defineProps({
  id: String
});
const emits = defineEmits(["close"]);

const formRef = ref<FormInstance>();
const rules = reactive<FormRules>({
  name: [{ required: true, message: "应用名称 必填", trigger: "blur" }],
  creditCode: [
    { required: true, message: "应用英文名称 必填", trigger: "blur" }
  ],
  address: [{ required: true, message: "仓库地址 必填", trigger: "blur" }]
});

const dialogVisible = ref(false);
const state = reactive({
  title: "",
  form: {
    name: "",
    address: "",
    creditCode: ""
  } as Org
});

watch(
  () => dialogVisible.value,
  v => {
    if (v) {
      nextTick(() => {
        if (props.id) {
          state.form = {} as Org;
          state.title = "修改";
          handleGet(props.id);
        } else {
          state.title = "新增";
          state.form = {} as Org;
        }
      });
    }
  }
);

const handleGet = async (id: string) => {
  try {
    const { data } = await getOrg(id);
    state.form = data;
  } catch (e) {
    ElMessage.error(e.message);
  }
};

const saveOrUpdate = async () => {
  const check = await formRef.value.validate();
  if (!check) return;
  try {
    if (props.id) {
      await editOrg(props.id, state.form);
    } else {
      await addOrg(state.form);
    }
    emits("close");
    dialogVisible.value = false;
  } catch (e) {
    ElMessage.error(e.message);
  }
};

defineExpose({
  dialogVisible
});
</script>

<style lang="scss" scoped></style>
