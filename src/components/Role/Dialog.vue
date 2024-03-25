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
        <el-form-item label="编码" prop="code">
          <el-input v-model="state.form.code" />
        </el-form-item>
        <el-form-item label="机构" prop="orgId">
          <el-select v-model="state.form.orgId">
            <el-option
              v-for="item in orgs"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="菜单">
          <el-tree
            :data="menus"
            ref="tree"
            node-key="id"
            show-checkbox
            :props="defaultProps"
            default-expand-all
          />
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
import { Role, getRole, editRole, addRole, getRoleMenus } from "@/api/role";
import { getOrgs } from "@/api/org";
import { getMenus } from "@/api/menu";
import { FormInstance, FormRules, ElMessage, ElTree } from "element-plus";
const props = defineProps({
  id: String
});
const emits = defineEmits(["close"]);

const formRef = ref<FormInstance>();
const rules = reactive<FormRules>({
  name: [{ required: true, message: "名称 必填", trigger: "blur" }],
  code: [{ required: true, message: "编码 必填", trigger: "blur" }],
  orgId: [{ required: true, message: "机构 必填", trigger: "blur" }]
});
const tree = ref<InstanceType<typeof ElTree>>();
const menus = ref();
const defaultProps = ref({
  children: "children",
  label: "name"
});

const dialogVisible = ref(false);
const state = reactive({
  title: "",
  form: {
    name: "",
    code: "",
    orgId: "",
    menuIds: []
  } as Role
});
const orgs = ref<Org[]>([]);

watch(
  () => dialogVisible.value,
  v => {
    if (v) {
      nextTick(() => {
        if (props.id) {
          state.form = {} as Role;
          state.title = "修改";
          handleGet(props.id);
        } else {
          state.title = "新增";
          state.form = {} as Role;
          tree.value.setCheckedKeys([]);
        }
      });
    }
  }
);

const handleGet = async (id: string) => {
  try {
    state.form = await getRole(id);
    const menuIds = await getRoleMenus(id);
    tree.value.setCheckedKeys(menuIds);
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

const saveOrUpdate = async () => {
  const check = await formRef.value.validate();
  if (!check) return;

  state.form.menuIds = tree.value.getCheckedKeys();
  try {
    if (props.id) {
      await editRole(props.id, state.form);
    } else {
      await addRole(state.form);
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
