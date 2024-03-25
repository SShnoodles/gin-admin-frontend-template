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
        <el-form-item label="用户名" prop="username">
          <el-input v-model="state.form.username" />
        </el-form-item>
        <el-form-item label="姓名" prop="realName">
          <el-input v-model="state.form.realName" />
        </el-form-item>
        <el-form-item label="工号" prop="workNo">
          <el-input v-model="state.form.workNo" />
        </el-form-item>
        <el-form-item label="机构" prop="orgId">
          <el-select v-model="state.form.orgId" @change="handleGetRoles">
            <el-option
              v-for="item in orgs"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="角色" prop="roleIds">
          <el-select v-model="state.form.roleIds" multiple>
            <el-option
              v-for="item in roles"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
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
import { reactive, ref, watch, nextTick, onMounted } from "vue";
import { Role, getOrgRoles } from "@/api/role";
import { Org, getOrgs } from "@/api/org";
import { User, getUser, addUser, editUser, getUserRoleIds } from "@/api/user";
import { getMenus } from "@/api/menu";
import { FormInstance, FormRules, ElMessage } from "element-plus";
const props = defineProps({
  id: String
});
const emits = defineEmits(["close"]);

const formRef = ref<FormInstance>();
const rules = reactive<FormRules>({
  username: [{ required: true, message: "用户名称 必填", trigger: "blur" }],
  realName: [{ required: true, message: "姓名 必填", trigger: "blur" }],
  workNo: [{ required: true, message: "工号 必填", trigger: "blur" }],
  orgId: [{ required: true, message: "机构 必填", trigger: "blur" }]
});
const menus = ref();

const dialogVisible = ref(false);
const state = reactive({
  title: "",
  form: {
    username: "",
    realName: "",
    workNo: "",
    orgId: "",
    roleIds: []
  } as User
});
const orgs = ref<Org[]>([]);
const roles = ref<Role[]>([]);

watch(
  () => dialogVisible.value,
  v => {
    if (v) {
      nextTick(async () => {
        if (props.id) {
          state.form = {} as User;
          state.title = "修改";
          await handleGet(props.id);
          await handleGetRoles(state.form.orgId);
          await handleGetRoleIds(props.id);
        } else {
          state.title = "新增";
          state.form = {} as User;
          roles.value = [];
        }
      });
    }
  }
);

const handleGet = async (id: string) => {
  try {
    state.form = await getUser(id);
  } catch (e) {
    ElMessage.error(e.message);
  }
};

const handleGetOrgs = async () => {
  try {
    orgs.value = await getOrgs();
  } catch (e) {
    ElMessage.error(e.message);
  }
};

const handleGetRoles = async (value: string) => {
  try {
    roles.value = await getOrgRoles(value);
  } catch (e) {
    ElMessage.error(e.message);
  }
};

const handleGetRoleIds = async (value: string) => {
  try {
    state.form.roleIds = await getUserRoleIds(value);
  } catch (e) {
    ElMessage.error(e.message);
  }
};

const saveOrUpdate = async () => {
  const check = await formRef.value.validate();
  if (!check) return;

  try {
    if (props.id) {
      await editUser(props.id, state.form);
    } else {
      await addUser(state.form);
    }
    emits("close");
    dialogVisible.value = false;
  } catch (e) {
    ElMessage.error(e.message);
  }
};

const handleMenus = async () => {
  try {
    menus.value = await getMenus();
  } catch (e) {
    ElMessage.error(e.message);
  }
};

defineExpose({
  dialogVisible
});

onMounted(() => {
  handleGetOrgs();
  handleMenus();
});
</script>

<style lang="scss" scoped></style>
