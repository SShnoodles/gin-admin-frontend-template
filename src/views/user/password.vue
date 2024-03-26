<template>
  <div>
    <el-form
      label-width="120px"
      :model="state.form"
      ref="formRef"
      :rules="rules"
    >
      <el-form-item label="旧密码" prop="oldPassword">
        <el-input v-model="state.form.oldPassword" />
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword">
        <el-input v-model="state.form.newPassword" />
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword2">
        <el-input v-model="state.form.newPassword2" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确定</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { changePassword } from "@/api/user";
import { FormInstance, FormRules, ElMessage } from "element-plus";
import { router } from "@/router";

const formRef = ref<FormInstance>();
const rules = reactive<FormRules>({
  oldPassword: [{ required: true, message: "旧密码 必填", trigger: "blur" }],
  newPassword: [{ required: true, message: "新密码 必填", trigger: "blur" }],
  newPassword2: [{ required: true, message: "新密码 必填", trigger: "blur" }]
});

const state = reactive({
  form: {
    oldPassword: "",
    newPassword: "",
    newPassword2: ""
  }
});

const onSubmit = async () => {
  const check = await formRef.value.validate();
  if (!check) return;

  if (state.form.newPassword !== state.form.newPassword2) {
    ElMessage.error("二次密码不正确");
    return;
  }
  try {
    const { message } = await changePassword(state.form);
    ElMessage.info(message);
  } catch (e) {
    ElMessage.error(e.message);
  }
};

const cancel = () => {
  router.push("home");
};
</script>

<style lang="scss" scoped></style>
